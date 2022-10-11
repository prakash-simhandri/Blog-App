import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

import { Link, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const initialState = {
  email: '',
  password: '',
  login: false,
  store: null,
  emailError: "",
  passwordError: "",
}

export class Login extends Component {
  constructor(props) {
    super(props);

    let loggedIn = false
    const token = localStorage.getItem('token')
    if (token) loggedIn = true


    this.state = initialState;
    this.state = {
      loggedIn
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "Invalid email..!"
    }
    if (!this.state.password) {
      passwordError = "Invalid Password..!"
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false
    }

    return true
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isVailid = this.validate();
    if (isVailid) {
      const user_Info = {
        email: this.state.email,
        password: this.state.password
      }
      console.log(user_Info);
      axios.post('http://localhost:2016/blog/signin', user_Info)
        .then((Response) => {
          if ('Email is not carect..!' === Response.data) {
            Swal.fire({
              icon: 'error',
              background: 'rgba(0,0,0,0) linear-gradient(#444,#111) repeat scroll 0 0',
              title: 'Oops...',
              text: 'The Email you entered is incorrect ?',
            })
          } else if ('password is not carect..!' === Response.data) {
            Swal.fire({
              icon: 'error',
              background: 'rgba(0,0,0,0) linear-gradient(#444,#111) repeat scroll 0 0',
              title: 'Oops...',
              text: 'The Password you entered is incorrect ?'

              
            })
            
          } else {
            let newToken = Response.data
            localStorage.setItem('token', newToken)
            this.setState({
              loggedIn: true
            })
          }
        })
    }

  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />
    }
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="9" lg="6" className="mx-auto mt-5">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="unlock" /> Login:
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.handleSubmit}>
                  <div className="brown-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                    <div style={{ textAlign: 'center', color: 'red' }}>
                      <p>{this.state.emailError}</p>
                    </div>
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    <div style={{ textAlign: 'center', color: 'red', }}>
                      <p>{this.state.passwordError}</p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <MDBBtn className="mb-3"
                      type="submit"
                      gradient="aqua">
                      Login
                    <MDBIcon icon="heart" className="ml-2" /></MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">

                    <p> Not a member?<Link to="/register" > Sign Up
                      </Link></p>
                    <p>Forgot Password?</p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Login
