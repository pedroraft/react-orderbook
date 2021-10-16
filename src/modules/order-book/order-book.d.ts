export type RawFeed = [number, number][];
export interface RawOrderBookMessage {
  feed: string;
  product_id: string;
  bids: RawFeed;
  asks: RawFeed;
}

export type FeedMap = { [price: number]: number };
export type FeedStorage = {
  asks: FeedMap;
  bids: FeedMap;
};

export type FeedType = "ask" | "bid";

export interface OrderBookFeed {
  total: number;
  price: number;
  size: number;
  sizePercent?: number;
}

export interface OrderBookFeedMap {
  asks: OrderBookFeed[];
  bids: OrderBookFeed[];
}
