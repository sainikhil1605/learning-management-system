import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LoginImg from '../../assets/images/login.svg';
import { useFormik } from 'formik';
import {
  LoginContainer,
  LoginFieldContainer,
  FormContainer,
  RightContainer,
  ImageContainer,
} from './login.styles';
import { AccountBox, HttpsSharp } from '@mui/icons-material';
import * as Yup from 'yup';
import { apiPostCall } from '../../utils/apiUtils';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const loginUser = async () => {
        try {
          const response = await apiPostCall('/login', values);
          const token = response.data.token;
          localStorage.setItem('token', token);
          const { sub } = jwtDecode(token);
          localStorage.setItem('userEmail', sub);
          navigate('/dashboard');
        } catch (err) {
          // console.log('error');
          setLoginError(err.response.data);
        }
      };
      loginUser();
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    }),
  });

  return (
    <LoginContainer>
      <ImageContainer>
        <img src={LoginImg} alt="login" />
      </ImageContainer>
      <RightContainer>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <Typography gutterBottom variant="h5">
              Login
            </Typography>
            <LoginFieldContainer>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="outlined"
                onChange={handleChange}
                helperText={errors.email && touched.email ? errors.email : null}
                value={values.email}
                error={errors.email ? true : false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <AccountBox />
                      </IconButton>
                    </InputAdornment>
                  ),
                  'data-testid': 'email',
                }}
              />
            </LoginFieldContainer>
            <LoginFieldContainer>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                value={values.password}
                error={errors.password ? true : false}
                helperText={
                  errors.password && touched.password ? errors.password : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <HttpsSharp />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </LoginFieldContainer>
            <Button variant="contained" type="submit">
              Login
            </Button>
            {loginError && (
              <Typography variant="body1" color="error">
                {loginError}
              </Typography>
            )}
          </FormContainer>
        </form>
      </RightContainer>
    </LoginContainer>
  );
};
export default Login;
