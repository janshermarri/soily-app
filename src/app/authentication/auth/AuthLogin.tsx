import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { createClient } from "@supabase/supabase-js";

const validationSchema = Yup.object({
  email: Yup.string().email("Enter valid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const CustomTextField = ({ ...props }) => <TextField {...props} />;

const AuthLogin = () => {
  const login = async (email: string, password: string) => {
    const supabaseUrl = "https://wjtickbmjnmcyoeehhrp.supabase.co";
    const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password,
    });
    if (data) {
      console.log("data", data);
      if (data.session?.access_token) {
        localStorage.setItem("access_token", data.session.access_token);
      }
    }
    if (error) {
      console.log("error", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      login(values.email, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            name="email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default AuthLogin;
