import { useTheme } from "@mui/material";
import { node } from "prop-types";
import { BoxFlex } from "styled-components/Layout";

const WidgetWrapper = ({ children }) => {
  const {
    palette: { background },
  } = useTheme();

  return (
    <BoxFlex
      padding="1.5rem 1.5rem"
      backgroundColor={background.alt}
      borderRadius="0.75rem"
      isVertical
      width="100%"
      height="fit-content"
    >
      {children}
    </BoxFlex>
  );
};

WidgetWrapper.propTypes = {
  children: node,
};

export default WidgetWrapper;
