import React from 'react';
import SurveyList from './surveys/SurveyList';
import Header from "./Header";

const Dashboard = () =>{
    return (
        <Header>
            
            <SurveyList/>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" href="/surveys/new">
                    <i className="material-icons">add</i>
                </a>
            </div>
        </Header>
    );
};

export default Dashboard;