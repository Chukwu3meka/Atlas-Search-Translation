import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Stack, Box, Paper, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

const FeedbackContainer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Rate this translation">
        <IconButton
          aria-label="rate-this-translation"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
          <ThumbsUpDownOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <Paper elevation={0} sx={{ borderRadius: 20 }}>
          <Box display="flex" flexDirection="column" p={1.5} maxWidth={230}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                textAlignLast: "center",
              }}>
              Are you satisfied with this translation?
            </Typography>

            <Stack direction="row" spacing={3} key={"label"} justifyContent="center" alignItems="center" mt={1.6} mb={0.4}>
              <IconButton aria-label={"label"} sx={{ border: "1px solid #dad7d7", padding: 1.5 }}>
                <ThumbUpOutlinedIcon />
              </IconButton>
              <IconButton aria-label={"label"} sx={{ border: "1px solid #dad7d7", padding: 1.5 }}>
                <ThumbDownOutlinedIcon />
              </IconButton>
            </Stack>

            <Button
              sx={{
                textTransform: "none",
                mb: 1.1,
              }}>
              <Typography variant="body2" color="primary">
                <b>Suggest an edit</b>
              </Typography>
            </Button>
            <Typography variant="caption">Your feedback will be used to help improve the product</Typography>
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

export default FeedbackContainer;
