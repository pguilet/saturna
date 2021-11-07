import React, { Component } from 'react';
import { connect } from 'react-redux';

class Services extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Services</h1>
                    <p>Prostituées, drogues, tout ce que vous voulez.</p>
               </div>
          );
     }
}
export default connect(null, null)(Services);
