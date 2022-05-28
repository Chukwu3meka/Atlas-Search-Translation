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

const Signin = ({ email, loading, setEmail, password, setPassword, showPassword, signinHandler, setModeHandler, setShowPassword }) => (
  <>
    <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
      SIGN IN TO YOUR ACCOUNT
    </Typography>

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

    <ButtonGroup fullWidth sx={{ mb: 1.2 }}>
      <Button
        color="info"
        variant="contained"
        disabled={loading}
        onClick={setModeHandler("signup")}
        sx={{ textTransform: "capitalize" }}>
        Register
      </Button>
      <LoadingButton loading={loading} variant="contained" sx={{ textTransform: "capitalize" }} onClick={signinHandler}>
        Login
      </LoadingButton>
    </ButtonGroup>

    <Button onClick={setModeHandler("reset")}>
      <Typography letterSpacing={1} fontSize={12} textTransform="none">
        Reset/Forgot your password?
      </Typography>
    </Button>
  </>
);

export default Signin;
