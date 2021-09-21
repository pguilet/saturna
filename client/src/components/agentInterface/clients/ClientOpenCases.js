//Rendering layer control (React router content)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';
import ClientCases from './ClientCases';

class ClientOpenCases extends Component {
     componentDidMount() {
          if (!this.props.propertyCases) {
               this.props.fetchOpenCases(this.props.client._id);
          }
     }

     render() {
          return (
               <ClientCases
                    addAction={this.props.createPropertyCase}
                    deleteAction={this.props.deleteOpenedPropertyCaseFromList}
                    isClosedCase={false}
               />
          );
     }
}

function mapStateToProps(props) {
     return props;
}
export default connect(mapStateToProps, actions)(withRouter(ClientOpenCases));
