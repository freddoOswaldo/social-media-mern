import { useTheme } from "@mui/material";
import { string, func } from "prop-types";
import styled, { css } from "styled-components";

const CustomLinkStyled = styled.span`
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  ${({ color, hoverColor, activeColor }) => css`
    color: ${color};
    :hover {
      color: ${hoverColor};
    }
  `}
`;

const CustomLink = ({ label, handleClick }) => {
  const { palette } = useTheme();
  const { main, dark } = palette.primary;
  return (
    <CustomLinkStyled color={main} hoverColor={dark} onClick={handleClick}>
      {label}
    </CustomLinkStyled>
  );
};

CustomLink.propTypes = {
  label: string.isRequired,
  handleClick: func.isRequired,
};

export default CustomLink;
