import React from "react";
import styled from "styled-components";
import { Theme } from "../../../config/theme";
import { PRODUCT_GROUPS, useOrderBook } from "../hooks/useOrderBook";

const Header = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.bgGreyDark};
  z-index: 2;
`;

const Spacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 8vw 2vh 5vw;
`;

const Select = styled.select<{ theme: Theme }>`
  border-radius: 4px;
  border-width: 0;
  padding: 2px 20px 2px 10px;
  background-color: ${({ theme }) => theme.colors.secondaryGrey};
  color: ${({ theme }) => theme.colors.textWhite};
`;

export const OrderBookHeader: React.FC<
  Pick<ReturnType<typeof useOrderBook>, "product" | "setTick" | "tick">
> = ({ product, setTick, tick }) => {
  return (
    <Header>
      <Spacer>
        <div>Order Book</div>

        <Select value={tick} onChange={(event) => setTick(+event.target.value)}>
          {PRODUCT_GROUPS[product].map((item) => (
            <option value={item} key={item}>
              Group {item}
            </option>
          ))}
        </Select>
      </Spacer>
    </Header>
  );
};
