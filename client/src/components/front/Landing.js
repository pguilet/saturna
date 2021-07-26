import React,{Component} from "react";
import {connect} from "react-redux";
import { fetchPage } from '../../actions';

class Landing extends Component{
    componentDidMount(){
        console.log(this.props);
        this.props.fetchPage("landing");
    }
   render(){ 
        return (
          <div style={{ textAlign: 'center' }}>
            <h1>Viva la revolution</h1>
              A bas les vaccins!
          </div>
        );
   }
};
export default (connect (null,{fetchPage})) (Landing);