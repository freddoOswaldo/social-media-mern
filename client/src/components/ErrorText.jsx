import { DangerousRounded } from "@mui/icons-material";
import styled from "styled-components";
import { BoxFlex } from "styled-components/Layout";
import { node } from "prop-types";

export const ErrorTextStyled = styled.span`
  letter-spacing: 1px;
  margin-left: 5px;
`;

export const BoxFlexError = styled(BoxFlex)`
  color: #f44336;
`;

const ErrorText = ({ children }) => {
  return (
    <BoxFlexError alignItems="center" padding="0 0 20px">
      <DangerousRounded />
      <ErrorTextStyled>{children}</ErrorTextStyled>
    </BoxFlexError>
  );
};

ErrorText.propTypes = {
  children: node.isRequired,
};

export default ErrorText;
