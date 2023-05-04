import styled, { css } from "styled-components";

export const ButtonSolid = styled.button`
  padding: 15px;
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  transition: 0.4s;
  cursor: pointer;
  ${({ backgroundColor, hoverColor, activeColor, color, borderRadius }) =>
    css`
      border-radius: ${borderRadius};
      background-color: ${backgroundColor};
      color: ${color};

      :disabled {
        background-color: ${hoverColor};
        color: ${activeColor};
        span {
          color: ${activeColor};
        }
      }
      :hover {
        background-color: ${hoverColor};
        color: ${activeColor};
      }
      :focus {
        background-color: ${activeColor};
      }

      span {
        color: ${color};
      }
    `};
`;
