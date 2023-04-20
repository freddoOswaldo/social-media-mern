import styled, { css } from "styled-components";

export const BoxFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ isVertical }) =>
    isVertical &&
    css`
      flex-direction: column;
    `}

  ${({
    gap,
    backgroundColor,
    padding,
    justifyContent,
    alignItems,
    width,
    margin,
    borderRadius,
    border,
    flexGrow,
  }) =>
    css`
      gap: ${gap};
      background-color: ${backgroundColor};
      padding: ${padding};
      margin: ${margin};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      width: ${width};
      border-radius: ${borderRadius};
      border: ${border};
      flex-grow: ${flexGrow};
    `}
`;
