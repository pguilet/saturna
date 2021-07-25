import React from 'react';
import SurveyList from './surveys/SurveyList';

const Dashboard = () =>{
    return (
        <div>
            <SurveyList/>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" href="/surveys/new">
                    <i className="material-icons">add</i>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;