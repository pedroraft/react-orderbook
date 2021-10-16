import React, { useMemo } from "react";
import styled from "styled-components";
import { theme, Theme } from "../../../config/theme";
import { useIsPhone } from "../../../core/hooks/useIsPhone";
import { FeedType, OrderBookFeed } from "../order-book";

const Table = styled.table<{ inverted: boolean; theme: Theme }>`
  height: 100%;
  border-collapse: collapse;
  direction: rtl;
  table-layout: fixed;
  text-align: right;
  @media (min-width: 800px) {
    margin-right: ${({ inverted }) => (inverted ? "8%" : 0)};
    direction: ${({ inverted }) => (inverted ? "rtl" : "ltr")};
    width: 50%;
  }
`;

const TH = styled.th<{ theme: Theme }>`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.greyText};
`;

const TD = styled.td<{ type?: FeedType; theme: Theme }>`
  height: 1.5rem;
  color: ${({ type, theme }) => {
    if (!type) return undefined;
    return type === "bid" ? theme.colors.textRed : theme.colors.textGreen;
  }};
`;

const TR = styled.tr`
  height: 1.5rem;
`;

const Row: React.FC<OrderBookFeed & { type: FeedType; isPhone: boolean }> =
  React.memo(({ price, size, total, type, sizePercent = 0, isPhone }) => (
    <>
      <TR>
        <TD>
          <div
            style={{
              width: isPhone ? "100%" : "50%",
              [type === "bid" || isPhone ? "left" : "right"]: 0,
              position: "absolute",
              height: "1.6rem",
              opacity: 0.2,
            }}
          >
            <div
              style={{
                backgroundColor:
                  type === "bid"
                    ? theme.colors.textRed
                    : theme.colors.textGreen,
                width: `${sizePercent}%`,
                [type === "bid" ? "marginLeft" : "marginRight"]: `${
                  isPhone ? 0 : 100 - sizePercent
                }%`,
                height: "100%",
              }}
            />
          </div>
          {Intl.NumberFormat("en-us").format(total)}
        </TD>
        <TD>{Intl.NumberFormat("en-us").format(size)}</TD>
        <TD type={type}>
          {Intl.NumberFormat("en-us", {
            minimumFractionDigits: 2,
          }).format(price)}
        </TD>
      </TR>
    </>
  ));

export const OrderBookTable: React.FC<{
  feed?: OrderBookFeed[];
  inverted: boolean;
  type: FeedType;
}> = ({ feed, inverted, type }) => {
  const isPhone = useIsPhone();
  const reOrderFeedWhenMobile = useMemo(() => {
    return type === "ask" && isPhone ? [...(feed || [])].reverse() : feed;
  }, [feed, type, isPhone]);
  return (
    <Table {...{ inverted }}>
      {(!isPhone || inverted) && (
        <thead>
          <tr>
            <TH>TOTAL</TH>
            <TH>SIZE</TH>
            <TH>PRICE</TH>
          </tr>
        </thead>
      )}
      <tbody>
        {reOrderFeedWhenMobile?.map((item) => (
          <Row key={item.price} {...item} type={type} isPhone={isPhone} />
        ))}
      </tbody>
    </Table>
  );
};
