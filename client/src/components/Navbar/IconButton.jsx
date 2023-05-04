import { node, func, string } from "prop-types";
import { useTheme } from "@mui/material";
import styled, { css } from "styled-components";

const IconButtonStyled = styled.button`
  border: none;
  border-radius: 50%;
  padding: ${({ p }) => p};
  height: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ backgroundColorHover, backgroundColorClicked, backgroundColor }) => css`
    background-color: ${backgroundColor};
    :hover {
      background-color: ${backgroundColorHover};
    }
    :active {
      background-color: ${backgroundColorClicked};
      transition: 0.2s;
    }
  `}
`;

const IconButton = ({ children, handleClick, p, backgroundColor }) => {
  const theme = useTheme();

  const { hoverButton, mediumLight } = theme.palette.neutral;

  return (
    <IconButtonStyled
      type="button"
      backgroundColor={backgroundColor}
      backgroundColorHover={hoverButton}
      backgroundColorClicked={mediumLight}
      onClick={handleClick}
      p={p}
    >
      {children}
    </IconButtonStyled>
  );
};

IconButton.propTypes = {
  children: node.isRequired,
  handleClick: func,
  p: string,
  backgroundColor: string,
};
IconButton.defaultProps = {
  p: "7px",
  handleClick: () => {},
  backgroundColor: "transparent",
};
export default IconButton;
