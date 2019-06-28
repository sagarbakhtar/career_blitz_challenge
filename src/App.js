import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Companies from './Companies';
import JobListings from './JobListings';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Router>
          <AppBar style={{marginTop:'10px'}} position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{'flexGrow': 1}}>
                <Link style={{textDecoration: 'none'}} to="/">Career Blitz Coding Challenge</Link>
              </Typography>
              <Link style={{textDecoration: 'none'}} to="/">Companies</Link>
            </Toolbar>
          </AppBar>
          
          <Switch>
            <Route path="/" exact component={Companies} />
            <Route path="/job_listing/:company_slug" component={JobListings} />;
            <Redirect to="/" />
          </Switch>        
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default App;
