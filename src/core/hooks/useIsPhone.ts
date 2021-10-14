import { useMemo } from "react";
import { useWindowDimensions } from "./useWindowDimensions";

export const useIsPhone = () => {
  const { width } = useWindowDimensions();
  const isPhone = useMemo(() => {
    return width < 800;
  }, [width]);
  return isPhone;
};
