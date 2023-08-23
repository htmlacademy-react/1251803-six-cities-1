// import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offers } from '../../types/offer';
import { useRef } from 'react';
// import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
// import useMap from '../../hooks/useMap';

type MapProps = {
  offers: Offers;
};

// const defaultCustomIcon = new Icon({
//   iconUrl: URL_MARKER_DEFAULT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40]
// });

// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40]
// });

function Map({offers}: MapProps) {
  const mapRef = useRef(null);

  // eslint-disable-next-line
  console.log(mapRef);

  // const city = offers[0].city;
  // const map = useMap(mapRef, city);

  // eslint-disable-next-line
  // console.log(map);

  return (
    <section
      className="cities__map map"
      style={{height: '500px'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
