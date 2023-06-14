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
const Login = () => {
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      email: Yup.string()

        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    }),
  });
  console.log();
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
          </FormContainer>
        </form>
      </RightContainer>
    </LoginContainer>
  );
};
export default Login;
