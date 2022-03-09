import React, { Component } from 'react';
import { connect } from 'react-redux';

class Contact extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Contact</h1>
                    <p>
                         Lorem enim commodo ad id eu et in ad. Reprehenderit qui
                         occaecat labore nulla do dolor est minim est. Non anim
                         duis nostrud nulla veniam ut laboris qui do pariatur.
                         Labore sit laboris nostrud proident id esse voluptate
                         proident dolor laboris aliquip sunt.
                    </p>
               </div>
          );
     }
}
export default connect(null, null)(Contact);
