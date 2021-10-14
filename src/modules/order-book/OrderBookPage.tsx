import React from "react";
import { useOrderBook } from "./hooks/useOrderBook";
import { OrderBookTemplate } from "./templates/OrderBookTemplate";

export const OrderBookPage: React.FC = () => {
  const orderBookProps = useOrderBook();

  return <OrderBookTemplate {...orderBookProps} />;
};
