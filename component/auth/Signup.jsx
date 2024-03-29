import { Box, Stack, TextField, Typography, InputLabel, IconButton, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const Signup = ({ loading, values, handleChange, signupHandler, handleClickShowPassword, handleMouseDownPassword }) => (
  <Box px={1.5} py={5} maxWidth={500} m="auto">
    <Stack spacing={3}>
      <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
        WELCOME TO Atlas Search Translation
      </Typography>

      <TextField
        id="name"
        fullWidth
        label="Name"
        value={values.name}
        variant="outlined"
        sx={{ marginBottom: 1 }}
        onChange={handleChange("name")}
      />

      <TextField
        id="email"
        fullWidth
        label="eMail"
        value={values.email}
        variant="outlined"
        sx={{ marginBottom: 1 }}
        onChange={handleChange("email")}
      />

      <FormControl sx={{ mb: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          key="password"
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <LoadingButton fullWidth loading={loading} variant="contained" sx={{ textTransform: "capitalize" }} onClick={signupHandler}>
        Register
      </LoadingButton>
    </Stack>
  </Box>
);

export default Signup;
