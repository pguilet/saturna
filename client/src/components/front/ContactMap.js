import React, { Component } from 'react';
import {
     GoogleMap,
     LoadScript,
     MarkerClusterer,
     Marker,
     InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
     width: '100%',
     height: '400px',
};

const center = {
     lat: 47.21663108683835,
     lng: -1.566638086231894,
};
const locations = [{ lat: 47.21663108683835, lng: -1.566638086231894 }];
const contentString =
     '<div id="content">' +
     '<div id="siteNotice">' +
     '</div>' +
     '<h1 id="firstHeading" class="firstHeading">Saturna</h1>' +
     '<div id="bodyContent">' +
     "<p><b>21 boulevard Gabriel Guist'Hau 44100 Nantes</b></p>" +
     '</div>' +
     '</div>';

function createKey(location) {
     return location.lat + location.lng;
}

const optionsInfoBox = { closeBoxURL: '', enableEventPropagation: true };
const options = {
     imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

const divStyle = {
     background: `white`,
     border: `1px solid #ccc`,
     padding: 15,
};

const position = { lat: 47.21663108683835, lng: -1.566638086231894 };
class ContactMap extends Component {
     state = { infoWindowOpen: false };
     constructor(props) {
          super(props);
          this.onClick = this.onClick.bind(this);
     }
     onClick(event) {
          this.setState({ infoWindowOpen: !this.state.infoWindowOpen });
     }
     render() {
          console.log(process.env.REACT_APP_GOOGLE_MAP_KEY);
          return (
               <LoadScript
                    googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
               >
                    <GoogleMap
                         mapContainerStyle={containerStyle}
                         center={center}
                         zoom={15}
                    >
                         <>
                              <MarkerClusterer>
                                   {(clusterer) =>
                                        locations.map((location) => (
                                             <Marker
                                                  key={createKey(location)}
                                                  position={location}
                                                  clusterer={clusterer}
                                                  label={'S'}
                                                  onClick={this.onClick}
                                             />
                                        ))
                                   }
                              </MarkerClusterer>
                              {this.state.infoWindowOpen && (
                                   <InfoWindow
                                        position={position}
                                        onCloseClick={this.onClick}
                                   >
                                        <div style={divStyle}>
                                             <h1>Saturna</h1>
                                             <p>
                                                  21 boulevard Gabriel Guist'Hau
                                                  44100 Nantes
                                             </p>
                                        </div>
                                   </InfoWindow>
                              )}
                         </>
                    </GoogleMap>
               </LoadScript>
          );
     }
}
export default React.memo(ContactMap);
