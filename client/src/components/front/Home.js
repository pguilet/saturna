//Rendering layer control (React router content)
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from './Header';

class Front extends Component {
     componentDidMount() {
          this.props.fetchUser();
     }

     render() {
          return (
               <>
                    <Header />
                    <div className="container">
                         <Outlet />
                    </div>
               </>
          );
     }
}

export default connect(null, actions)(Front);
