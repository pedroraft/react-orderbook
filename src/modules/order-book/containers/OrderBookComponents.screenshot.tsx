import React from "react";
import { ChartWrapper } from "../OrderBookPage";
import { DepthChart } from "./DepthChart";
import { OrderBookFooter } from "./OrderBookFooter";
import { OrderBookHeader } from "./OrderBookHeader";
import { OrderBookTable } from "./OrderBookTable";

const visualMockAsks = [
  {
    price: 58154,
    size: 12500,
    total: 12500,
    pricePercent: 100,
    sizePercent: 30,
  },
  {
    price: 58149,
    size: 178,
    total: 12678,
    pricePercent: 50,
    sizePercent: 60,
  },
  {
    price: 58122,
    size: 170,
    total: 12678,
    pricePercent: 20,
    sizePercent: 10,
  },
];

const visualMockBids = [...visualMockAsks].reverse();

export const DepthChartScreenShot = () => (
  <ChartWrapper>
    <DepthChart type={"bid"} data={visualMockBids} />
    <DepthChart type={"ask"} reverse data={visualMockAsks} />
  </ChartWrapper>
);

export const OBTableBidsScreenShot = () => (
  <OrderBookTable feed={visualMockBids} inverted={false} type="bid" />
);

export const OBTableAsksScreenShot = () => (
  <OrderBookTable feed={visualMockAsks} inverted={false} type="ask" />
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
