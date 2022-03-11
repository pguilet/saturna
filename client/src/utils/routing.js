import { useNavigate, useLocation, useParams } from 'react-router-dom';
import React from 'react';
export function withRouter(Child) {
     return (props) => {
          const location = useLocation();
          const navigate = useNavigate();
          const params = useParams();
          return (
               <Child
                    {...props}
                    params={params}
                    history={navigate}
                    location={location}
               />
          );
     };
}
