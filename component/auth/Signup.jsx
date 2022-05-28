import {
  Button,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  ButtonGroup,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const Signup = ({
  name,
  email,
  loading,
  setName,
  setEmail,
  password,
  setPassword,
  showPassword,
  signupHandler,
  setModeHandler,
  setShowPassword,
}) => (
  <>
    <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
      WELCOME TO OPENTRANSLATION
    </Typography>

    <TextField
      id="name"
      fullWidth
      label="Name"
      value={name}
      variant="outlined"
      sx={{ marginBottom: 1 }}
      onChange={(e) => setName(e.target.value)}
    />

    <TextField
      id="email"
      fullWidth
      label="eMail"
      value={email}
      variant="outlined"
      sx={{ marginBottom: 1 }}
      onChange={(e) => setEmail(e.target.value)}
    />

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        autoComplete="ViewCrunch"
        sx={{ marginBottom: 1 }}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>

    <ButtonGroup fullWidth>
      <Button
        color="info"
        variant="contained"
        disabled={loading}
        onClick={setModeHandler("signin")}
        sx={{ textTransform: "capitalize" }}>
        Sign In
      </Button>
      <LoadingButton loading={loading} variant="contained" sx={{ textTransform: "capitalize" }} onClick={signupHandler}>
        Sign Up
      </LoadingButton>
    </ButtonGroup>
  </>
);

export default Signup;