import React, { Component } from 'react'
import { ZipCode, ShowPost } from '../containers';

import './Layout.css'


class Layout extends Component {

 
  render() {
    return (
        <div className="row">
          <div className="col-sm-4">
            <div className="zipColumn">
              <ZipCode handleSelectZipCode={this.handleSelectZipCode}/>
            </div>
          </div>
          <div className="col-sm-8">  
            <ShowPost {...this.state }/>
          </div>
        </div>
    )
  }
}

export default Layout;