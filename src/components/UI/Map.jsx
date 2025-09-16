import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

export default function Map({ center }) {
  const [marker, setMarker] = useState([]);

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarker((prevMarker) => [...prevMarker, newMarker]);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GMAP_API_KEY,
    libraries: [],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {marker.map((mark, index) => {
          return <Marker key={index} position={mark} />;
        })}
      </GoogleMap>
    </div>
  );
}
