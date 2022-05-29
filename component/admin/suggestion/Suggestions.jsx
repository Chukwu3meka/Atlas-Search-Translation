import { Avatar, Paper, Divider, Typography, Box, Button, Grid, Stack, Tooltip } from "@mui/material";

const Suggestions = ({ suggestions, rejectTranslationHandler, approveTranslationHandler }) => {
  return (
    <Stack p={1} maxWidth={1200} mx="auto">
      {suggestions?.map(({ _id, sourceText, sourceLanguage, translationText, translationLanguage, suggestedTranslation }) => (
        <Paper key={_id} sx={{ m: 1, flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12} sm={6} p={1}>
              <Box>
                <Stack direction="row" alignItems="center">
                  <Avatar alt={sourceLanguage} src={`/images/languages/${sourceLanguage}.png`} sx={{ width: 15, height: 15 }} />
                  <Typography fontWeight={600} variant="body2" ml={1}>
                    {sourceLanguage[0].toUpperCase() + sourceLanguage.slice(1)}
                  </Typography>
                </Stack>
                <Tooltip title="Source Text">
                  <Typography>{sourceText}</Typography>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} bgcolor="#eeeeee" p={1}>
              <Box>
                <Stack direction="row" alignItems="center">
                  <Avatar
                    alt={translationLanguage}
                    src={`/images/languages/${translationLanguage}.png`}
                    sx={{ width: 15, height: 15 }}
                  />
                  <Typography fontWeight={600} variant="body2" ml={1}>
                    {translationLanguage[0].toUpperCase() + translationLanguage.slice(1)}
                  </Typography>
                </Stack>

                <Tooltip title="Current Translation">
                  <Typography>{translationText}</Typography>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
          <Divider variant="inset" flexItem />
          <Tooltip title="Suggested Translation">
            <Typography p={1}>{suggestedTranslation}</Typography>
          </Tooltip>
          <Box sx={{ float: "right" }}>
            <Button
              size="small"
              color="error"
              sx={{ mr: 1 }}
              variant="contained"
              onClick={rejectTranslationHandler({ _id, sourceText, sourceLanguage, translationLanguage, suggestedTranslation })}>
              Reject
            </Button>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={approveTranslationHandler({ _id, sourceText, sourceLanguage, translationLanguage, suggestedTranslation })}>
              Approve
            </Button>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default Suggestions;
