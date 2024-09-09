'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        mapId='491183fc40f47db3'
        style={{ height: '100%', width: '100%' }}
        defaultCenter={{ lat: 61.686029, lng: 27.273806 }}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={{ lat: 61.686029, lng: 27.273806 }} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
