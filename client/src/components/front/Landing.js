import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../../actions';
import Header from './Header';

class Landing extends Component {
     componentDidMount() {
          this.props.fetchPage('landing');
     }
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>Viva la revolution</h1>A bas les vaccins!
               </div>
          );
     }
}
export default connect(null, { fetchPage })(Landing);
