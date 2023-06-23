import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Upload } from "@mui/icons-material";
import SimpleSnackbar from "components/Snackbar";

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [picture, setPicture] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async () => {
    const preset_key = "ivpdncki";
    const cloudName = "dsdkmnf0b";
    if (picture) {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("filepath", picture.path);
      formData.append("upload_preset", preset_key);
      console.log(picture);
      const UploadedImage = await fetch(
        "https://api.cloudinary.com/v1_1/dsdkmnf0b/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const UploadedImageResponse = await UploadedImage.json();
      console.log(UploadedImageResponse.secure_url);
      setPicture(UploadedImageResponse.secure_url);

      const savedUserResponse = await fetch(
        "https://talkcity-backend-2l9h.vercel.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            picturePath: picture,
            location,
            occupation,
          }),
        }
      );
      const savedUser = await savedUserResponse.json();
      if (savedUser.success == true) {
        setOpen(true);
        setMessage(savedUser.msg);
        console.log(savedUser);
        setPageType("login");
      } else {
        setOpen(true);
        setMessage(savedUser.msg);
        console.log(savedUser);
      }
    } else {
      setOpen(true);
      setMessage("There was an error");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://talkcity-backend-2l9h.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    if (loggedIn.success === true) {
      setOpen(true);
      setMessage(loggedIn.success);
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    } else {
      setOpen(true);
      setMessage(loggedIn.msg);
    }
  };

  const handleFormSubmit = async () => {
    if (isLogin) await login();
    if (isRegister) await register();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack>
      <SimpleSnackbar
        open={open}
        handleClick={handleClick}
        message={message}
        handleClose={handleClose}
      />
      {pageType === "register" ? (
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Location"
            onChange={(e) => setLocation(e.target.value)}
            name="location"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Occupation"
            onChange={(e) => setOccupation(e.target.value)}
            name="occupation"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
          <Box
            gridColumn="span 4"
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setPicture(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Stack>
                  <Box
                    {...getRootProps()}
                    border={"2px dashed blue"}
                    p="1rem"
                    width="80%"
                    sx={{ "&:hover": { cursor: "pointer" }, height: 110 }}
                  >
                    <input {...getInputProps()} />
                    {!picture ? (
                      <Stack>
                        <Upload />
                        <Typography>Upload Receipt or Browse files</Typography>
                      </Stack>
                    ) : (
                      <Stack>
                        <Upload />
                        <Typography>{picture.name}</Typography>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              )}
            </Dropzone>
          </Box>
        </Box>
      ) : (
        <Stack spacing={3}>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
        </Stack>
      )}
      <Stack>
        <Button
          fullWidth
          onClick={handleFormSubmit}
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Button>
        <Typography
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
            // resetForm();
          }}
          sx={{
            textDecoration: "underline",
            color: palette.primary.main,
            "&:hover": {
              cursor: "pointer",
              color: palette.primary.light,
            },
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Form;
