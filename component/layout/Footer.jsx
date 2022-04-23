import { Box, IconButton, Stack, Typography } from "@mui/material";

const Footer = ({ bottomButtons, displaySidebarHandler }) => (
  <Box
    margin="auto"
    sx={{
      width: "fit-content",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      margin: "auto",
      marginTop: 7,
    }}>
    {bottomButtons.map(({ label, icon }) => (
      <a key={label} onClick={displaySidebarHandler(label)}>
        <Stack direction="column" spacing={1} key={label} justifyContent="center" alignItems="center">
          <IconButton aria-label={label} sx={{ border: "1px solid #dad7d7", padding: 2.2 }}>
            {icon}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      </a>
    ))}
  </Box>
);

export default Footer;
