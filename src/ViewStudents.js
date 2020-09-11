import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/filecss/style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Dialog } from 'primereact/dialog';
import AddStudents from './AddStudents'
export default class ViewStudents extends React.Component {

    constructor(props) {
        super(props);

        let studentslist = JSON.parse(localStorage.getItem("studentslist"));
        this.state = { studentslist: studentslist };

        this.remove = this.remove.bind(this);
        this.edit = this.edit.bind(this);
        debugger
    }

    remove(id) {
        if (window.confirm("Press a button!")) {
            let studentlist = this.state.studentslist;
            let studentrecordindex = studentlist.findIndex(x => x.id == id);
            studentlist.splice(studentrecordindex, 1);
            localStorage.setItem('studentslist', JSON.stringify(studentlist));

            this.setState({ studentslist: studentlist })
        } else {

        }

    }

    edit() {

    }

    render() {
        return (
            <Router>
                <div style={{ 'margin-left': "300px", 'margin-top': "21px" }}>


                    <div className="content-wrapper">
                        <div className="card">
                            <div className="card-header">
                                <h4 id="basic-forms" className="card-title">Student List</h4>
                                <hr />
                            </div>
                            <div className="card-body">
                                <div className="card-content">
                                    <table class="table table-borderless table-dark">
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Gender</th>

                                        <th scope="col">Mobile</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Edit</th>

                                        <th scope="col">Delete</th>


                                        {this.state.studentslist.map((tile, i) => (
                                            <tr>
                                                <td scope="col">
                                                    {tile.id}
                                                </td>
                                                <td scope="col">
                                                    {tile.firstname + '  ' +  tile.lastname}
                                                </td>
                                                <td scope="col">
                                                    {tile.gender}
                                                </td>

                                                <td scope="col">
                                                    {tile.mobilenumber}
                                                </td>
                                                <td scope="col">
                                                    {tile.email}
                                                </td>
                                                <td scope="col">
                                                    <button class="btn btn-info">
                                                        <Link to={`/AddStudents/${tile.id}`}>Edit</Link>

                                                    </button>

                                                </td>
                                                <td scope="col">
                                                    {/* <Link to="/AddStudents/2">AddStudents</Link> */}
                                                    <input type="button" class="btn btn-info" value="Remove" onClick={(e) => { this.remove(tile.id) }} style={{ 'margin-right': '10px' }} />

                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Route path="/AddStudents/:id" component={AddStudents} />
            </Router>
        );
    }
}