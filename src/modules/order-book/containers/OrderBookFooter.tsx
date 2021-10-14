import React from "react";
import { FaExclamationCircle, FaPlug, FaExchangeAlt } from "react-icons/fa";
import styled from "styled-components";
import { theme } from "../../../config/theme";
import { Button } from "../../../core/components/UI/Button";
import { useOrderBook } from "../hooks/useOrderBook";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2vh 8vw 2vh 5vw;
`;

const { colors } = theme;
export const OrderBookFooter: React.FC<
  Pick<
    ReturnType<typeof useOrderBook>,
    "wsState" | "setProduct" | "connect" | "killConnection"
  >
> = ({ wsState, setProduct, connect, killConnection }) => {
  const toggleFeed = () => {
    setProduct((p) => (p === "PI_XBTUSD" ? "PI_ETHUSD" : "PI_XBTUSD"));
  };

  return (
    <Wrapper>
      <Button
        color="purple"
        onClick={toggleFeed}
        style={{ marginRight: "8px" }}
      >
        <FaExchangeAlt
          color={colors.textWhite}
          size={18}
          style={{ marginRight: "8px" }}
        />
        Toggle Feed
      </Button>
      {wsState === "connected" ? (
        <Button color="darkRed" onClick={killConnection}>
          <FaExclamationCircle
            color={colors.textWhite}
            size={18}
            style={{ marginRight: "8px" }}
          />
          Kill Feed
        </Button>
      ) : (
        <Button color="textGreen" onClick={connect}>
          <FaPlug
            color={colors.textWhite}
            size={18}
            style={{ marginRight: "8px" }}
          />
          Connect
        </Button>
      )}
    </Wrapper>
  );
};
