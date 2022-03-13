import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
     render() {
          return (
               <>
                    <div style={{ textAlign: 'center' }}>
                         <h1>Accueil</h1>
                    </div>
                    <p>
                         Cupidatat officia excepteur consequat in voluptate sunt
                         sit velit irure sint sunt irure. Ex aute labore
                         consectetur labore aute pariatur magna voluptate
                         ullamco ex ea qui. Mollit aliquip veniam cillum magna
                         nisi aute in. Pariatur in fugiat aliquip magna eiusmod
                         nulla aute ipsum aliquip minim.
                    </p>
               </>
          );
     }
}
export default connect(null, null)(Landing);
