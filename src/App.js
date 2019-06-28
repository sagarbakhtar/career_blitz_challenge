import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Companies from './Companies';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Router>
          <AppBar style={{marginTop:'10px'}} position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                <Link style={{textDecoration: 'none'}} to="/">Career Blitz Coding Challenge</Link>
              </Typography>
            </Toolbar>
          </AppBar>
          
          <Switch>
            <Route path="/" exact component={Companies} />
            <Redirect to="/" />
          </Switch>        
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;
