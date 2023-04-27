import styled, { css } from "styled-components";

export const LogoText = styled.span`
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

export const CustomSpan = styled.span`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  cursor: ${({ cursor }) => cursor};
`;
