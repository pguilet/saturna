import { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
     render() {
          return (
               <div className="about">
                    <div className="section-container">
                         <h1>A PROPOS</h1>
                         <div className="about-paragraph-container">
                              <p>
                                   Labore excepteur consectetur qui ipsum irure
                                   est excepteur minim proident cillum nulla
                                   tempor deserunt. Consequat ad do consequat
                                   non tempor tempor commodo deserunt incididunt
                                   aliquip eiusmod ea eu qui. Mollit irure
                                   adipisicing ullamco exercitation cillum nulla
                                   cupidatat anim. Mollit fugiat occaecat culpa
                                   et.
                              </p>
                              <p>
                                   Labore excepteur consectetur qui ipsum irure
                                   est excepteur minim proident cillum nulla
                                   tempor deserunt. Consequat ad do consequat
                                   non tempor tempor commodo deserunt incididunt
                                   aliquip eiusmod ea eu qui. Mollit irure
                                   adipisicing ullamco exercitation cillum nulla
                                   cupidatat anim. Mollit fugiat occaecat culpa
                                   et.
                              </p>
                         </div>
                    </div>
                    <div className="section-container">
                         <h1>L'EQUIPE</h1>
                         <div className="about-paragraph-container">
                              <p>
                                   Labore excepteur consectetur qui ipsum irure
                                   est excepteur minim proident cillum nulla
                                   tempor deserunt. Consequat ad do consequat
                                   non tempor tempor commodo deserunt incididunt
                                   aliquip eiusmod ea eu qui. Mollit irure
                                   adipisicing ullamco exercitation cillum nulla
                                   cupidatat anim. Mollit fugiat occaecat culpa
                                   et.
                              </p>
                              <p>
                                   Labore excepteur consectetur qui ipsum irure
                                   est excepteur minim proident cillum nulla
                                   tempor deserunt. Consequat ad do consequat
                                   non tempor tempor commodo deserunt incididunt
                                   aliquip eiusmod ea eu qui. Mollit irure
                                   adipisicing ullamco exercitation cillum nulla
                                   cupidatat anim. Mollit fugiat occaecat culpa
                                   et.
                              </p>
                         </div>
                    </div>
                    <div className="section-container">
                         <div className="coworker">
                              <img src={require('../../images/pierre.jpg')} />
                              <div className="coworker-infos">
                                   <p className="coworker-name">
                                        Pierre Guilet
                                   </p>
                                   <p className="coworker-job">
                                        Full stack développeur
                                   </p>
                                   <div className="line-separation"></div>
                                   <a
                                        href="mailto:pierre.guilet@positivecoding.fr"
                                        className="front-header-email"
                                   >
                                        pierre.guilet@positivecoding.fr
                                   </a>
                              </div>
                         </div>
                         <div className="coworker">
                              <img src={require('../../images/nabil.jpg')} />
                              <div className="coworker-infos">
                                   <p className="coworker-name">Nabil SALEM</p>
                                   <p className="coworker-job">
                                        Responsable Saturna
                                   </p>
                                   <div className="line-separation"></div>
                                   <a
                                        href="mailto:pierre.guilet@positivecoding.fr"
                                        className="front-header-email"
                                   >
                                        nabil.salem@saturna.fr
                                   </a>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
}
export default connect(null, null)(About);
