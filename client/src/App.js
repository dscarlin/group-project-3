import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HideAppBar from "./components/HideAppBar"
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <HideAppBar/>
      {[...new Array(100)].map(item =>(<p>item</p>))} {/*here temporarily to show hiding feature of appbar on scrolling*/}

     
    </React.Fragment>
    );
  }
}

export default App;
