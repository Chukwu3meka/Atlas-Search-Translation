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

const Reset = ({ email, loading, setEmail, password, setPassword, showPassword, signinHandler, setModeHandler, setShowPassword }) => (
  <>
    <Typography variant="body1" sx={{ letterSpacing: 1, fontWeight: "bold", textAlign: "center", px: 1, py: 2 }}>
      FORGOT PASSWORD
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

    <ButtonGroup fullWidth>
      <Button
        color="info"
        variant="contained"
        disabled={loading}
        onClick={setModeHandler("signin")}
        sx={{ textTransform: "cfetchertalize" }}>
        Sign In
      </Button>
      <LoadingButton loading={loading} variant="contained" sx={{ textTransform: "cfetchertalize" }} onClick={signinHandler}>
        Reset
      </LoadingButton>
    </ButtonGroup>
  </>
);

export default Reset;
