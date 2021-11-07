import { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>About</h1>
                    <p>Agence qui rocks sa race.</p>
               </div>
          );
     }
}
export default connect(null, null)(About);
