import { string } from "prop-types";
import { BoxFlex } from "styled-components/Layout";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <BoxFlex width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // eslint-disable-next-line no-undef
        src={`${process.env.REACT_APP_URL_BACKEND}/assets/${image}`}
      />
    </BoxFlex>
  );
};

UserImage.propTypes = {
  image: string,
  size: string,
};

export default UserImage;
