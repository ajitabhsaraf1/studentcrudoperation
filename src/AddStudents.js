import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/filecss/style.css';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import { Dialog } from 'primereact/dialog';

import { Calendar } from 'primereact/calendar';


export default class AddStudents extends React.Component {


    constructor(props) {
        debugger
        let studentslist = JSON.parse(localStorage.getItem("studentslist"));
        let studentrecordindex = null;

        super(props);
        if (props && props.match && props.match.params && props.match.params.id) {
            studentrecordindex = studentslist.findIndex(x => x.id == props.match.params.id);
            debugger
            let student = studentslist[studentrecordindex];
            this.state = {
                title: 'Update Student', id: props.match.params.id,
                firstname: student.firstname, lastname: student.lastname, fathersname: student.fathersname, email: student.email, mobilenumber: student.mobilenumber, gender: student.gender, date: student.date, address: student.address, Country: student.Country,
                isInvalid: false, invalidMail: false, invalidMobile: false, images: studentslist[studentrecordindex].images
            }

        }
        else {
            this.state = {
                title: 'Add Student', id: null,
                firstname: '', lastname: '', fathersname: '', email: '', mobilenumber: '', gender: '', date: new Date(), address: '', Country: '',
                isInvalid: true, invalidMail: false, invalidMobile: false, images: ''
            };
        }

        this.detectChange = this.detectChange.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    componentWillReceiveProps(newProps) {
        debugger
    }

    detectChange = (event) => {
        debugger
        this.setState({ [event.target.name]: event.target.value });
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (event.target.name == 'email') {
            if (re.test(event.target.value)) {
                this.setState({ invalidMail: false });
                this.setState({ isInvalid: false });

            }
            else {
                this.setState({ invalidMail: true });
                this.setState({ isInvalid: true });
            }
        }

        if (event.target.name == 'img') {
            debugger
            var img = null;
            var input = document.getElementById("img");
            var fReader = new FileReader();
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function (event) {
                img = document.getElementById("img");
                img.src = event.target.result;
                debugger

            }
            setTimeout(() => {
                this.setState({ images: img.src });
            }, 1000);

        }

        if (event.target.name == 'mobilenumber') {
            debugger
            if ((event.target.value.length) != 10 || isNaN(event.target.value)) {
                this.setState({ invalidMobile: true });
                this.setState({ isInvalid: true });

            }
            else {
                this.setState({ invalidMobile: false });
                this.setState({ isInvalid: false });
            }
        }



    }

    saveData() {
        debugger
        if (this.state.firstname != '' &&
            this.state.lastname != '' &&
            this.state.fathersname != '' &&
            this.state.email != '' &&
            this.state.mobilenumber != '' &&
            this.state.gender != '' &&
            this.state.address != '' &&
            this.state.Country != ''
            && this.state.isInvalid == false
        ) {

            let studentslist = JSON.parse(localStorage.getItem("studentslist"));

            let studentrecordindex = studentslist.findIndex(x => x.id == this.state.id);
            debugger
            if (studentrecordindex != -1) {
                studentslist[studentrecordindex] =
                    {
                        id: this.state.id,
                        firstname: this.state.firstname,
                        images: this.state.images,
                        lastname: this.state.lastname,
                        fathersname: this.state.fathersname,
                        email: this.state.email,
                        mobilenumber: this.state.mobilenumber,
                        date: this.state.date,
                        gender: this.state.gender,
                        address: this.state.address,
                        Country: this.state.Country,
                        images: this.state.images
                    }
                localStorage.setItem('studentslist', JSON.stringify(studentslist));
                alert('Data Saved');

            }
            else {


                let id = 0;
                studentslist && studentslist.length ? id = studentslist[0].id + 1 : id = 1;
                studentslist.push({
                    id: id,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    images: this.state.images,

                    fathersname: this.state.fathersname,
                    email: this.state.email,
                    date: this.state.date,
                    mobilenumber: this.state.mobilenumber,
                    gender: this.state.gender,
                    address: this.state.address,
                    Country: this.state.Country,
                    images: this.state.images
                })
                debugger
                localStorage.setItem('studentslist', JSON.stringify(studentslist));

                alert('Data Saved');
                setTimeout(() => {
                    // window.location.reload();
                    this.state = {
                        firstname: '', lastname: '', fathersname: '', email: '', mobilenumber: '', gender: '', date: new Date(), address: '', Country: '',
                        images: '',
                        isInvalid: true, invalidMail: false, invalidMobile: false,
                    };
                }, 1000);
            }
        }
        else {
            alert('Please Enter Valid Data');
        }
    }

    render() {
        return (
            <div style={{ 'margin-left': "300px", 'margin-top': "21px" }}>
                <div className="content-wrapper">
                    <div className="card">
                        <div className="card-header">
                            <h4 id="basic-forms" className="card-title">{this.state.title}</h4>
                            <hr />
                        </div>
                        <div className="card-body">
                            <div className="card-content">
                                <form>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>First name</label>
                                                <input class="form-control" type="text" value={this.state.firstname} onChange={(e) => { this.detectChange(e) }}
                                                    placeholder="Enter First Name" id="firstname"
                                                    name="firstname" />
                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Last name</label>
                                                <input class="form-control" placeholder="enter last name" type="text" value={this.state.lastname} onChange={(e) => { this.detectChange(e) }}
                                                    name="lastname" />
                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input class="form-control" type="text" onChange={(e) => { this.detectChange(e) }}
                                                    value={this.state.email} placeholder="Enter email address" id="email"
                                                    name="email" />
                                                {this.state.invalidMail && (
                                                    <p style={{ 'color': 'red' }}>Invalid Mail</p>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <textarea class="form-control" type="text" value={this.state.address} onChange={(e) => { this.detectChange(e) }}
                                                    rows="3" placeholder="Enter Address" id="address"
                                                    name="address" />
                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Mobile Number</label>
                                                <input class="form-control" type="number" onChange={(e) => { this.detectChange(e) }}
                                                    placeholder="Enter Mobile" id="mobilenumber" value={this.state.mobilenumber}
                                                    name="mobilenumber" />
                                                {this.state.invalidMobile && (
                                                    <p style={{ 'color': 'red' }}>Invalid Mobile Number</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group" style={{ 'margin-left': '10px' }}>
                                                <label><b />Gender</label>
                                                <br />
                                                <input type="radio" name="gender" value="male" onChange={this.detectChange} /> Male<br />
                                                <input type="radio" name="gender" value="female" onChange={this.detectChange} /> Female<br />

                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>DOB</label>

                                                <input value={this.state.date} className="form-control" type="date" id="date" name="date" onChange={(e) => { this.detectChange(e) }} />

                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Country </label>
                                                <select name="Country" id="Country" className="form-control" value={this.state.Country} onChange={(e) => { this.detectChange(e) }}>
                                                    <option value="">Please Choose Country</option>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="China">China</option>
                                                    <option value="USA">USA</option>
                                                    <option value="Canada">Canada</option>
                                                </select>
                                                {/* <p>Product Code is required</p> */}
                                            </div>

                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group" style={{ 'margin-left': '10px' }}>
                                                <label>Fathers name</label>
                                                <input class="form-control" type="text" onChange={(e) => { this.detectChange(e) }}
                                                    value={this.state.fathersname} placeholder="Enter Father's Name" id="fathersname"
                                                    name="fathersname" />
                                            </div>

                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <input onChange={this.detectChange} type="file" id="img" name="img" accept="image/*" />
                                        </div>
                                        <div className="col-md-4"></div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <img style={{ 'height': '500px', 'width :': '500px' }} src={this.state.images} />
                                        </div>
                                        <div className="col-md-4"></div>

                                    </div>

                                    <div className="row" style={{ 'float': 'right' }}>
                                        <input type="button" class="btn btn-info" value="Save" onClick={(e) => { this.saveData() }} style={{ 'margin-right': '10px' }} />

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}