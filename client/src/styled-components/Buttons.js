import styled, { css } from "styled-components";

export const ButtonSolid = styled.button`
  padding: 15px;
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 4px;
  transition: 0.4s;
  ${({ backgroundColor, hoverColor, activeColor, color }) =>
    css`
      background-color: ${backgroundColor};
      color: ${color};

      :disabled {
        background-color: ${hoverColor};
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
