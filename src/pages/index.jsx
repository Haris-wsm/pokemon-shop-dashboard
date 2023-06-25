import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { requireUnauthentication } from "@/util/auth";

const Login = () => {
  const [isShow, setIsShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCahnge = (e) => {
    const { name, value } = e.target;

    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleShowPassword = () => setIsShow(!isShow);

  const router = useRouter();

  const handleSingIn = async () => {
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "/dashboard/overall",
    });

    if (status.error) {
      toast.error("เข้าสู่ระบบล้มเหลว");
      setLoading(false);
      return;
    } else {
      router.push(status.url);
    }
  };

  // Button Loadding

  const [loading, setLoading] = useState(false);

  return (
    <Box className="w-screen min-h-screen bg-bgLight ">
      <Box className="flex justify-center items-center w-full h-screen">
        <Card className="w-1/2 xs:w-full sm:w-[70%] mx-0 xs:mx-3">
          <Grid container spacing={6}>
            {/* Form section */}
            <Grid item xs={12} sm={12} md={6}>
              <Box className="w-4/5 mx-auto py-20">
                <Typography className="text-2xl text-center text-main">
                  เข้าสู่ระบบ จัดการสินค้า
                </Typography>
                <Box className="w-1/2 my-5 relative mx-auto">
                  <Divider className="" />
                  <Divider className="absolute left-0 w-[10%] bg-main" />
                </Box>

                <Box className="px-0 md:px-5 ">
                  <Box className="flex flex-col gap-6 py-10">
                    <TextField
                      size="small"
                      name="email"
                      onChange={handleCahnge}
                      value={email}
                      fullWidth
                      placeholder="Email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end" className="mr-2">
                            <EmailOutlinedIcon className="text-slate-300" />
                          </InputAdornment>
                        ),
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                    <TextField
                      size="small"
                      name="password"
                      onChange={handleCahnge}
                      value={password}
                      fullWidth
                      placeholder="Password"
                      type={isShow ? "text" : "password"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end" className="mr-2">
                            <LockOutlinedIcon className="text-slate-300" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                              {isShow ? (
                                <VisibilityOffIcon />
                              ) : (
                                <RemoveRedEyeIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>
                  <Box className="flex w-1/2 mx-auto mt-5 py-5">
                    <Button
                      className="bg-main text-white hover:bg-main px-5 py-2  mx-auto xs:text-sm rounded-lg"
                      fullWidth
                      onClick={handleSingIn}
                      disabled={loading}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          className="mx-3 text-slate-200"
                        />
                      )}
                      {loading ? "Loading" : "  Sign In"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* Other Section */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              className="bg-main hidden md:block"
            >
              <Box className="w-full bg-main mx-auto py-5">
                <Typography className="text-4xl text-white">Welcome</Typography>
                <Divider className="bg-white w-1/2 my-3" />
                <Typography className="text-2xl text-white mt-10">
                  Stock Management
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  return requireUnauthentication(context, ({ session }) => {
    return {
      props: { session },
    };
  });
}

export default Login;
