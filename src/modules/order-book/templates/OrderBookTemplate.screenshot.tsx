import React from "react";
import { AppWrapper } from "../../../App";
import { OrderBookTemplate } from "./OrderBookTemplate";
import { orderBookMockData } from "../hooks/order-book.mock";

const fn = () => {};

export const OrderBookTemplateScreenShot = () => (
  <AppWrapper>
    <OrderBookTemplate
      {...{
        connect: () => () => {},
        killConnection: fn,
        setProduct: fn,
        setTick: fn,
        product: "PI_XBTUSD",
        tick: 0.25,
        wsState: "connected",
        feed: orderBookMockData,
      }}
    />
  </AppWrapper>
);
