import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import constants from "utils/constants";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BoxFlex } from "styled-components/Layout";
import TextField from "./TextField";
import { MainButton } from "components";
import CustomLink from "./CustomLink";
import { useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import { EditOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { init, login, register as regis } from "redux-client/states";
import ErrorText from "components/ErrorText";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  firstName: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  lastName: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  email: yup
    .string()
    .email(constants.DEFAULT_FIELD_EMAIL_ERROR)
    .required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  password: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  location: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  occupation: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  picture: yup.mixed().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email(constants.DEFAULT_FIELD_EMAIL_ERROR)
    .required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
  password: yup.string().required(constants.DEFAULT_FIELD_REQUIRED_ERROR),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const constantsForm = {
  LOGIN: "login",
  REGISTER: "register",
};

const Form = () => {
  const [pageType, setPageType] = useState(constantsForm.LOGIN);
  const {
    palette: { neutral, primary },
  } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetching, success, error } = useSelector(({ auth }) => auth);
  const isLogin = pageType === constantsForm.LOGIN;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin ? initialValuesLogin : initialValuesRegister,
    mode: "onBlur",
  });

  const handleFormSubmit = async (values) => {
    isLogin && dispatch(login(values));
    !isLogin && dispatch(regis(values));
  };

  const changeForm = (formId) => {
    reset();
    setPageType(formId);
  };

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    if (success) {
      isLogin ? navigate("/home") : setPageType(constantsForm.LOGIN);
    }
  }, [success]);

  return (
    <BoxFlex isVertical gap="20px 0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {error && <ErrorText>{error}</ErrorText>}

        <BoxFlex gap="30px" isVertical>
          {!isLogin && (
            <>
              <BoxFlex gap="20px">
                <TextField
                  name="firstName"
                  errors={errors}
                  register={register}
                />
                <TextField
                  name="lastName"
                  errors={errors}
                  register={register}
                />
              </BoxFlex>

              <TextField name="location" errors={errors} register={register} />
              <TextField
                name="occupation"
                errors={errors}
                register={register}
              />
              <BoxFlex
                border={`1px solid ${neutral.medium}`}
                padding="1rem"
                borderRadius="5px"
              >
                <Dropzone
                  accept={{
                    "image/*": [".png", ".jpeg", ".jpg"],
                  }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <BoxFlex
                      {...getRootProps()}
                      border={`2px dashed ${primary.main}`}
                      padding="1rem"
                      flexGrow="1"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {!getValues("picture") ? (
                        <p>Agregar una imagen aqui</p>
                      ) : (
                        <BoxFlex justifyContent="space-between" flexGrow="2">
                          <span>{getValues("picture").name}</span>
                          <EditOutlined />
                        </BoxFlex>
                      )}
                    </BoxFlex>
                  )}
                </Dropzone>
              </BoxFlex>
            </>
          )}
          <TextField name="email" errors={errors} register={register} />
          <TextField
            name="password"
            type="password"
            errors={errors}
            register={register}
          />

          <MainButton type="submit" isFetching={fetching}>
            {isLogin ? constants.LOGIN_BUTTON : constants.REGISTER_BUTTON}
          </MainButton>
        </BoxFlex>
      </form>
      {isLogin ? (
        <CustomLink
          label={constants.LOGIN_LINK}
          handleClick={() => changeForm(constantsForm.REGISTER)}
        />
      ) : (
        <CustomLink
          label={constants.REGISTER_LINK}
          handleClick={() => changeForm(constantsForm.LOGIN)}
        />
      )}
    </BoxFlex>
  );
};

export default Form;
