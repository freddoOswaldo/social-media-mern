import { useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "redux-client/states";
import { BoxFlex } from "styled-components/Layout";
import constants from "utils/constants";
import InputPost from "./InputPost";
import Dropzone from "react-dropzone";
import PictureUpload from "./PictureUpload";
import { useForm } from "react-hook-form";
import { Divider, MainButton } from "components";
import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { CustomSpan } from "styled-components/Text";
import useMediaQuery from "hooks/useMediaQuery";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const {
    palette: { neutral },
  } = useTheme();

  const { medium, mediumMain } = neutral;
  const isDesktop = useMediaQuery(constants.DESKTOP_MEDIA_QUERY);

  const { user: userData } = useSelector(({ user }) => user);
  const { _id, picturePath } = userData;
  const handlePost = () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    dispatch(createPost(formData));
    setImage(null);
    setIsImage(false);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <BoxFlex isVertical justifyContent="space-between" gap="1.5rem">
        <BoxFlex justifyContent="space-between" gap="1.5rem">
          <UserImage image={picturePath} />
          <InputPost
            placeholder={constants.PLACEHOLDER_INPUT_POST}
            value={post}
            name="post"
            onChange={(e) => setPost(e.target.value)}
          />
        </BoxFlex>

        {isImage && (
          <BoxFlex
            isVertical
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            padding="1rem"
          >
            <PictureUpload setImage={setImage} image={image} />
          </BoxFlex>
        )}
        <Divider margin="0.01rem 0" />
        <BoxFlex justifyContent="space-between" alignItems="center">
          <BoxFlex
            justifyContent="space-between"
            gap="0.25rem"
            onClick={() => setIsImage(!isImage)}
            style={{ cursor: "pointer" }}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
            <CustomSpan color={mediumMain}>{constants.IMAGE}</CustomSpan>
          </BoxFlex>
          {isDesktop ? (
            <>
              <BoxFlex
                justifyContent="space-between"
                gap="0.25rem"
                style={{ cursor: "pointer" }}
              >
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <CustomSpan color={mediumMain}>{constants.CLIP}</CustomSpan>
              </BoxFlex>

              <BoxFlex
                justifyContent="space-between"
                gap="0.25rem"
                style={{ cursor: "pointer" }}
              >
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <CustomSpan color={mediumMain}>
                  {constants.ATTACHMENT}
                </CustomSpan>
              </BoxFlex>

              <BoxFlex
                justifyContent="space-between"
                gap="0.25rem"
                style={{ cursor: "pointer" }}
              >
                <MicOutlined sx={{ color: mediumMain }} />
                <CustomSpan color={mediumMain}>{constants.AUDIO}</CustomSpan>
              </BoxFlex>
            </>
          ) : (
            <BoxFlex
              justifyContent="space-between"
              gap="0.25rem"
              style={{ cursor: "pointer" }}
            >
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </BoxFlex>
          )}

          <MainButton
            isDisabled={!post}
            borderRadius="3rem"
            onClick={handlePost}
          >
            {constants.POST}
          </MainButton>
        </BoxFlex>
      </BoxFlex>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
