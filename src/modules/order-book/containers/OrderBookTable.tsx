import React from "react";
import styled from "styled-components";
import { theme, Theme } from "../../../config/theme";
import { FeedType, OrderBookFeed } from "../order-book";

const Table = styled.table<{ inverted: boolean; theme: Theme }>`
  width: 100%;
  border-collapse: collapse;
  direction: rtl;
  table-layout: fixed;
  text-align: right;
  @media (min-width: 800px) {
    direction: ${({ inverted }) => (inverted ? "rtl" : "ltr")};
  }
`;

const TH = styled.th<{ theme: Theme }>`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.greyText};
`;

const TD = styled.td<{ type?: FeedType; theme: Theme }>`
  height: 1.5rem;
  position: relative;
  color: ${({ type, theme }) => {
    if (!type) return undefined;
    return type === "bid" ? theme.colors.textRed : theme.colors.textGreen;
  }};
`;

const Row: React.FC<OrderBookFeed & { type: FeedType }> = React.memo(
  ({ price, size, total, type, pricePercent }) => (
    <>
      <tr>
        <TD>
          {window.innerWidth <= 800 && (
            <div
              style={{
                height: "100%",
                width: `${pricePercent}vw`,
                backgroundColor:
                  type === "bid"
                    ? theme.colors.textRed
                    : theme.colors.textGreen,
                position: "absolute",
                opacity: 0.2,
                right: 0,
                top: 0,
              }}
            />
          )}
          {Intl.NumberFormat("en-us").format(total)}
        </TD>
        <TD>{Intl.NumberFormat("en-us").format(size)}</TD>
        <TD type={type}>
          {Intl.NumberFormat("en-us", {
            minimumFractionDigits: 2,
          }).format(price)}
        </TD>
      </tr>
    </>
  )
);

export const OrderBookTable: React.FC<{
  feed?: OrderBookFeed[];
  inverted: boolean;
  type: FeedType;
}> = ({ feed, inverted, type }) => {
  return (
    <Table {...{ inverted }}>
      {(window.innerWidth > 800 || inverted) && (
        <thead>
          <tr>
            <TH>TOTAL</TH>
            <TH>SIZE</TH>
            <TH>PRICE</TH>
          </tr>
        </thead>
      )}
      <tbody>
        {feed?.map((item) => (
          <Row key={item.price} {...item} type={type} />
        ))}
      </tbody>
    </Table>
  );
};
