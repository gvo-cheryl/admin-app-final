import React, { useState } from "react";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { menuListItems } from "../component/MenuList";
import { adminUseStyles } from "../component/css/adminUseStyles";
import { Route, Redirect } from "react-router-dom";
import InfoUpdate from "../component/InfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer";
import MemberListContainer from "../container/MemberListContainer";
import AssetListContainer from "../container/AssetListContainer";
import { menuHandler } from "../store/action";

function AdminPage(props) {
  const classes = adminUseStyles();
  const { loginSuccess, response, menuOpen } = useSelector(
    (state) => state.User
  );
  const [open, setOpen] = useState(menuOpen);
  const dispatch = useDispatch();
  //dispatch(logout());
  if (!loginSuccess) return <Redirect to="/login" />;

  const handleDrawerOpen = () => {
    dispatch(menuHandler(true));
    setOpen(true);
  };
  const handleDrawerClose = () => {
    dispatch(menuHandler(false));
    setOpen(false);
  };

  const onClick = () => {
    dispatch(logout());
    setTimeout(() => {
      props.history.push("/login");
    }, 1000);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Til21 Admin
          </Typography>
          <Button
            variant="contained"
            color="default"
            className="logout"
            onClick={onClick}
          >
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {response.rData.member.name}님 환영합니다.
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{menuListItems()}</List>
        <Divider />
      </Drawer>
      <Route path={`${props.match.path}`} exact component={InfoUpdate} />
      <Route
        path={`${props.match.path}memberList`}
        component={MemberListContainer}
      />
      <Route
        path={`${props.match.path}assetlist`}
        component={AssetListContainer}
      />
    </div>
  );
}
export default AdminPage;
