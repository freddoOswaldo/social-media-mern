import { string, func } from "prop-types";
import { useTheme } from "@mui/material";
import styled from "styled-components";

const InputPostStyled = styled.input`
  flex-grow: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 2rem;
  color: ${({ color }) => color};
  padding: 1rem 2rem;
  border: 0;
  outline: none;
  font-weight: 400;
  font-size: 0.8571428571428571rem;
  line-height: 1.4375em;
  ::placeholder {
    /* font-weight: 500; */
    color: ${({ placeholderColor }) => placeholderColor};
  }
`;

const InputPost = ({ placeholder, value, name, onChange }) => {
  const {
    palette: { neutral },
  } = useTheme();
  const { mediumMain, light, dark } = neutral;

  return (
    <InputPostStyled
      type="text"
      id={name}
      name={name}
      placeholder={placeholder}
      backgroundColor={light}
      placeholderColor={mediumMain}
      color={dark}
      value={value}
      onChange={onChange}
    />
  );
};

InputPost.propTypes = {
  name: string.isRequired,
  placeholder: string,
  value: string,
  onChange: func.isRequired,
};

InputPost.defaultProps = {
  placeholder: "",
  value: "",
};

export default InputPost;
