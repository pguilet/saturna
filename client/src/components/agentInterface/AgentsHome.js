//Rendering layer control (React router content)
import '../../css/index.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AgentsHome extends Component {
     componentDidMount() {
          this.props.fetchPage('dashboard');
     }
     renderContent() {
          return <div>Authenticated</div>;
     }

     render() {
          return <BrowserRouter>{this.renderContent()}</BrowserRouter>;
     }
}

export default connect(null, actions)(AgentsHome);
