import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TranslationContainer, SourceTextContainer } from ".";

const TextTranslator = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container>
      <Grid item xs={12} sm={6}>
        <SourceTextContainer />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TranslationContainer />
      </Grid>
    </Grid>
  </Box>
);

export default TextTranslator;
