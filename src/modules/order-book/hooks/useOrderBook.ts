import greenlet from "greenlet";
import { useCallback, useEffect, useState } from "react";
import { Subject } from "rxjs";
import { bufferWhen } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";
import { usePrevious } from "../../../core/hooks/usePrevious";
import {
  FeedStorage,
  OrderBookFeedMap,
  RawOrderBookMessage,
} from "../order-book";
import { mergeRawFeedToFeedMap, processFeed } from "./process-order-book";

const processFeedWorker = greenlet(processFeed);

export const PRODUCT_GROUPS = {
  PI_XBTUSD: [0.5, 1, 2.5],
  PI_ETHUSD: [0.05, 0.1, 0.25],
};
export type Product = keyof typeof PRODUCT_GROUPS;

const INITIAL_STATE = {
  asks: [],
  bids: [],
};

const WS_URI = "wss://www.cryptofacilities.com/ws/v1";
const bufferTrigger = new Subject<number>();
const websocketClient = webSocket(WS_URI);

export const useOrderBook = (
  {
    defaultProduct,
    defaultTick,
  }: { defaultProduct: Product; defaultTick: number } = {
    defaultProduct: "PI_XBTUSD",
    defaultTick: PRODUCT_GROUPS.PI_XBTUSD[0],
  }
) => {
  const [wsState, setWsState] = useState<"connected" | "disconnected">();
  const [product, setProduct] = useState<Product>(defaultProduct);
  const lastProduct = usePrevious(product);
  const [tick, setTick] = useState<number>(defaultTick);

  const [feedMap, setFeedMap] = useState<FeedStorage>(INITIAL_STATE);
  const [feed, setFeed] = useState<OrderBookFeedMap>(INITIAL_STATE);

  // handles websocket connection
  const connect = useCallback(() => {
    const subscription = websocketClient.subscribe({
      complete: () => setWsState("disconnected"),
      error: () => setWsState("disconnected"),
      next: (message: any) => {
        const infoConnectionOpen = message?.event === "info";
        if (infoConnectionOpen) setWsState("connected");
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  // starts the websocket connection
  useEffect(() => {
    return connect();
  }, [connect]);

  const killConnection = useCallback(() => {
    const customError = { code: 4000, reason: "Custom evil reason" };
    websocketClient.error(customError);
  }, []);

  // if no updates for 2 seconds kill ws and re connect
  useEffect(() => {
    if (!feedMap || wsState !== "connected") return;
    const timeoutRef = setTimeout(() => {
      killConnection();
      connect();
    }, 2000);
    return () => clearTimeout(timeoutRef);
  }, [connect, feedMap, killConnection, wsState]);

  // handles product subscription on websocket
  useEffect(() => {
    if (!PRODUCT_GROUPS[product] || wsState !== "connected") return;
    setFeedMap(INITIAL_STATE);
    setTick(PRODUCT_GROUPS[product][0]);
    websocketClient.next({
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [product],
    });
    // waits 200ms then releases the first buffer starting the cycle
    const timeoutRef = setTimeout(() => bufferTrigger.next(Date.now()), 200);
    // merges incoming messages on local state, flushes 0 size items
    // throttled by a buffer with a wait until completed + 150ms
    const subscription = websocketClient
      .pipe(bufferWhen(() => bufferTrigger.pipe()))
      .subscribe({
        next: async (messages) => {
          const onlyFeedMessages = messages?.filter(
            (m: any) => m?.asks && m?.bids && product === m?.product_id
          ) as RawOrderBookMessage[];
          if (onlyFeedMessages && onlyFeedMessages.length > 0)
            setFeedMap((currentFeedMap) =>
              mergeRawFeedToFeedMap({
                incomingMessages: onlyFeedMessages,
                currentFeedStorage: currentFeedMap,
              })
            );
          setTimeout(() => bufferTrigger.next(Date.now()), 150);
        },
      });
    return () => {
      clearTimeout(timeoutRef);
      subscription.unsubscribe();
    };
  }, [product, wsState]);

  // unsubscribe from last product
  useEffect(() => {
    if (lastProduct && product !== lastProduct)
      websocketClient.next({
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [lastProduct],
      });
  }, [lastProduct, product]);

  // process feed map to array on a worker thread
  useEffect(() => {
    (async () => {
      setFeed(await processFeedWorker({ feedStorage: feedMap, tick }));
    })();
  }, [feedMap, tick]);

  return {
    product,
    setProduct,
    tick,
    setTick,
    feed,
    wsState,
    killConnection,
    connect,
  };
};
