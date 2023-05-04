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
    height,
    pv,
    ph,
    pt,
    pl,
    pr,
    pb,
    mv,
    mh,
    mt,
    ml,
    mr,
    mb,
    flexBasis,
  }) =>
    css`
      flex-basis: ${flexBasis};
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
      height: ${height};
      padding-top: ${pv || pt};
      padding-bottom: ${pv || pb};
      padding-right: ${ph || pr};
      padding-left: ${ph || pl};
      margin-top: ${mv || mt};
      margin-bottom: ${mv || mb};
      margin-right: ${mh || mr};
      margin-left: ${mh || ml};
    `}
`;
