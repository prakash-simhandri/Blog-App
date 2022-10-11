import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn, MDBIcon, MDBLink, MDBCardText } from "mdbreact";
import axios from 'axios';
import Blog_IMG from './blogging.jpg';

const Blog = props => (
    <div>
        <MDBRow>
            <MDBCol lg="5" xl="4">
                <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
                    <img
                        className="img-fluid"
                        src={Blog_IMG}
                        alt=""
                    />
                    <a href="">
                        <MDBMask overlay="white-slight" />
                    </a>
                </MDBView>
            </MDBCol>
            <MDBCol lg="7" xl="8">
                <br />
                <h3 className="font-weight-bold mb-3 p-0">
                    <strong>{props.blogs.tittle}</strong>
                </h3>
                <br />
                <p className="dark-grey-text">
                    {props.blogs.description}
                </p>
                <br />
                <p>
                    by <a className="font-weight-bold">{props.blogs.username}</a>, {props.blogs.date}
                </p>
                <MDBCardBody>
                    <MDBBtn color="primary" size="md">
                        Read More
                             </MDBBtn>

                    <MDBBtn onClick={() => { props.deleteBlog(props.blogs._id) }} className="float-xl-right" tag="a" size="sm" gradient="purple">
                        <MDBIcon size="lg" far icon="trash-alt" />
                    </MDBBtn>

                    <MDBBtn className="float-xl-right" size="sm" tag="a" gradient="purple">
                        <MDBLink to={"/edit/" + props.blogs._id} className="w-1 p-0" link>
                            <MDBIcon className="text-white" size="lg" fab icon="expeditedssl" /> Edit
                        </MDBLink>
                    </MDBBtn>
                </MDBCardBody>

            </MDBCol>
        </MDBRow>
        <hr className="my-5" />
    </div>
)

export class My_blog extends Component {
    constructor(props) {
        super(props);

        this.deleteBlog = this.deleteBlog.bind(this);
        this.state = { blogs: [], ListError: "" };
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            axios.post('http://localhost:2016/blog/verifytoken', { newToken: token })
                .then((Response) => {
                    axios.get('http://localhost:2016/blog/mydata/' + Response.data.Response._id)
                        .then((results) => {
                            console.log(results.data);
                            if (results.data.length <= 0) {
                                this.setState({ ListError: "NO Blogs" })
                            }

                            this.setState({ blogs: results.data })

                        }).catch((cause) => {
                            console.log(cause);

                        })
                }).catch((Reject) => {
                    console.log(Reject);

                })
        } else {
            window.location = '/login'
        }
    }

    deleteBlog(id) {
        axios.delete('http://localhost:2016/blog/delete/' + id)
            .then(res => console.log(res.data))
        this.setState({
            blogs: this.state.blogs.filter(el => el._id !== id)
        })
    }

    blogsList() {
        return this.state.blogs.map(currentblog => {
            return <Blog blogs={currentblog} deleteBlog={this.deleteBlog} key={currentblog._id} />;
        })
    }

    render() {
        return (
            <MDBCard className="my-5 px-5 pb-5">
                <MDBCardBody>
                    <h2 className=" shadow-box-example hoverable h1-responsive font-weight-bold text-center my-5">
                        My posts
                </h2>
                    <MDBCard color="light-blue lighten-5" className="w-responsive text-center mx-auto mt-1 border bg-light">
                        <MDBCardText className="font-weight-bold text-danger" >
                        {this.state.ListError}
                        </MDBCardText>
                    </MDBCard>
                    <br/>

                    {this.blogsList()}


                </MDBCardBody>
            </MDBCard>
        );
    }
}

export default My_blog;
