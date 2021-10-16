import React from "react";
import { OrderBookPage } from "./modules/order-book/OrderBookPage";
import { ThemeProvider } from "styled-components";
import { Theme, theme } from "./config/theme";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    color: ${({ theme }) => theme.colors.textWhite};
    background-color: ${({ theme }) => theme.colors.bgGrey};
    font-family: 'Open Sans', sans-serif;
    color-scheme: dark;
    margin: 0;
  }
`;

export const AppWrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

const App: React.FC = () => {
  return (
    <AppWrapper>
      <OrderBookPage />
    </AppWrapper>
  );
};

export default App;
