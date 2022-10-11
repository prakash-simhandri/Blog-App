import React, { Component } from 'react'
import axios from 'axios';
import Blog_IMG from './Integra-blog.jpg';

import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView } from "mdbreact";

const Blog = props => (

  <div style={{
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "1.5rem"
  }}>
    <MDBRow>
      <MDBCol md="3">
        <MDBView hover rounded className="z-depth-1-half mb-4">
          <img
            className="img-fluid"
            src={Blog_IMG}
            alt=""
          />
          <a href="">
            <MDBMask overlay="white-slight" className="waves-light" />
          </a>
        </MDBView>
      </MDBCol>
      <MDBCol md="9">
        <div className="d-flex justify-content-between">
          <p className="text-truncate pl-0 mb-4 font-weight-bold dark-grey-text">
            {props.blogs.tittle}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <MDBCol size="11" className="text-truncate pl-0 mb-3">
            <p className="dark-grey-text">
              {props.blogs.description}
            </p>
          </MDBCol>

          <a href="">
            <MDBIcon icon="angle-double-right" />
          </a>
        </div>
        <p>
          by <a href="" className="font-weight-bold">{props.blogs.username}</a>
          <p className="float-xl-right font-weight-bold dark-grey-text">
            {props.blogs.date}
          </p>
        </p>
      </MDBCol>
    </MDBRow>
  </div>

)

const SBlog = props => (
  <div style={{
    borderBottom: "1px solid #e0e0e0",
    marginBottom: "1.5rem"
  }}>
    <MDBRow>
      <MDBCol md="3">
        <MDBView hover rounded className="z-depth-1-half mb-4">
          <img
            className="img-fluid"
            src={Blog_IMG}
            alt=""
          />
          <a href="">
            <MDBMask overlay="white-slight" className="waves-light" />
          </a>
        </MDBView>
      </MDBCol>
      <MDBCol md="9">
        <p className="font-weight-bold dark-grey-text">
          {props.blogs.tittle}
        </p>
        <div className="d-flex justify-content-between">
          <MDBCol size="11" className="text-truncate pl-0 mb-3">
            <p className="dark-grey-text">
              {props.blogs.description}
            </p>
          </MDBCol>
          <a href="">
            <MDBIcon icon="angle-double-right" />
          </a>
        </div>
        <p>
          by <a href="" className="font-weight-bold">{props.blogs.username}</a>
          <p className="float-xl-right font-weight-bold dark-grey-text">
            {props.blogs.date}
          </p>
        </p>
      </MDBCol>
    </MDBRow>
  </div>
)


export class Blog_sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs_first_list: [],
      blogs_second_list: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:2016/blog/all/section')
      .then((result) => {
        let count = parseInt(result.data.length / 2)
        const blogs_one = result.data.slice(0, count)
        const blogs_two = result.data.slice(count)

        this.setState({
          blogs_first_list: blogs_one,
          blogs_second_list: blogs_two
        })

      }).catch(cause => console.log("Error: " + cause))
  }

  FirstblogsList() {
    return this.state.blogs_first_list.map(currentBlogs => {
      return <Blog blogs={currentBlogs} />
    })
  }

  SecondblogsList() {
    return this.state.blogs_second_list.map(currentBlogs => {
      return <SBlog blogs={currentBlogs} />
    })
  }

  render() {
    return (
      <div>
        <MDBCard
          className="my-5 px-5 mx-auto"
          style={{ fontWeight: 300, maxWidth: "90%" }}
        >
          <MDBCardBody style={{ paddingTop: 0 }}>
            <h2 className="shadow-box-example hoverable h1-responsive font-weight-bold my-5 text-center">
              Section title
                  </h2>
            <p className="dark-grey-text mx-auto mb-5 w-75 text-center">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit id
              laborum.
                  </p>
            <MDBRow>
              <MDBCol lg="6" md="12">
                <div style={{
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "1.5rem"
                }}>
                  <MDBView hover rounded className="z-depth-1-half mb-4">
                    <img
                      className="img-fluid"
                      src="https://miro.medium.com/max/2000/1*F53Bz-dg4x5l4TgkKb-oyQ.jpeg"
                      alt=""
                    />
                    <a href="">
                      <MDBMask overlay="white-slight" className="waves-light" />
                    </a>
                  </MDBView>
                  <div className="d-flex justify-content-between">
                    <a href="" className="light-blue-text">
                      <h6 className="font-weight-bold">
                        <MDBIcon icon="plane" className="pr-2" />
                              Travels
                            </h6>
                    </a>
                    <p className="font-weight-bold dark-grey-text">
                      <MDBIcon far icon="clock" className="pr-2" />
                            20/02/2020
                          </p>
                  </div>
                  <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                    <a href="">It’s time to get a PhD in Coronavirus</a>
                  </h3>
                  <p className="dark-grey-text">
                    Depending on where you live, you've probably been suffering from Corona-related
                    anxiety for the last few months, Weeks, or days. And all the downplaying, the fake news,
                    even the funny memes, tend to heigthen the....
                        </p>
                </div>

                {/* First blogs Starting */}

                {this.FirstblogsList()}

                <div className="mb-4">
                  <MDBRow>
                    <MDBCol md="3">
                      <MDBView hover rounded className="z-depth-1-half mb-4">
                        <img
                          className="img-fluid"
                          src="https://miro.medium.com/max/1400/0*0Ann4QreIzvUHReT"
                          alt=""
                        />
                        <a href="">
                          <MDBMask overlay="white-slight" className="waves-light" />
                        </a>
                      </MDBView>
                    </MDBCol>
                    <MDBCol md="9">
                      <p className="font-weight-bold dark-grey-text">
                        Storing User Sessions on the Server with Express-Session
                            </p>
                      <div className="d-flex justify-content-between">
                        <MDBCol size="11" className="text-truncate pl-0 mb-3">
                          <a href="" className="dark-grey-text">
                            To store confidential session data, we can use the express-session package. It stores the session data on the server and gives the client a session ID to access the session data.
                            In this article, we’ll look at how to use it to store temporary user data.

                                </a>
                        </MDBCol>
                        <a href="">
                          <MDBIcon icon="angle-double-right" />
                        </a>
                      </div>
                      <p>
                        by <a href="" className="font-weight-bold">Prakash Simhandri</a>
                        <p className="float-xl-right font-weight-bold dark-grey-text">
                          17/08/2018
                            </p>
                      </p>

                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCol>

              {/* First blogs Ending */}

              <MDBCol lg="6" md="12">
                <div style={{
                  borderBottom: "1px solid #e0e0e0",
                  marginBottom: "1.5rem"
                }}>
                  <MDBView hover rounded className="z-depth-1-half mb-4">
                    <img
                      className="img-fluid"
                      src="https://miro.medium.com/max/4800/0*uGLtQTsfVnWqGDYa"
                      alt=""
                    />
                    <a href="">
                      <MDBMask overlay="white-slight" className="waves-light" />
                    </a>
                  </MDBView>
                  <div className="d-flex justify-content-between">
                    <a href="" className="pink-text">
                      <h6 className="font-weight-bold">
                        <MDBIcon icon="home" className="pr-2" />
                              Lifestyle
                            </h6>
                    </a>
                    <p className="font-weight-bold dark-grey-text">
                      <MDBIcon far icon="clock" className="pr-2" />
                            24/08/2018
                          </p>
                  </div>
                  <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                    <a href="">JSON — The Python Way</a>
                  </h3>
                  <p className="dark-grey-text">
                    JavaScript Object Notation (JSON) is a lightweight data-interchange format based on the
                    syntax of JavaScript objects. It is a text-based, human-readable, language-independent format
                    for representing structured object data for easy transmission or saving...
                        </p>
                </div>



                {/* Second Blogs Starting */}

                {this.SecondblogsList()}

                {/*Second blogs Ending */}

              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export default Blog_sections
