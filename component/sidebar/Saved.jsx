import { IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Saved = ({ hideSidebarHandler }) => (
  <>
    <Box display="flex" padding={2}>
      <Typography flexGrow={1} variant="h5">
        Saved
      </Typography>

      <IconButton onClick={hideSidebarHandler}>
        <CloseIcon />
      </IconButton>
    </Box>
  </>
);
export default Saved;
