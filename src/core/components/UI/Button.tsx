import styled from "styled-components";
import { Theme } from "../../../config/theme";

export const Button = styled.button<{
  theme: Theme;
  color: keyof Theme["colors"];
}>`
  padding: 15px;
  border-width: 0;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, color = "darkRed" }) => theme.colors[color]};
  color: ${({ theme }) => theme.colors.textWhite};
`;
