import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";


const theme = createTheme();

const RegisterPage = () => {

  const [error, setError] = useState("")



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const firstName = data.get('firstName');
    const familyName = data.get('lastName');
    const password = data.get('password');
    const phone = data.get('phone');
    if(email.length!==0 && phone.length!==0 && password.length!==0 && familyName.length!==0 && firstName.length!==0)
    axios.post('http://34.147.33.195:8080/api/user-details-service/', {
      firstName: firstName,
      familyName: familyName,
      gender: "male",
      telephoneNumber: phone,
      email: email,
      password: password,
      role:"USER"
    })
      .then(function (response) {
        const data = response.data;
        if (data === "Email already taken") {
          setError(data)
        }
        
        else {
          console.log(data)
          window.location.href = "/"
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });

      setError("")
  };

  useEffect(()=>{
    if(error.length>0)
    setTimeout(()=>{
      setError("")
    },2000) 
  },[error])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={error.length>0} autoHideDuration={2000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
          {console.log(error)}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default RegisterPage;