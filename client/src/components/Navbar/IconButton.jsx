import { node, func } from "prop-types";
import { useTheme } from "@mui/material";
import styled, { css } from "styled-components";

const IconButtonStyled = styled.button`
  border: none;
  border-radius: 50%;
  padding: 7px;
  height: fit-content;
  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  ${({ backgroundColorHover, backgroundColorClicked }) => css`
    :hover {
      background-color: ${backgroundColorHover};
    }
    :active {
      background-color: ${backgroundColorClicked};
      transition: 0.2s;
    }
  `}
`;

const IconButton = ({ children, handleClick }) => {
  const theme = useTheme();

  const { hoverButton, mediumLight } = theme.palette.neutral;

  return (
    <IconButtonStyled
      type="button"
      backgroundColorHover={hoverButton}
      backgroundColorClicked={mediumLight}
      onClick={handleClick}
    >
      {children}
    </IconButtonStyled>
  );
};

IconButton.propTypes = {
  children: node.isRequired,
  handleClick: func.isRequired,
};
export default IconButton;
