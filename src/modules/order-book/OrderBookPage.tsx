import React from "react";
import styled from "styled-components";
import { DepthChart } from "./containers/DepthChart";
import { OrderBookFooter } from "./containers/OrderBookFooter";
import { OrderBookHeader } from "./containers/OrderBookHeader";
import { OrderBookTable } from "./containers/OrderBookTable";
import { useOrderBook } from "./hooks/useOrderBook";

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");
  font-family: "Fira Code", monospace;
  height: 80vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.bgGreyDark};
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
  @media (min-width: 800px) {
    flex-direction: row;
    padding-right: 10%;
  }
`;

export const ChartWrapper = styled.div`
  position: fixed;
  width: 98%;
  height: 80vh;
  opacity: 0.2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const IndexFix = styled.div`
  z-index: 2;
`;

export const OrderBookPage: React.FC = () => {
  const orderBookProps = useOrderBook();
  const { feed } = orderBookProps;

  return (
    <>
      <OrderBookHeader {...orderBookProps} />
      <Wrapper>
        {window.innerWidth > 800 && (
          <ChartWrapper>
            <DepthChart data={feed.bids} type="bid" />
            <DepthChart data={feed.asks} reverse type="ask" />
          </ChartWrapper>
        )}
        <IndexFix>
          <OrderBookTable feed={feed.bids} inverted={false} type="bid" />
        </IndexFix>
        <IndexFix>
          <OrderBookTable feed={feed.asks} inverted type="ask" />
        </IndexFix>
      </Wrapper>
      <OrderBookFooter {...orderBookProps} />
    </>
  );
};
