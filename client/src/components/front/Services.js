import React, { Component } from 'react';
import { connect } from 'react-redux';

class Services extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Services</h1>
                    <p>
                         Duis esse minim esse enim quis mollit sunt voluptate
                         est ullamco qui non. Adipisicing et voluptate est ex
                         adipisicing Lorem proident ad in irure mollit proident
                         aute do. Ipsum deserunt est est consequat non ipsum
                         proident Lorem sint. Amet velit proident Lorem amet
                         voluptate nostrud dolor magna. Mollit non minim
                         adipisicing occaecat cillum. Irure ea mollit quis
                         officia amet.
                    </p>
               </div>
          );
     }
}
export default connect(null, null)(Services);
