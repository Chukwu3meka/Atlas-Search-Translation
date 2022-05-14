import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { Vote } from ".";
import { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction } from "@store/actions";

const VoteContainer = (props) => {
  const { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction } = props,
    [anchorEl, setAnchorEl] = useState(null), // <= anchorEl must appear before open else, it wont work
    open = Boolean(anchorEl),
    [voteStatus, setVoteStatus] = useState(0),
    [voteDisabled, setVoteDisabled] = useState(true),
    [translationID, setTranslationID] = useState(null),
    [translations, setTranslations] = useState([]); // voted translation

  // detect when good/poor translations has been modified
  useEffect(() => {
    setTranslations([...props.goodTranslations, ...props.poorTranslations]);
    setVoteStatus(() => {
      // 1. if upvoted, set voteStatus to 1, 2. if not voted, set voteStatus to 0, 3. if downvoted, set voteStatus to -1
      return props.goodTranslations.includes(translationID) ? 1 : props.poorTranslations.includes(translationID) ? -1 : 0;
    });
  }, [props.goodTranslations, props.poorTranslations]);

  // detect when translationId has changed
  useEffect(() => {
    setTranslationID(props.translationID);
    setVoteDisabled(translations.includes(props.translationID));
  }, [props.translationID, props.translationSource]);

  const upvoteTranslationHandler = () => {
    setVoteDisabled(true);
    hideFeedbackMenuHandler();
    upvoteTranslationAction(translationID);
  };

  const downvoteTranslationHandler = () => {
    setVoteDisabled(true);
    hideFeedbackMenuHandler();
    downvoteTranslationAction(translationID);
  };

  const suggestAnEditHandler = () => {
    hideFeedbackMenuHandler();
    enableSuggestAnEditAction(true);
  };

  const displayFeedbackMenuHandler = (event) => setAnchorEl(event.currentTarget);

  const hideFeedbackMenuHandler = () => setAnchorEl(null);

  return (
    <Vote
      {...{
        open,
        anchorEl,
        voteStatus,
        voteDisabled,
        suggestAnEditHandler,
        hideFeedbackMenuHandler,
        upvoteTranslationHandler,
        downvoteTranslationHandler,
        displayFeedbackMenuHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    translationID: state.textTranslation.id,
    translationSource: state.textTranslation.source,
    goodTranslations: state.textTranslation.goodTranslations,
    poorTranslations: state.textTranslation.poorTranslations,
  }),
  mapDispatchToProps = { upvoteTranslationAction, downvoteTranslationAction, enableSuggestAnEditAction };

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);
