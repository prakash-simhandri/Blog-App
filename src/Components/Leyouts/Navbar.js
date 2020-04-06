import React, { Component } from 'react'

import Bolg_logo from './blog.jpg'
import profile_logo from './profile.jpg'

// import {Redirect} from 'react-router-dom'

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
} from "mdbreact";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

export class Navbar extends Component {

    // constructor(props) {
    //     super(props);
    //     let loggedIn = false
    //     const token = localStorage.getItem('token')
    //     if (token) loggedIn = true
        
    //     this.logout = this.logout.bind(this)

    //     this.state = {
    //         loggedIn
    //     }
    // }
    
    // logout(){
    //     this.setState({
    //         loggedIn:false
    //     })
    // }

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
        // if (this.state.loggedIn === false) {
        //     return <Redirect to="/logout"/>
        //   }
        return (
            <MDBNavbar className="font-weight-bold px-2 mb-4" color="blue-gradient" dark expand="md">
                <MDBNavbarBrand>
                    <img src={Bolg_logo} alt="website logo" style={{ width: 90, marginTop: 0, borderRadius: 30 }} />
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/section">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/myblog">MyBlogs</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/addblog">AddBlog</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            {/* <img className="user_profile" src={profile_logo} alt="website logo" /> */}
                            <img className="user_profile" src="https://pbs.twimg.com/media/EPcIBqRVUAElnuC.jpg" alt="website logo" />

                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink onClick={this.logout} className="waves-effect waves-light" to="!#">
                                <MDBIcon icon="sign-out-alt" size="2x" />
                            </MDBNavLink>

                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default Navbar

