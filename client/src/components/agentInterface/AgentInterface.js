import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InterfaceHeader from './InterfaceHeader';
import { Outlet } from 'react-router-dom';
class AgentInterface extends Component {
     render() {
          return (
               <>
                    <InterfaceHeader />

                    <main id="agentInterface" className="container-fluid">
                         <Outlet />
                    </main>
               </>
          );
     }
}

export default connect(null, actions)(AgentInterface);
