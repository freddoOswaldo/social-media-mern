import styled, { css } from "styled-components";
import { string, shape, func } from "prop-types";
import { useTheme } from "@mui/material";
const TextFieldStyled = styled.div`
  margin: 5px 0;
  position: relative;
  input {
    outline: none;
    background: transparent;
    width: 100%;
    padding: 16.5px 14px;
    border: 1px solid;
    border-radius: 4px;
    font-size: 0.8rem;
    ${({
      borderColorFocus,
      borderColorHover,
      borderColor,
      placeholderColor,
      color,
    }) => css`
      border: 1px solid ${borderColor};
      color: ${color};
      ::placeholder {
        color: ${placeholderColor};
      }

      :hover {
        border-color: ${borderColorHover};
      }

      :focus,
      :active {
        border-color: ${borderColorFocus};
      }
    `}
  }

  label {
    position: absolute;
    top: 22px;
    left: 12px;
    font-size: 0.6rem;
    transition: all 0.2s;
    pointer-events: none;
    ${({ labelColor }) => css`
      color: ${labelColor};
    `}
  }

  input::placeholder {
    opacity: 0;
  }

  input:focus::placeholder {
    opacity: 1;
    color: transparent;
  }

  input:placeholder-shown + label {
    cursor: text;
    max-width: 66.66%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: left bottom;
    -webkit-transform-origin: left bottom;
    -moz-transform-origin: left bottom;
    -ms-transform-origin: left bottom;
    -o-transform-origin: left bottom;
    transform: translate(0, 0) scale(1.5);
    -webkit-transform: translate(0, 0) scale(1.5);
    -moz-transform: translate(0, 0) scale(1.5);
    -ms-transform: translate(0, 0) scale(1.5);
    -o-transform: translate(0, 0) scale(1.5);
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    transform: translate(2px, -32px) scale(1.2);
    -webkit-transform: translate(2px, -32px) scale(1.2);
    -moz-transform: translate(2px, -32px) scale(1.2);
    -ms-transform: translate(2px, -32px) scale(1.2);
    -o-transform: translate(2px, -32px) scale(1.2);
    padding: 0 3px;
    ${({ back, borderColorFocus }) => css`
      background: ${back};
      color: ${borderColorFocus};
    `}
  }

  input:not(:placeholder-shown) + label::after {
    left: -0.1em;
    right: -0.1em;
  }
`;

const MessageError = styled.span`
  ${({ color }) => css`
    color: ${color};
  `}
  font-size: 0.7rem;
`;

const TextField = ({ name, errors, register, type }) => {
  const { palette } = useTheme();
  const { main, error } = palette.primary;
  const { dark, mediumLight } = palette.neutral;
  const { alt } = palette.background;

  return (
    <div style={{ flexGrow: 1 }}>
      <TextFieldStyled
        color={dark}
        back={alt}
        labelColor={!errors[name] ? dark : error}
        borderColor={!errors[name] ? mediumLight : error}
        borderColorHover={!errors[name] ? dark : error}
        borderColorFocus={!errors[name] ? main : error}
        placeholderColor={!errors[name] ? dark : error}
      >
        <input
          type={type}
          placeholder={`${name[0].toUpperCase()}${name.substring(1)}`}
          {...register(name)}
        />
        <label htmlFor={name}>{`${name[0].toUpperCase()}${name.substring(
          1
        )}`}</label>
      </TextFieldStyled>
      {errors[name]?.message && (
        <MessageError color={error}>{errors[name].message}</MessageError>
      )}
    </div>
  );
};

TextField.propTypes = {
  name: string.isRequired,
  errors: shape({}).isRequired,
  register: func.isRequired,
  type: string,
};

TextField.defaultProps = {
  type: "text",
};

export default TextField;
