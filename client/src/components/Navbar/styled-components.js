import styled, { css } from "styled-components";
import { BoxFlex } from "styled-components/Layout";

export const NavBrandStyled = styled.span`
  font-weight: bold;
  font-size: clamp(1rem, 2rem, 2.25rem);
  ${({ color }) => css`
    color: ${color};
  `}
  &:hover {
    cursor: pointer;
    ${({ colorHover }) => css`
      color: ${colorHover};
    `}
  }
`;

export const InputStyled = styled(BoxFlex)`
  border-radius: 9px;
  padding: 0.1rem 1.5rem;
  align-items: center;
  gap: 2rem;
  height: 42px;
  input {
    border: none;
    outline: none;
    font-size: 0.9rem;
    ${({ backgroundColor, padding, fontFamily, color, placeholderColor }) =>
      css`
        background-color: ${backgroundColor};
        padding: ${padding};
        font-family: ${fontFamily};
        color: ${color};
        ::placeholder {
          opacity: 0.6;
          color: ${placeholderColor};
        }
      `}
  }
`;

export const MenuNavbar = styled(BoxFlex)`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  overflow: hidden;
`;
