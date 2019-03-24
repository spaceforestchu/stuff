import React, { Component } from 'react'
import { connect } from 'react-redux';

import ShowPostView from './ShowPostView/ShowPostView';
import { handleQueryByZipCodeAPI } from '../../redux/action/zipCodeAction';

class ShowPost extends Component {

  componentDidMount() {
    this.props.handleQueryByZipCodeAPI('11214')
  }


  render() {


    let posts = this.props.zipCodes.posts.map((post, index) => {
      return (
       <ShowPostView 
        key={post._id}
        image={post.image}
        id={post._id}
        post={post.post}
        timestamp={post.timestamp}
       />
      )
    })

    return (
      <div>
        {posts}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    zipCodes: state.zipCode
  }
}

export default connect(mapStateToProps, { handleQueryByZipCodeAPI })(ShowPost);
