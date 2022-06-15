import { forwardRef, Fragment } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/ArrowBack";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LanguageDialog = ({
  searchLanguage,
  languageOptions,
  selectedLanguage,
  displayLangDialog,
  hideLanguageDialog,
  searchLanguageHandler,
  selectLanguageHandler,
}) => (
  <Dialog fullScreen open={displayLangDialog} onClose={hideLanguageDialog} TransitionComponent={Transition}>
    <AppBar color="transparent" sx={{ position: "relative" }} sx={{ padding: 0 }}>
      <Toolbar>
        <IconButton edge="start" color="default" onClick={hideLanguageDialog} aria-label="close">
          <CloseIcon />
        </IconButton>

        <Input
          id="search-language"
          value={searchLanguage}
          variant="outlined"
          fullWidth
          onChange={searchLanguageHandler}
          autoFocus
          fullWidth
          disableUnderline={true}
          placeholder="Search Languages"
          sx={{ fontSize: 20, mb: 0.7, caretColor: "#1197c0" }}
        />
      </Toolbar>
    </AppBar>
    {!languageOptions.length && (
      <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 7, ml: -1, mr: -1, px: 1, py: 10 }}>
        <Typography variant="h5">No results</Typography>
      </Paper>
    )}
    <Box sx={{ width: "100%", mt: 7 }}>
      <List>
        {languageOptions.map((language) => (
          <Fragment key={language}>
            <ListItem disablePadding>
              {selectedLanguage === language ? (
                <IconButton aria-label="selected">
                  <CheckIcon />
                </IconButton>
              ) : (
                <Box mr={5} />
              )}
              <ListItemButton onClick={selectLanguageHandler(language)}>
                <ListItemText primary={language} />
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Box>
  </Dialog>
);

export default LanguageDialog;
