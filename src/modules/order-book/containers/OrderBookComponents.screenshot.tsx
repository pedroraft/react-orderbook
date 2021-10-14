import React from "react";
import { ChartWrapper } from "../templates/OrderBookTemplate";
import { DepthChart } from "./DepthChart";
import { OrderBookFooter } from "./OrderBookFooter";
import { OrderBookHeader } from "./OrderBookHeader";
import { OrderBookTable } from "./OrderBookTable";

const mockData = [
  {
    price: 58122,
    size: 170,
    total: 12678,
    pricePercent: 20,
    sizePercent: 10,
  },
  {
    price: 58149,
    size: 178,
    total: 12678,
    pricePercent: 50,
    sizePercent: 60,
  },
  {
    price: 58154,
    size: 12500,
    total: 12500,
    pricePercent: 100,
    sizePercent: 30,
  },
];

export const DepthChartScreenShot = () => (
  <ChartWrapper>
    <DepthChart type={"bid"} data={mockData} />
    <DepthChart type={"ask"} reverse data={mockData} />
  </ChartWrapper>
);

export const OBTableBidsScreenShot = () => (
  <OrderBookTable feed={mockData} inverted={false} type="bid" />
);

export const OBTableAsksScreenShot = () => (
  <OrderBookTable feed={mockData} inverted={false} type="ask" />
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
