import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Viva la revolution</h1>A bas les vaccins!
               </div>
          );
     }
}
export default connect(null, null)(Landing);
