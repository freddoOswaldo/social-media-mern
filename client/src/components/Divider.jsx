import { string } from "prop-types";
import { useTheme } from "@mui/material";
import styled from "styled-components";

const DividerStyled = styled.div`
  border-top: 1px solid ${({ color }) => color};
  margin: ${({ m }) => m};
`;

const Divider = ({ margin }) => {
  const {
    palette: { neutral },
  } = useTheme();
  const { light } = neutral;

  return <DividerStyled m={margin} color={light} />;
};

Divider.propTypes = {
  margin: string,
};

Divider.defaultProps = {
  margin: "1.1rem 0",
};

export default Divider;
