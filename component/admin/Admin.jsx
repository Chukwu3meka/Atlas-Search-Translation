import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Link from "next/link";
import { Box } from "@mui/material";
import { Fragment } from "react";

const Admin = () => (
  <List sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper", mx: "auto", my: 3 }}>
    {adminPages.map(({ title, Icon, path, desc }, index, arr) => (
      <Fragment key={title}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Icon color="primary" sx={{ fontSize: 30, mt: 1 }} />
          </ListItemAvatar>
          <Link href={`/admin${path}`}>
            <ListItemText primary={title} secondary={<>{` — ${desc}`}</>} sx={{ cursor: "pointer" }} />
          </Link>
        </ListItem>
        {index < arr.length - 1 && <Divider variant="inset" component="li" />}
      </Fragment>
    ))}
  </List>
);

export default Admin;

const adminPages = [
  {
    title: "Review Suggestion",
    Icon: SettingsSuggestIcon,
    path: "/suggestions",
    desc: "Approve or Reject suggestions/contributions from the community",
  },
  {
    title: "Review Users",
    Icon: PrecisionManufacturingIcon,
    path: "/profiles",
    desc: "Suspend or Delete user accounts",
  },
  // {
  //   title:"",
  //   icon:"",
  //   path:"",
  //   desc:"",
  // },
];
