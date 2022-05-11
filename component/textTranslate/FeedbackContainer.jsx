import { connect } from "react-redux";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";

import { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction } from "@store/actions";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Stack, Box, Paper, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useEffect } from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const FeedbackContainer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction } = props;
  const [voteDisabled, setVoteDisabled] = useState(true);
  // translationID: state.textTranslation.id,
  // goodTranslations: state.textTranslation.goodTranslations,
  // poorTranslations: state.textTranslation.poorTranslations,

  const [voteStatus, setVoteStatus] = useState(0);

  const [translationID, setTranslationID] = useState(null);
  const [goodTranslations, setGoodTranslations] = useState([]);
  const [poorTranslations, setPoorTranslations] = useState([]);
  const [translations, setTranslations] = useState([]); // voted translation
  const [translationSource, setTranslationSource] = useState("");
  // detect when good/poor translations has been modified
  useEffect(() => {
    setTranslations([...props.goodTranslations, ...props.poorTranslations]);
    setVoteStatus(() => {
      // if upvoted, set voteStatus to 1
      // if not voted, set voteStatus to 0
      // if downvoted, set voteStatus to -1
      return props.goodTranslations.includes(translationID) ? 1 : props.poorTranslations.includes(translationID) ? -1 : 0;
    });
  }, [props.goodTranslations, props.poorTranslations]);

  // detect when translationId has changed
  useEffect(() => {
    setTranslationID(props.translationID);
    setTranslationSource(props.translationSource);
    setVoteDisabled(translations.includes(props.translationID));
  }, [props.translationID, props.translationSource]);

  const upvoteTranslationHandler = () => {
    setVoteDisabled(true);
    upvoteTranslationAction(translationID);
  };

  const downvoteTranslationHandler = () => {
    setVoteDisabled(true);
    downvoteTranslationAction(translationID);
  };

  const suggestAnEditHandler = () => {
    hideFeedbackMenuHandler();
    enableSuggestAnEditAction(true);
  };

  const displayFeedbackMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideFeedbackMenuHandler = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Rate this translation">
        <IconButton
          aria-label="rate-this-translation"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={displayFeedbackMenuHandler}>
          {voteStatus === 1 ? <ThumbUpIcon /> : voteStatus === -1 ? <ThumbDownIcon /> : <ThumbsUpDownOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={hideFeedbackMenuHandler}
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

            <Button
              onClick={suggestAnEditHandler}
              sx={{
                textTransform: "none",
                mb: 1.1,
              }}>
              <Typography variant="body2" color="primary">
                <b>Suggest an edit</b>
              </Typography>
            </Button>
            <Typography variant="caption">Your feedback will be used to help improve the product</Typography>
            {/* <MenuItem onClick={hideFeedbackMenuHandler}>Profile</MenuItem>
        <MenuItem onClick={hideFeedbackMenuHandler}>My account</MenuItem>
      <MenuItem onClick={hideFeedbackMenuHandler}>Logout</MenuItem> */}
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
    translationID: state.textTranslation.id,
    translationSource: state.textTranslation.source,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackContainer);
