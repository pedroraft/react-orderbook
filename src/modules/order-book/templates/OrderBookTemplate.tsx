import React from "react";
import styled from "styled-components";
import { OrderBookFooter } from "../containers/OrderBookFooter";
import { OrderBookHeader } from "../containers/OrderBookHeader";
import { OrderBookTable } from "../containers/OrderBookTable";
import { useOrderBook } from "../hooks/useOrderBook";

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");
  font-family: "Fira Code", monospace;
  background-color: ${({ theme }) => theme.colors.bgGreyDark};
  display: flex;
  flex-direction: column-reverse;
  margin-top: 65px;
  margin-bottom: 120px;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

export const OrderBookTemplate: React.FC<ReturnType<typeof useOrderBook>> = ({
  feed,
  ...props
}) => {
  return (
    <>
      <OrderBookHeader {...props} />
      <Wrapper>
        <OrderBookTable feed={feed.bids} inverted={false} type="bid" />
        <OrderBookTable feed={feed.asks} inverted type="ask" />
      </Wrapper>
      <OrderBookFooter {...props} />
    </>
  );
};
