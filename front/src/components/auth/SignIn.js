import React from "react";
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import { useDispatch } from 'react-redux';
import { LoginAPI } from '../../services/AuthServices';
import { login } from '../../store/reducers/Auth';

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText
} from "@mui/material";
import { spacing } from "@mui/system";
import { Eye, EyeOff } from 'react-feather';


const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        const loginUser = {
          email : values.email,
          password : values.password,
          remember : rememberMe    
        };
        try {
          const resAPI = await LoginAPI(loginUser);
          dispatch(login({ resAPI }));
          navigate(from, { replace: true });
        } catch (error) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FormControl fullWidth>
            <InputLabel>Mot de passe</InputLabel>
            <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            autoComplete='on'
            name="password"
            label="Mot de passe"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            endAdornment={
                <InputAdornment position='end'>
                    <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end' >
                    {showPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                </InputAdornment> }
            my={2}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value={rememberMe} onChange={() => setRememberMe(!rememberMe)} color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
           Se Connecter
          </Button>
          <Button
            component={Link}
            to="/reset-password"
            fullWidth
            color="primary"
          >
           Mot de passe oublié
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
