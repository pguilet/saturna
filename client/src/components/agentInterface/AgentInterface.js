//Rendering layer control (React router content)
import '../../css/index.css';
import 'materialize-css/dist/css/materialize.min.css';//we have to precise extension when not importing js files
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

import Header from "../front/Header";


class AgentInterface extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    
   render(){
     return (
       <BrowserRouter>
           <Header />
        {/* <div className="container">
           <Route exact path="/" component={Landing} />
           <Route exact path="/surveys" component={Dashboard} />
           <Route path="/surveys/new" component={SurveyNew} />
           <Route exact path="/about" component={About} />
           <Route exact path="/contact" component={Contact} />
           <Route exact path="/services" component={Services} />
         </div> */}
       </BrowserRouter>
     );
   }
};

export default connect(null,actions)(AgentInterface);