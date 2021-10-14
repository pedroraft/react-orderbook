import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../../config/theme";
import { FeedType, OrderBookFeed } from "../order-book";

export interface FeedComponentProps {
  data?: OrderBookFeed[];
  reverse?: boolean;
  type: FeedType;
}

const ChartContainer = styled.div<{ reverse?: boolean }>`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ reverse }) => (reverse ? "flex-end" : "flex-start")};
`;

export const DepthChart: React.FC<FeedComponentProps> = React.memo(
  ({ type, data, reverse: _reverse }) => {
    const { current: reverse } = useRef(_reverse);
    const ensuredOrderFeed = useMemo(() => {
      return reverse ? [...(data || [])].reverse() : data;
    }, [data, reverse]);
    return (
      <ChartContainer reverse={reverse}>
        {(ensuredOrderFeed || [])?.map((item) => (
          <div
            key={item.price}
            style={{
              width: `${item.sizePercent}%`,
              height: `${item.pricePercent}%`,
              backgroundColor:
                type === "bid" ? theme.colors.textRed : theme.colors.textGreen,
            }}
          />
        ))}
      </ChartContainer>
    );
  }
);
