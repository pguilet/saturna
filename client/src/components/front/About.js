import { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
     render() {
          return (
               <div style={{ textAlign: 'center' }}>
                    <h1>About</h1>
                    <p>
                         Labore excepteur consectetur qui ipsum irure est
                         excepteur minim proident cillum nulla tempor deserunt.
                         Consequat ad do consequat non tempor tempor commodo
                         deserunt incididunt aliquip eiusmod ea eu qui. Mollit
                         irure adipisicing ullamco exercitation cillum nulla
                         cupidatat anim. Mollit fugiat occaecat culpa et.
                    </p>
               </div>
          );
     }
}
export default connect(null, null)(About);
