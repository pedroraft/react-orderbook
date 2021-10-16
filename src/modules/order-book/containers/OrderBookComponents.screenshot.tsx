import React from "react";
import { OrderBookFooter } from "./OrderBookFooter";
import { OrderBookHeader } from "./OrderBookHeader";
import { OrderBookTable } from "./OrderBookTable";
import { orderBookMockData } from "../hooks/order-book.mock";

export const OBTableBidsScreenShot = () => (
  <OrderBookTable feed={orderBookMockData.bids} inverted={false} type="bid" />
);

export const OBHeaderScreenShot = () => (
  <OrderBookHeader product="PI_ETHUSD" tick={0.5} setTick={() => {}} />
);

export const OBFooterScreenShot = () => (
  <OrderBookFooter
    connect={() => () => {}}
    killConnection={() => {}}
    setProduct={() => {}}
    wsState="connected"
  />
);
