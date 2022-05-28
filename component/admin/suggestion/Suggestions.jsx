import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const massNews = [
  {
    _id: "AAA",
    date: "asDS",
    image: "english",
    sourceText: "saSADASS",
    sourceLanguage: "english",
    translationText: "aDdas",
    translationLanguage: "french",
    suggestedTranslation: "aDdas",
  },
];

const Suggestions = () => {
  return (
    <Paper>
      {/* <Typography variant="h5" componet="h1">{`${sponsor} NEWS`}</Typography> */}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {massNews?.map(({ title, image, content, date }, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={title} src={`/images/languages/${image}.png`} />
              </ListItemAvatar>
              <ListItemText
                primary={title}
                secondary={
                  <>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2">
                      {content}
                    </Typography>
                    <i>{` — ${date}`}</i>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default Suggestions;
