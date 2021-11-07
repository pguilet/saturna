import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';
import { getStats } from '../../utils/stats';

class AgentsHome extends Component {
     state = { statsInfos: null };
     componentDidMount() {
          getStats().then((stats) => this.setState({ statsInfos: stats }));
     }
     renderContent() {
          if (this.state.statsInfos) {
               let entries = Object.entries(this.state.statsInfos);
               return _.map(entries, ([username, values]) => {
                    return (
                         <React.Fragment key={username}>
                              <tr>
                                   <td>{username}</td>
                                   <td>
                                        {values.contactNumber
                                             ? values.contactNumber
                                             : 0}
                                   </td>
                                   <td>
                                        {values.estimationNumber
                                             ? values.estimationNumber
                                             : 0}
                                   </td>
                                   <td>
                                        {values.simpleMandateNumber
                                             ? values.simpleMandateNumber
                                             : 0}
                                   </td>
                                   <td>
                                        {values.exclusiveMandateNumber
                                             ? values.exclusiveMandateNumber
                                             : 0}
                                   </td>
                                   <td>
                                        {values.sellingNumber
                                             ? values.sellingNumber
                                             : 0}
                                   </td>
                              </tr>
                         </React.Fragment>
                    );
               });
          }
          return null;
     }

     render() {
          return (
               <>
                    <div className="container">
                         <h4>Statistiques</h4>
                         <Table striped bordered hover>
                              <thead>
                                   <tr>
                                        <th>Agent</th>
                                        <th>Nombre de contacts</th>
                                        <th>Nombre d'estimations</th>
                                        <th>Nombre de mandats simples</th>
                                        <th>Nombre de mandats exclusifs</th>
                                        <th>Nombre de ventes</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {this.state.statsInfos &&
                                        this.renderContent()}
                              </tbody>
                         </Table>
                    </div>
               </>
          );
     }
}

export default connect(null, actions)(AgentsHome);
