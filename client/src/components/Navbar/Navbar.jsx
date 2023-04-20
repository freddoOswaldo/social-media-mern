import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MenuNavbar } from "./styled-components";
import FieldWithIcon from "./FieldWithIcon";
import { setLogout, setMode } from "redux-client/states";
import IconButton from "./IconButton";
import useMediaQuery from "hooks/useMediaQuery";
import { useRef } from "react";
import { BoxFlex } from "styled-components/Layout";
import constants from "utils/constants";
import LogoPrimary from "components/LogoPrimary";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const isDesktop = useMediaQuery(constants.DESKTOP_MEDIA_QUERY);
  const menuRef = useRef();

  const toggleMenu = (open = true) => {
    if (!menuRef.current) return;
    menuRef.current.style.animation = `${
      open ? "OpenMenuNav" : "CloseMenuNav"
    } 1s normal ease-in forwards`;
  };

  const ItemsMenu = () => (
    <>
      <IconButton handleClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ color: dark, fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </>
  );

  const { light: neutralLight, dark, mediumMain } = theme.palette.neutral;
  const { fontFamily } = theme.typography;
  const { default: background, alt } = theme.palette.background;
  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;
  return (
    <BoxFlex
      backgroundColor={alt}
      padding="1rem 6%"
      justifyContent="space-between"
      alignItems="center"
    >
      <BoxFlex gap="1.75rem" alignItems="center">
        <LogoPrimary />
        {isDesktop && (
          <FieldWithIcon
            backgroundColor={neutralLight}
            placeholder="Search..."
            fontFamily={fontFamily}
            color={dark}
            placeholderColor={mediumMain}
          >
            <IconButton handleClick={() => {}}>
              <Search sx={{ color: dark }} />
            </IconButton>
          </FieldWithIcon>
        )}
      </BoxFlex>
      {isDesktop ? (
        <BoxFlex alignItems="center" gap="2rem">
          <ItemsMenu />
        </BoxFlex>
      ) : (
        <>
          <IconButton handleClick={toggleMenu}>
            <Menu sx={{ color: dark }} />
          </IconButton>
          <MenuNavbar
            alignItems="center"
            gap="2rem"
            isVertical
            backgroundColor={background}
            ref={menuRef}
          >
            <BoxFlex
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              padding="1rem 6%"
            >
              <LogoPrimary />
              <IconButton handleClick={() => toggleMenu(false)}>
                <Close sx={{ color: dark }} />
              </IconButton>
            </BoxFlex>
            <ItemsMenu />
          </MenuNavbar>
        </>
      )}
    </BoxFlex>
  );
};

export default Navbar;
