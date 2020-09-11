import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/filecss/style.css';
import ReactDOM from 'react-dom';

import ViewStudents from './ViewStudents'
import AddStudents from './AddStudents'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'



export default class App extends React.Component {

  constructor(props) {
    super(props);
    var studentslist = [];
    // localStorage.setItem('studentslist', JSON.stringify(studentslist));
  }
  render() {
    return (
      <Router>
        <div>

          <div class="sidenav">
            <Link to="/ViewStudent">ViewStudent</Link>
            <Link to="/AddStudents">AddStudents</Link>
            
          </div>

          <Switch>
            <Route path="/ViewStudent" component={ViewStudents} />
            <Route path="/AddStudents" component={AddStudents} />
            <Route path="/AddStudents/:id" component={AddStudents} />


          </Switch>
        </div>
      </Router>

    );
  }
}



