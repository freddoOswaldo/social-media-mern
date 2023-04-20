import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogoText } from "styled-components/Text";
import constants from "utils/constants";

const LogoPrimary = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { light, main } = theme.palette.primary;

  return (
    <LogoText colorHover={light} color={main} onClick={() => navigate("/home")}>
      {constants.LOGO_TITLE}
    </LogoText>
  );
};

export default LogoPrimary;
