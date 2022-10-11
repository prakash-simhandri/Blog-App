import React, { Component } from 'react'
// import Heaber from './Leyouts/Navbar'
import Section from './Leyouts/Blog_sections';
import MY_blog from './Leyouts/My_blog';
import Add_blogs from './Leyouts/Add_blog';
import Bolg_logo from './Leyouts/blog.jpg';
import Edit_blog from "./Leyouts/Blog_edit"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,MDBBtn
} from "mdbreact";

export class Home extends Component {
    constructor(props) {
        super(props);
        let loggedIn = false
        const token = localStorage.getItem('token')
        if (token) loggedIn = true
        this.logout = this.logout.bind(this)

        this.state = {
            loggedIn
        }
    }

    logout() {
        this.setState({
            loggedIn: false
        })
    }

    bStyle={
        borderRadius: 10,
        paddingTop:5,
        paddingBottom:5,
    }

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
          
        if (this.state.loggedIn === false) {
            return <Redirect to="/logout" />
        }
        return (
            <Router>
                <div>
                    <MDBNavbar className="font-weight-bold px-2 mb-4" color="blue-gradient" dark expand="md">
                        <MDBNavbarBrand>
                            <img src={Bolg_logo} alt="website logo" style={{ width: 90, marginTop: 0, borderRadius: 30 }} />
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem>
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
                                    <img className="user_profile" src="https://s3-ap-southeast-1.amazonaws.com/assets.paytm.com/images/cinema/3-0eee039b-f338-4b7a-8ac2-2257442136c9.jpg" alt="website logo" />

                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBBtn onClick={this.logout} type='button' title="Logout" outline color="white" style={this.bStyle}>logout</MDBBtn>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                    {/* <Heaber /> */}
                    <Switch>
                        <Route path="/section" component={Section} />
                        <Route path="/myblog" component={MY_blog} />
                        <Route path="/addblog" component={Add_blogs} />
                        <Route path="/edit/:unique_id" component={Edit_blog}/>
                        <Redirect to="/section"></Redirect>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Home
