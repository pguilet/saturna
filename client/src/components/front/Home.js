//Rendering layer control (React router content)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import SurveyNew from './surveys/SurveyNew';

class Front extends Component {
     componentDidMount() {
          this.props.fetchUser();
     }

     render() {
          return (
               <BrowserRouter>
                    <Header />
                    <div className="container">
                         <Route exact path="/" component={Landing} />
                         <Route exact path="/about" component={About} />
                         <Route exact path="/contact" component={Contact} />
                         <Route exact path="/services" component={Services} />
                    </div>
               </BrowserRouter>
          );
     }
}

export default connect(null, actions)(Front);
