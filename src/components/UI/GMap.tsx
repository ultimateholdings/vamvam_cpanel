import {APIProvider, Map} from "@vis.gl/react-google-maps";
const API_KEY="AIzaSyDWa2O7ZtHX-7R3FGwn_KEAcHe_vW97gBI";
function GoogleMap() {
    return (
        <APIProvider apiKey={API_KEY}>
           <Map

             defaultCenter={{lat: 4.055561,lng: 9.7067124}}
             defaultZoom={15}
           />
        </APIProvider>
    );
}

export default GoogleMap;
