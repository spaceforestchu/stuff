import React, { Component } from 'react'
import './CreatePost.css';
import { connect } from 'react-redux';

import { handlePostApiSubmit } from '../API/postAPI'

import { handleJWTExpirationApiAndLogin } from '../../redux/action/authUserAction';

class CreatePost extends Component {


  state = {
    post: '',
    zipCode: '',
    image: '',
    error: null,
    errorMessage: ''
  }

  componentDidMount() {
    
    this.props.handleJWTExpirationApiAndLogin(this.props.history)
  }


  uploadWidget = (event) => {
    event.preventDefault();
    window.cloudinary.openUploadWidget({ cloud_name: 'dy6xduf53', upload_preset: 'gxaofwpa', tags:['hoodnews']},
    (error, result)  => {
        if (error) {
          this.setState({
            error: true,
            errorMessage: error
          })
        } else {
          if (result.event === 'success') {
            console.log(result.info.secure_url)
            this.setState({
              image: result.info.secure_url,
              error: null,
              errorMessage: ''
            })
          }
        }
    });
  }

  handlePostInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitPost = (event) => {
    event.preventDefault();

    let dataObj = {
      post: this.state.post,
      zipCode: this.state.zipCode,
      image: this.state.image,
    }

    handlePostApiSubmit(dataObj)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      });

    this.form.reset();  
  }



  render() {
    return (
      <form onSubmit={this.handleSubmitPost} className="form-signin text-center create-post-style" ref={(node) => this.form = node}>
        <h1 className="h3 mb-3 font-weight-normal">Create Post</h1>
        { this.state.error ? <div>{this.state.errorMessage}</div> : ''}
        <textarea className="form-control" name="post" onChange={this.handlePostInput}></textarea>
        <br />
        <input 
          onChange={this.handlePostInput}
          type="text" 
          className="form-control" 
          placeholder="Enter Zip Code" 
          name="zipCode"
          />

          <br />

          <button onClick={this.uploadWidget} className="upload-button btn btn-success float-left">
              Add Image
          </button>

          <br className="clearfix"/>
          <br className="clearfix"/>

         <button className="btn btn-primary float-left">
            Submit
         </button>

  </form>
    )
  }
}

export default connect(null, { handleJWTExpirationApiAndLogin })(CreatePost);
