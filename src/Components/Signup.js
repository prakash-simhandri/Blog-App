
import React, { Component } from 'react'
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
  MDBBtn
} from "mdbreact";
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const initialState = {
  username: '',
  email: '',
  password: '',
  nameError: "",
  emailError: "",
  passwordError: "",
}

export class Signup extends Component {
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

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
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

  validate =()=>{
    let nameError= "";
    let emailError= "";
    let passwordError= "";

    if (!this.state.email) {
      emailError = 'Invalid email...?'
    }
    if (!this.state.password) {
      passwordError = 'Invalid password...?'
    }
    if (!this.state.username) {
      nameError = 'Invalid name...?'
    }

    if(emailError || nameError || passwordError){
      this.setState({ emailError,nameError,passwordError })
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const isVailid = this.validate();
    if(isVailid){
      const user_data = {
        username: this.state.username,
        useremail: this.state.email,
        password: this.state.password
      }
      // console.log(user_data);
      axios.post('http://localhost:2016/blog/signup', user_data)
        .then((result) => {
          console.log(result);
          if (result.data.includes('email_1')) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'This Email is already taken..!'
            })
          } else if (result.data.includes('password_1')) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'This Password is already taken..!'
            })
          }else if (result.data.includes('shorter')) {
            Swal.fire(
              'Password ?',
              'This Password length is vary short..! (Reqired Legth:5)',
              'question'
            )
          }else {
            Swal.fire({
              title: 'Success..',
              text: "your account has been created successfully",
              icon: 'success',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login..'
            }).then((result) => {
              if (result.value) {
                Swal.fire({
                  title: 'Done..',
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location = "/login"
              }
            })
          }
  
        }).catch((reject) => {
          console.log(reject);
  
        })
  
    }
  }

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/home" />
    }
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="9" lg="6" className="mx-auto mt-5">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Sign up:
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.handleSubmit}>

                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Your name
                </label>
                  <input type="text" id="defaultFormRegisterNameEx" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />

                  <div style={{ textAlign: 'center', color: 'red' }}>
                    <p>{this.state.nameError}</p>
                  </div>

                  <label
                    htmlFor="defaultFormEmailEx"
                    className="grey-text font-weight-light"
                  >
                    Your email
                </label>
                  <input
                    type="email"
                    id="defaultFormEmailEx"
                    className="form-control"
                    value={this.state.gmail}
                    onChange={this.handleEmailChange}
                  />

                  <div style={{ textAlign: 'center', color: 'red' }}>
                    <p>{this.state.emailError}</p>
                  </div>

                  <label
                    htmlFor="defaultFormPasswordEx"
                    className="grey-text font-weight-light"
                  >
                    Your password
                </label>
                  <input
                    type="password"
                    id="defaultFormPasswordEx"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />

                  <div style={{ textAlign: 'center', color: 'red' }}>
                    <p>{this.state.passwordError}</p>
                  </div>

                  <div className="text-center mt-4">
                    <MDBBtn gradient="purple" className="mb-3" type="submit">
                      sign up
                  </MDBBtn>
                  </div>

                </form>

                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>I,am a member? <Link to="/login">Sign in</Link></p>

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

export default Signup
