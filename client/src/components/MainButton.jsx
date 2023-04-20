import { ButtonSolid } from "styled-components/Buttons";
import { node, string, bool } from "prop-types";
import { CircularProgress, useTheme } from "@mui/material";

const MainButton = ({ children, type, isFetching }) => {
  const { palette } = useTheme();
  const { main, light, dark } = palette.primary;
  return (
    <ButtonSolid
      type={type}
      backgroundColor={main}
      hoverColor={light}
      activeColor={dark}
      color={light}
      disabled={isFetching}
    >
      {!isFetching ? children : <CircularProgress size={20} />}
    </ButtonSolid>
  );
};

MainButton.propTypes = {
  children: node.isRequired,
  type: string,
  isFetching: bool,
};

MainButton.defaultProps = {
  type: "button",
  isFetching: false,
};

export default MainButton;
