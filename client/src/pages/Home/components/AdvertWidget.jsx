import { useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { BoxFlex } from "styled-components/Layout";
import { CustomH5, CustomSpan } from "styled-components/Text";
import constants from "utils/constants";

const AdvertWidget = () => {
  const {
    palette: { neutral },
  } = useTheme();

  const { main, dark, medium } = neutral;

  return (
    <WidgetWrapper>
      <BoxFlex justifyContent="space-between">
        <CustomH5 color={dark} fontWeight="500">
          {constants.SPONSORED}
        </CustomH5>
        <CustomSpan color={medium}>{constants.CREATE_AD}</CustomSpan>
      </BoxFlex>
      <img
        // eslint-disable-next-line no-undef
        src={`${process.env.REACT_APP_URL_BACKEND}/assets/info4.jpeg`}
        width="100%"
        height="auto"
        alt="advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <BoxFlex justifyContent="space-between">
        <CustomSpan color={main}>{constants.MIKA_COSMETICS}</CustomSpan>
        <CustomSpan color={medium}>{constants.MIKA_COSMETICS_URL}</CustomSpan>
      </BoxFlex>
      <BoxFlex margin="0.5rem 0">
        <CustomSpan color={medium}>{constants.DESCRIPTIONS_AD}</CustomSpan>
      </BoxFlex>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
