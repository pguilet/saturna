import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions';

class Services extends Component {
     componentDidMount() {
          this.props.fetchPage('services');
     }
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Services</h1>
                    <p>Prostituées, drogues, tout ce que vous voulez.</p>
               </div>
          );
     }
}
export default connect(null, { fetchPage })(Services);
