import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";
import { BoxFlex } from "styled-components/Layout";
import UserImage from "components/UserImage";
import styled from "styled-components";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import constants from "utils/constants";
import { Divider } from "components";
import { CustomSpan } from "styled-components/Text";

const CustomH4 = styled.h4`
  font-weight: 500;
  color: ${({ color }) => color};
  margin: 0;
  &:hover {
    cursor: pointer;
    color: ${({ colorHover }) => colorHover};
  }
`;

const UserWidget = () => {
  const navigate = useNavigate();
  const { token } = useSelector(({ auth }) => auth);
  const { user: userData } = useSelector(({ user }) => user);
  const {
    picturePath,
    firstName,
    lastName,
    friends,
    occupation,
    location,
    viewedProfile,
    impressions,
  } = userData;
  const {
    palette: { neutral, primary },
  } = useTheme();
  const { dark, medium, main } = neutral;
  const { light } = primary;
  if (!userData) return null;

  return (
    <WidgetWrapper>
      <BoxFlex
        gap="0.5rem"
        pb="1.1rem"
        justifyContent="space-between"
        onClick={() => navigate("/profile")}
        alignItems="center"
      >
        <BoxFlex gap="1rem" alignItems="center" justifyContent="space-between">
          <UserImage image={picturePath} />
          <BoxFlex isVertical>
            <CustomH4 color={dark} colorHover={light}>
              {firstName} {lastName}
            </CustomH4>
            <CustomSpan color={medium}>
              {friends.length} {constants.Friends}
            </CustomSpan>
          </BoxFlex>
        </BoxFlex>
        <ManageAccountsOutlined />
      </BoxFlex>

      <Divider />

      <BoxFlex isVertical gap="0.8rem">
        <BoxFlex alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <CustomSpan color={medium}>{location}</CustomSpan>
        </BoxFlex>
        <BoxFlex alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <CustomSpan color={medium}>{occupation}</CustomSpan>
        </BoxFlex>
      </BoxFlex>

      <Divider />

      <BoxFlex gap="0.8rem" isVertical>
        <BoxFlex justifyContent="space-between" mb="0.5rem">
          <CustomSpan color={medium}>{constants.VIEWED_LABEL}</CustomSpan>
          <CustomSpan color={main} fontWeight="500">
            {viewedProfile}
          </CustomSpan>
        </BoxFlex>
        <BoxFlex justifyContent="space-between">
          <CustomSpan color={medium}>{constants.IMPRESSIONS_LABEL}</CustomSpan>
          <CustomSpan color={main} fontWeight="500">
            {impressions}
          </CustomSpan>
        </BoxFlex>
      </BoxFlex>

      <Divider />

      <BoxFlex gap="0.8rem" isVertical>
        <CustomSpan fontSize="1rem" color={main}>
          {constants.SOCIAL_PROFILE}
        </CustomSpan>

        <BoxFlex
          alignItems="center"
          justifyContent="space-between"
          gap="1rem"
          mb="0.5rem"
        >
          <BoxFlex
            alignItems="center"
            justifyContent="space-between"
            gap="1rem"
          >
            <img
              src="../assets/twitter.png"
              alt="twitter"
              width={24}
              height={24}
            />
            <BoxFlex isVertical>
              <CustomSpan color={main}>{constants.TWITTER}</CustomSpan>
              <CustomSpan color={medium}>{constants.SOCIAL_NETWORK}</CustomSpan>
            </BoxFlex>
          </BoxFlex>
          <EditOutlined sx={{ color: main }} />
        </BoxFlex>
        <BoxFlex alignItems="center" justifyContent="space-between" gap="1rem">
          <BoxFlex
            alignItems="center"
            justifyContent="space-between"
            gap="1rem"
          >
            <img
              src="../assets/linkedin.png"
              alt="linkedin"
              width={24}
              height={24}
            />
            <BoxFlex isVertical>
              <CustomSpan color={main}>{constants.LINKEDIN}</CustomSpan>
              <CustomSpan color={medium}>
                {constants.NETWORK_PLATFORM}
              </CustomSpan>
            </BoxFlex>
          </BoxFlex>
          <EditOutlined sx={{ color: main }} />
        </BoxFlex>
      </BoxFlex>
    </WidgetWrapper>
  );
};
export default UserWidget;
