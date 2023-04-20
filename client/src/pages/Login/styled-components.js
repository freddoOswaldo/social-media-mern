import styled, { css } from "styled-components";

export const SubtitleLogin = styled.h5`
  font-weight: 500;
  margin-bottom: 1.5rem;
  margin-top: 0;

  ${({ font: { fontFamily, fontSize } }) => css`
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    font-weight: 500;
  `}
`;
