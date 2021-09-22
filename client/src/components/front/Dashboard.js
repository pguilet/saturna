import React from 'react';
import Header from './Header';

const Dashboard = () => {
     return (
          <Header>
               <div className="fixed-action-btn">
                    <a
                         className="btn-floating btn-large red"
                         href="/surveys/new"
                    >
                         <i className="material-icons">add</i>
                    </a>
               </div>
          </Header>
     );
};

export default Dashboard;
