import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";

export const menuListItems = () => {
  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="개인정보수정" />
      </ListItem>
      <ListItem button component={Link} to="/memberList">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="전체회원관리" />
      </ListItem>
      <ListItem button component={Link} to="/assetlist">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="자산조회수정" />
      </ListItem>
    </div>
  );
};
