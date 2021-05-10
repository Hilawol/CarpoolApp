import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DriveEtaSharpIcon from '@material-ui/icons/DriveEtaSharp';
import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';

import { useHistory } from 'react-router-dom';
import Main from './Main/Main';
// import './userPage.css';
import Api from '../../Api/Api';
import LoginPage from '../Login/LoginPage';
import Button from '../../components/utils/Button/Button'
import CreateCarpool from '../CreateCarpool/CreateCarpool'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Test() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [view, setView] = useState("carpools");
  const [showCreateCarpool, setShowCreateCarpool] = useState(false);
  const [carpools, setCarpools] = useState(null);

  const history = useHistory();

  useEffect(() => {
    try {
      console.log("InUseEffect");
      const token = sessionStorage.getItem('token');
      console.log("token:", token);
      let parsedToken;
      if (token) {
        parsedToken = JSON.parse(token);
        setUserToken(parsedToken);
      }
      else {
        throw new Error();
      }

      const getUser = async () => {
        try {
          const result = await Api.get('/users/me', { headers: { 'Authorization': `Bearer ${parsedToken}` } });

          console.log("userData:", result?.data);
          setUserData(result.data);
          setCarpools(result.data.carpools);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setErrMsg("Error occured please try again.");
          setLoading(false);
        }
      }
      getUser();

    } catch (error) {
      console.log("error:", error)
      // setErrMsg("Error occured please try again.");
      setLoading(false);
    }
  }, [])

  const onLogout = async () => {
    console.log("logout");
    try {
      console.log(userToken);
      const result = await Api.post('/users/logout', {}, { headers: { 'Authorization': `Bearer ${userToken}` } });
      sessionStorage.removeItem('token');
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const onNewCarpool = () => {
    console.log("setShowCreateCarpool: ture")
    setShowCreateCarpool(true);
  }
  const onCreateCarpool = (carpool) => {
    setCarpools([...carpools, carpool]);
    onCloseCreateCarpool();
  }
  const onCloseCreateCarpool = () => {
    setShowCreateCarpool(false);
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    errMsg ? <div>{errMsg}</div> :
      loading ? <div>Loading...</div> :
        !userData ? <LoginPage /> :
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography className="welcomeMsg" variant="h6" noWrap>
                  Wellcome {userData.firstName}
                </Typography>
                {/* <Button text="New Carpool" onClick={onNewCarpool} /> */}
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent" //TODO:add validate
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button key={'Carpools'}>
                  <ListItemIcon><DriveEtaSharpIcon /></ListItemIcon>
                  <ListItemText primary={'Carpools'} />
                </ListItem>
                <ListItem button key={'Profile'}>
                  <ListItemIcon><AccountBoxSharpIcon /></ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button key={'logout'}>
                  <ListItemIcon><ExitToAppIcon onClick={onLogout} /></ListItemIcon>
                  <ListItemText primary={'Logout'} />
                </ListItem>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <CreateCarpool userToken={userToken} visible={showCreateCarpool} onCreateCarpool={onCreateCarpool} onCloseCreateCarpool={onCloseCreateCarpool} />
              <Main userToken={userToken} userData={userData} />
            </main>
          </div>
  );
}