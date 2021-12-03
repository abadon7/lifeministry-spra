import React from 'react';
<<<<<<< HEAD
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Navigation } from './components/menu/navigation';
import { Route, Switch } from 'react-router-dom';
import { IDataBase } from './types/ministry.types';
import { lifeministry } from './api/lifeministry';
import Students from './pages/students';
import Generator from './pages/generator';
=======
//import logo from './logo.svg';
import './App.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import Students from './pages/students'
import Assigments from './pages/assignments'
import Navigation from './components/menu/menu'
import { DefaultPalette, IStackItemStyles, IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import {
  //BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { lifeministry } from './api/lifeministry';
import Generator from './pages/generator';
import { IDataBase } from './types/ministry.types';
>>>>>>> main

export const LifeministryContext: any = React.createContext("");
const db: IDataBase = new lifeministry();

<<<<<<< HEAD
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

export default function App() {
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
                    <Typography variant="h6" noWrap>
                       LifeMinistry
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
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
                <Navigation />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <LifeministryContext.Provider value={db}>
                        <Route path="/estudiantes">
                            <Students />
                        </Route>
                        <Route path="/asignaciones">
                            <span>Asignaciones</span>
                        </Route>
                        <Route exact path="/">
                            <Generator />
                        </Route>
                    </LifeministryContext.Provider>
                </Switch>
            </main>
        </div>
    );
}
=======
const stackStyles: IStackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
  },
};
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    //background: DefaultPalette.themePrimary,
    //color: DefaultPalette.white,
    display: 'flex',
    height: "100%",
    //width: "100%"
    //justifyContent: 'center',
  },
};

const stackItemStyles2: IStackItemStyles = {
  root: {
    alignItems: 'center',
    //background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: "100%",
    width: "100%"
    //justifyContent: 'center',
  },
};

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
  //padding: 10,
};

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm1 ms-xl1">
            <Navigation />
          </div>
          <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
            <div className="ms-Grid-row">
              <Students />
            </div>
          </div>
        </div>
      </div> */}
      <Stack horizontal styles={stackStyles} tokens={stackTokens}>
        <Stack.Item grow={3} styles={stackItemStyles}>
          <Navigation />
        </Stack.Item>
        <Stack.Item grow={2} styles={stackItemStyles2}>
          {/* <Students /> */}
          <Switch>
            <LifeministryContext.Provider value={db}>
              <Route path="/estudiantes">
                <Students />
              </Route>
              <Route path="/asignaciones">
                <Assigments />
              </Route>
              <Route exact path="/">
                <Generator />
              </Route>
              {/* <Route exact path='/' render={(props) => (<Students {...props} />)} />
            <Route path='/estudiantes' render={(props) => (<Students {...props} />)} />
            <Route path='/asiganciones' render={(props) => (<Students {...props} />)} /> */}
            </LifeministryContext.Provider>
          </Switch>
        </Stack.Item>
      </Stack>

    </div >
  );
}

export default App;
>>>>>>> main
