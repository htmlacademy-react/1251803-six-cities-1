import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offers, Offer } from '../../types/offer';
import { useRef, useEffect } from 'react';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from '../../hooks/useMap';

type MapProps = {
  currentOffer?: Offer;
  offers: Offers;
  selectedPoint?: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

function Map({offers, selectedPoint, currentOffer}: MapProps) {
  const mapRef = useRef(null);

  const city = offers[0].city;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const placeLayer = layerGroup().addTo(map);
      const currentCity = city;
      map.setView([currentCity.location.latitude, currentCity.location.longitude], currentCity.location.zoom);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && offer.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon)
          .addTo(placeLayer);
      });

      if (currentOffer) {
        const currentMarker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude
        });

        currentMarker.setIcon(currentCustomIcon).addTo(placeLayer);
      }

      return () => {
        map.removeLayer(placeLayer);
      };
    }
  }, [map, offers, selectedPoint, city]);

  return (
    <section
      className="cities__map map"
      style={{height: '100%'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
