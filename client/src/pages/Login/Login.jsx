import { useTheme } from "@mui/material";
import { LogoPrimary } from "components";
import useMediaQuery from "hooks/useMediaQuery";
import { BoxFlex } from "styled-components/Layout";
import constants from "utils/constants";
import { SubtitleLogin } from "./styled-components";
import Form from "./components/Form";

const Login = () => {
  const {
    palette,
    typography: { h5 },
  } = useTheme();
  const isDesktop = useMediaQuery(constants.DESKTOP_MEDIA_QUERY);
  const { alt } = palette.background;

  return (
    <BoxFlex>
      <BoxFlex
        width="100%"
        backgroundColor={alt}
        padding="1rem 6%"
        justifyContent="center"
      >
        <LogoPrimary />
      </BoxFlex>
      <BoxFlex
        width={isDesktop ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        backgroundColor={alt}
        borderRadius="1.5rem"
        isVertical
      >
        <SubtitleLogin font={h5}>
          {constants.LOGIN_INTRODUCE.replace(
            "$LOGO_TITLE",
            constants.LOGO_TITLE
          )}
        </SubtitleLogin>
        <Form />
      </BoxFlex>
    </BoxFlex>
  );
};

export default Login;
