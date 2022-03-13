//Rendering layer control (React router content)
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from './Header';
import Footer from './Footer';

class Home extends Component {
     componentDidMount() {
          this.props.fetchUser();
     }

     render() {
          const headerClassName = 'header-container';
          const footerClassName = 'footer-container';
          return (
               <>
                    <div className="super-home-container">
                         <div className="home-container">
                              <div className="header-main-container">
                                   <Header className={headerClassName} />
                                   <div className="main">
                                        <Outlet />
                                   </div>
                              </div>
                         </div>
                         <Footer className={footerClassName} />
                    </div>
               </>
          );
     }
}

export default connect(null, actions)(Home);
