import React, { Component } from 'react';
import { connect } from 'react-redux';

class Contact extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Contact</h1>
                    <p>3615 ULA</p>
               </div>
          );
     }
}
export default connect(null, null)(Contact);
