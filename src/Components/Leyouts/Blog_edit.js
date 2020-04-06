import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBInput, MDBCardText } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const initialState = {
    tittle: '',
    description: '',
    content: '',
}
export class Blog_edit extends Component {
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

    componentDidMount(){
        axios.get('http://localhost:2016/blog/one/'+this.props.match.params.unique_id)
            .then(response =>{
                this.setState({
                    tittle:response.data.tittle,
                    description:response.data.description,
                    content:response.data.content

                })
            }).catch(err=> console.log(err))
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
            const user_data = {
                tittle: this.state.tittle,
                description: this.state.description,
                content: this.state.content,
            }
            axios.post('http://localhost:2016/blog/update/'+this.props.match.params.unique_id,user_data)
            .then((response)=>{
               if(response.data === 'Blog updated..!'){
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
                                    <h1 style={{'text-shadow': '1px 1px 4px black'}} className="shadow-box-example hoverable font-weight-bold text-monospace text-center mb-4">Edit Blog</h1>
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
                                            Edit
                                    {/* <MDBIcon icon="plus" className="ml-1" /> */}
                                    <MDBIcon far icon="edit" className="ml-1" />
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

export default Blog_edit
