import { func, shape, instanceOf } from "prop-types";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import { BoxFlex } from "styled-components/Layout";
import { IconButton } from "components";

const PictureUpload = ({ image, setImage }) => {
  const {
    palette: { neutral, primary },
  } = useTheme();
  return (
    <Dropzone
      accept={{
        "image/*": [".png", ".jpeg", ".jpg"],
      }}
      multiple={false}
      onDrop={(acceptedFiles) => {
        setImage(acceptedFiles[0]);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <BoxFlex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <BoxFlex
            isVertical
            {...getRootProps()}
            border={`2px dashed ${primary.main}`}
            padding="1rem"
            flexGrow={image ? "0.9" : "1"}
            style={{
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            {!image ? (
              <p>Agregar una imagen aqui</p>
            ) : (
              <BoxFlex justifyContent="space-between">
                <span>{image.name}</span>
                <EditOutlined />
              </BoxFlex>
            )}
          </BoxFlex>
          {image && (
            <IconButton handleClick={() => setImage(null)}>
              <DeleteOutline sx={{ color: neutral.dark }} />
            </IconButton>
          )}
        </BoxFlex>
      )}
    </Dropzone>
  );
};

PictureUpload.propTypes = {
  image: instanceOf(File),
  setImage: func.isRequired,
};

PictureUpload.defaultProps = {
  image: null,
};

export default PictureUpload;
