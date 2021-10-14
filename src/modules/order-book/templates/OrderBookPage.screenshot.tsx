import React from "react";
import { AppWrapper } from "../../../App";
import { OrderBookTemplate } from "./OrderBookTemplate";

const fn = () => {};
const testFeed = {
  asks: [
    {
      price: 58154,
      size: 12500,
      total: 12500,
      pricePercent: 100,
      sizePercent: 0.9277759799541011,
    },
    {
      price: 58149,
      size: 178,
      total: 12678,
      pricePercent: 90.56603773584906,
      sizePercent: 0.013211529954546398,
    },
    {
      price: 58138,
      size: 90,
      total: 12768,
      pricePercent: 69.81132075471697,
      sizePercent: 0.006679987055669527,
    },
    {
      price: 58133,
      size: 118126,
      total: 130894,
      pricePercent: 60.37735849056604,
      sizePercent: 8.767557232644652,
    },
    {
      price: 58130,
      size: 1261,
      total: 132155,
      pricePercent: 54.71698113207547,
      sizePercent: 0.09359404085776972,
    },
    {
      price: 58118,
      size: 32000,
      total: 164155,
      pricePercent: 32.075471698113205,
      sizePercent: 2.3751065086824985,
    },
    {
      price: 58115,
      size: 98054,
      total: 262209,
      pricePercent: 26.41509433962264,
      sizePercent: 7.277771675073554,
    },
    {
      price: 58101,
      size: 500,
      total: 262709,
      pricePercent: 0,
      sizePercent: 0.03711103919816404,
    },
  ],
  bids: [
    {
      price: 55877,
      size: 100000,
      total: 100000,
      pricePercent: 100,
      sizePercent: 7.422207839632809,
    },
    {
      price: 56633,
      size: 300000,
      total: 400000,
      pricePercent: 53.98660986001217,
      sizePercent: 22.266623518898427,
    },
    {
      price: 56819,
      size: 27843,
      total: 427843,
      pricePercent: 42.66585514303104,
      sizePercent: 2.066565328788963,
    },
    {
      price: 57212,
      size: 225000,
      total: 652843,
      pricePercent: 18.746195982958,
      sizePercent: 16.699967639173817,
    },
    {
      price: 57286,
      size: 8923,
      total: 661766,
      pricePercent: 14.24223980523432,
      sizePercent: 0.6622836055304355,
    },
    {
      price: 57303,
      size: 27843,
      total: 689609,
      pricePercent: 13.20754716981132,
      sizePercent: 2.066565328788963,
    },
    {
      price: 57342,
      size: 58578,
      total: 748187,
      pricePercent: 10.833840535605603,
      sizePercent: 4.347780908300106,
    },
    {
      price: 57375,
      size: 469523,
      total: 1217710,
      pricePercent: 8.825319537431525,
      sizePercent: 34.84897291487915,
    },
    {
      price: 57483,
      size: 29598,
      total: 1247308,
      pricePercent: 2.251978088861833,
      sizePercent: 2.1968250763745187,
    },
    {
      price: 57520,
      size: 100000,
      total: 1347308,
      pricePercent: 0,
      sizePercent: 7.422207839632809,
    },
  ],
};

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
        feed: testFeed,
      }}
    />
  </AppWrapper>
);
