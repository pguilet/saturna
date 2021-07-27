import React,{Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

class InterfaceHeader extends Component{
    renderContent(){
        
    }
    render(){
        return (
            <div id="header-background">
                <div className="container">
                    <h1 className="brand"> La Pierre Nantaise: Agent Interface</h1>
                    <p className="brand-description">Agence immobilière créée par un petit beurre et pour tous le monde. Béni par le dieu Pierre Guilet.</p>
            
                    <ul class="nav nav-fill">
                        <li class="nav-item">
                            <a href='/'  className={this.props.pageSelected==='landing'?"nav-link active":"nav-link" }>
                                Accueil
                                </a>
                        </li>
                    </ul>

                    {/* <nav>
                        <div className="nav-wrapper">
                            <Link 
                            className="left brand-logo" 
                            to={this.props.auth?'/surveys':'/'}
                            >
                                Emaily
                            </Link>    
                            <ul className="right">
                                {this.renderContent()}
                            
                            </ul>
                        </div>             

                    </nav> */}
                </div>
            </div>
        );
    }
}

function mapStateToProps({auth, pageSelected,history}){
    return {auth, pageSelected,history};
}
export default connect (mapStateToProps) (InterfaceHeader);