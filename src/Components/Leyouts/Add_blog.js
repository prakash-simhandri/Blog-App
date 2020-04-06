import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBInput, MDBCardText } from 'mdbreact';
import Post_icon from './post.png';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const initialState = {
    tittle: '',
    description: '',
    content: '',
}

export class Input extends Component {
    constructor(props) {
        super(props);

        let loggedIn = false
        const token = localStorage.getItem('token')
        if (token) loggedIn = true

        this.state = initialState;

        this.state = {
            loggedIn,
            token
        }
        this.handleTittle = this.handleTittle.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleContent = this.handleContent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleTittle = (event) => {
        this.setState({
            tittle: event.target.value
        })
    }
    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleContent = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    validate = () => {
        let tittleError = "";
        let descriptionError = "";
        let contentError = "";

        if (!this.state.tittle) {
            tittleError = "Invalid Title..?"
        }
        if (!this.state.description) {
            descriptionError = "Invalid Description..?"
        }
        if (!this.state.content) {
            contentError = "Invalid Content..?"
        }

        if (tittleError || descriptionError || contentError) {
            this.setState({ tittleError, descriptionError, contentError });
            return false
        }

        return true
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const isVailid = this.validate();
        if (isVailid) {
            axios.post('http://localhost:2016/blog/verifytoken', { newToken: this.state.token })
                .then((response) => {
                    
                    const user_data = {
                        unique_id: response.data.Response._id,
                        username: response.data.Response.name,
                        tittle: this.state.tittle,
                        description: this.state.description,
                        content: this.state.content,
                    }
                    // console.log(user_data);
                    axios.post('http://localhost:2016/blog/post',user_data)
                        .then((response)=>{
                           if(response.data === 'Done..'){
                            Swal.fire({
                                title: 'Done..',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              window.location = "/section"
                           }else{
                               console.log(response.data);
                               
                           }
                           
                        })

                }).catch((reject) => {
                    console.log(reject);

                })
        }
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/section" />
        }
        return (
            <MDBCol lg="11" className="mx-auto mt-5">
                <MDBCard>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="9" lg="9" className="mx-auto mt-5">
                                <form onSubmit={this.handleSubmit}>
                                    <p className="shadow-box-example hoverable h5 text-center mb-4"><img src={Post_icon} alt="post logo" style={{ width: 100 }} /></p>
                                    <div className="grey-text">
                                        <MDBInput label="Your Tittle" value={this.state.tittle} onChange={this.handleTittle} group type="text" validate error="wrong"
                                            success="right" />

                                        <MDBCard color="light-blue lighten-5" className="w-responsive text-center mx-auto mt-1">
                                            <MDBCardText className="text-danger" >
                                                {this.state.tittleError}
                                            </MDBCardText>
                                        </MDBCard>

                                        <MDBInput label="Description" value={this.state.description} onChange={this.handleDescription} group type="text" validate error="wrong"
                                            success="right" />

                                        <MDBCard color="light-blue lighten-5" className="w-responsive text-center mx-auto mt-1">
                                            <MDBCardText className="text-danger" >
                                                {this.state.descriptionError}
                                            </MDBCardText>
                                        </MDBCard>

                                        <label for="exampleTextarea" group class="bmd-label-floating">The content</label>
                                        <textarea type='text' value={this.state.content} onChange={this.handleContent} class="form-control" id="exampleTextarea" rows="3"></textarea>

                                        
                                        <MDBCard color="light-blue lighten-5" className="w-responsive text-center mx-auto mt-3">
                                            <MDBCardText className="text-danger" >
                                                {this.state.contentError}
                                            </MDBCardText>
                                        </MDBCard>

                                    </div>

                                    <br />
                                    <div className="text-right">
                                        <MDBBtn type="submit" outline color="secondary">
                                            ADD
                                    <MDBIcon icon="plus" className="ml-1" />
                                        </MDBBtn>
                                    </div>
                                    <br />
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBCard>
            </MDBCol>
        );
    }
}

export default Input