import React from "react";
import { AppWrapper } from "../../App";
import { OrderBookPage } from "./OrderBookPage";

export const OrderBookPageScreenShot = () => (
  <AppWrapper>
    <OrderBookPage />
  </AppWrapper>
);

OrderBookPageScreenShot.beforeScreenshot = async (element: HTMLElement) => {
  return new Promise((resolve) => {
    setInterval(() => {
      const checkTable = element.querySelector("table>tbody>tr>td");
      if (checkTable) resolve(true);
    }, 200);
  });
};
