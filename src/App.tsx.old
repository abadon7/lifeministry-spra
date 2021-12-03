import React from 'react';
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

export const LifeministryContext: any = React.createContext("");
const db: IDataBase = new lifeministry();

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
