import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { menuListItems } from "../component/MenuList";
import { adminUseStyles } from "../component/css/adminUseStyles";
import { Route, Redirect } from "react-router-dom";
import InfoUpdate from "../component/InfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { logout } from "../store/reducer";
import MemberListContainer from "../container/MemberListContainer";
import AssetListContainer from "../container/AssetListContainer";

function AdminPage(props) {
  const classes = adminUseStyles();
  const [open, setOpen] = React.useState(true);
  const { loginSuccess, response } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  if (!loginSuccess) return <Redirect to="/login" />;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    dispatch(logout());
    props.history.push("/login");
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
        <List>{menuListItems(response.rData.adminMenu)}</List>
        <Divider />
      </Drawer>
      <Route path={`${props.match.path}`} exact component={InfoUpdate} />
      <Route
        path={`${props.match.path}memberList`}
        component={MemberListContainer}
      />
      <Route
        path={`${props.match.path}assetList`}
        component={AssetListContainer}
      />
    </div>
  );
}
export default AdminPage;
