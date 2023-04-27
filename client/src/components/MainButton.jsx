import { ButtonSolid } from "styled-components/Buttons";
import { node, string, bool, func } from "prop-types";
import { CircularProgress, useTheme } from "@mui/material";

const MainButton = ({
  children,
  type,
  isDisabled,
  isFetching,
  borderRadius,
  onClick,
}) => {
  const { palette } = useTheme();
  const { main, light, dark } = palette.primary;
  return (
    <ButtonSolid
      onClick={onClick}
      type={type}
      backgroundColor={main}
      hoverColor={light}
      activeColor={dark}
      color={light}
      disabled={isDisabled || isFetching}
      borderRadius={borderRadius}
    >
      {!isFetching ? children : <CircularProgress size={20} />}
    </ButtonSolid>
  );
};

MainButton.propTypes = {
  children: node.isRequired,
  type: string,
  isFetching: bool,
  isDisabled: bool,
  borderRadius: string,
  onClick: func,
};

MainButton.defaultProps = {
  type: "button",
  isFetching: false,
  isDisabled: false,
  borderRadius: "4px",
};

export default MainButton;
