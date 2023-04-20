import { InputStyled } from "./styled-components";
import { node, string } from "prop-types";

const FieldWithIcon = ({
  children,
  backgroundColor,
  placeholder,
  fontFamily,
  color,
  placeholderColor,
}) => {
  return (
    <InputStyled
      backgroundColor={backgroundColor}
      fontFamily={fontFamily}
      color={color}
      placeholderColor={placeholderColor}
    >
      <input type="text" placeholder={placeholder} />
      {children}
    </InputStyled>
  );
};

FieldWithIcon.propTypes = {
  children: node,
  backgroundColor: string.isRequired,
  placeholder: string,
  fontFamily: string,
  color: string,
  placeholderColor: string,
};

FieldWithIcon.defaultProps = {
  children: null,
  placeholder: "",
  fontFamily: "Rubik",
  color: "",
  placeholderColor: "",
};

export default FieldWithIcon;
