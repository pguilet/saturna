import React,{Component} from "react";
import {connect} from "react-redux";
import { fetchPage } from '../actions';

class About extends Component{
    componentDidMount(){
        console.log(this.props);
        this.props.fetchPage("about");
    }
   render(){ 
        return (
          <div style={{ textAlign: 'center' }}>
            <h1>About</h1>
            <p>
                Agence qui rocks sa race.    
            </p>    
          </div>
        );
   }
};
export default connect (null,{fetchPage}) (About);