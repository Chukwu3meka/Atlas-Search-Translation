import Link from "next/link";

import { LoadingButton } from "@mui/lab";
import { HomeOutlined } from "@mui/icons-material";
import { Avatar, Paper, Divider, Typography, Box, Button, Grid, Stack, Tooltip } from "@mui/material";

const Suggestions = ({ fetching, hasNext, disabled, suggestions, reviewTranslationHandler, fetchTextSuggestions }) => {
  return suggestions.length ? (
    <Stack p={1} maxWidth={1200} mx="auto">
      {suggestions.map(({ _id, sourceLanguage, translationLanguage, query, translation, suggestion }) => (
        <Paper key={_id} sx={{ m: 1, flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12} sm={6} p={1}>
              <Box>
                <Stack direction="row" alignItems="center">
                  <Avatar alt={sourceLanguage} src={`/images/languages/${sourceLanguage}.png`} sx={{ width: 15, height: 15 }} />
                  <Typography fontWeight={600} variant="body2" ml={1}>
                    {/* {query} */}
                    {sourceLanguage[0].toUpperCase() + sourceLanguage.slice(1)}
                  </Typography>
                </Stack>
                <Tooltip title="Source Text">
                  <Typography>{query}</Typography>
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
                    {/* {translationLanguage[0].toUpperCase() + translationLanguage.slice(1)} */}
                  </Typography>
                </Stack>

                <Tooltip title="Current Translation">
                  <Typography>{translation}</Typography>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
          <Divider variant="inset" />
          <Tooltip title="Suggested Translation">
            <Typography p={1}>{suggestion}</Typography>
          </Tooltip>
          <Box sx={{ float: "right" }}>
            <Button
              size="small"
              color="error"
              sx={{ mr: 1 }}
              variant="contained"
              disabled={disabled.includes(_id)}
              onClick={() => reviewTranslationHandler({ _id, review: false })}>
              Reject
            </Button>
            <Button
              size="small"
              color="success"
              variant="contained"
              disabled={disabled.includes(_id)}
              onClick={() => reviewTranslationHandler({ _id, review: true })}>
              Approve
            </Button>
          </Box>
        </Paper>
      ))}
      {hasNext && (
        <Box mt={3} textAlign="center">
          <LoadingButton loading={fetching} fullWidth={false} size="small" variant="outlined" onClick={fetchTextSuggestions}>
            Load more...
          </LoadingButton>
        </Box>
      )}
    </Stack>
  ) : (
    <Box my={10} p={1} textAlign="center">
      <Typography>No suggestions to review </Typography>

      <Divider variant="inset" sx={{ my: 2 }} />

      <Link href="/">
        <Button startIcon={<HomeOutlined />} variant="contained" sx={{ textTransform: "none" }}>
          Return to Open Translation
        </Button>
      </Link>
    </Box>
  );
};

export default Suggestions;
