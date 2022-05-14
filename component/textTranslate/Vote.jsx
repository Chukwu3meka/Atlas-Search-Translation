import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

const Vote = ({
  open,
  anchorEl,
  voteStatus,
  voteDisabled,
  suggestAnEditHandler,
  hideFeedbackMenuHandler,
  upvoteTranslationHandler,
  downvoteTranslationHandler,
  displayFeedbackMenuHandler,
}) => (
  <>
    <Tooltip title="Rate this translation">
      <IconButton
        id="basic-button"
        aria-haspopup="true"
        aria-label="rate-this-translation"
        onClick={displayFeedbackMenuHandler}
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? "basic-menu" : undefined}>
        {voteStatus === 1 ? <ThumbUpIcon /> : voteStatus === -1 ? <ThumbDownIcon /> : <ThumbsUpDownOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
    <Menu
      open={open}
      id="basic-menu"
      anchorEl={anchorEl}
      onClose={hideFeedbackMenuHandler}
      MenuListProps={{ "aria-labelledby": "basic-button" }}>
      <Paper elevation={0} sx={{ borderRadius: 20 }}>
        <Box display="flex" flexDirection="column" p={1.5} maxWidth={230}>
          <Typography variant="body1" sx={{ fontWeight: "bold", textAlignLast: "center" }}>
            Are you satisfied with this translation?
          </Typography>

          <Stack direction="row" spacing={3} key={"label"} justifyContent="center" alignItems="center" mt={1.6} mb={0.4}>
            <IconButton
              aria-label={"label"}
              disabled={voteDisabled}
              onClick={upvoteTranslationHandler}
              sx={{ border: "1px solid #dad7d7", padding: 1.5 }}>
              <Tooltip title="Good translation">{voteStatus === 1 ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</Tooltip>
            </IconButton>

            <IconButton
              aria-label={"label"}
              disabled={voteDisabled}
              onClick={downvoteTranslationHandler}
              sx={{ border: "1px solid #dad7d7", padding: 1.5 }}>
              <Tooltip title="Poor translation">{voteStatus === -1 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}</Tooltip>
            </IconButton>
          </Stack>

          <Button onClick={suggestAnEditHandler} sx={{ textTransform: "none", mb: 1.1 }}>
            <Typography variant="body2" color="primary">
              <b>Suggest an edit</b>
            </Typography>
          </Button>
          <Typography variant="caption">Your feedback will be used to help improve the product</Typography>
        </Box>
      </Paper>
    </Menu>
  </>
);

export default Vote;
