'use client'

import maplibregl from 'maplibre-gl'; 
import {useEffect} from 'react';

export default function BlogMap({id, route}) {
  const mapId = `${id}-map`;

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapId,
      style: process.env.NEXT_PUBLIC_MAPTILER_URL, // CRITICAL! CHANGE HOW STORED
      center: [-74.5, 40],                         // BEFORE SENDING TO PRODUCTION
      zoom: 4
    });  

    map.on('load', function () {
      map.addSource(`${id}-route`, {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": route
          },
        }
      });
      map.addLayer({
        "id": `${id}-route`,
        "source": `${id}-route`,
        "type": "line",
        "paint": {
          "line-color": "#0000FF",
          "line-width": 5
        }
      });
      map.addLayer({
        "id": `${id}-route-background`,
        "source": `${id}-route`,
        "type": "line",
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 9
        }
      },`${id}-route`);
    });
  });

  return (
    <>
      <div id={mapId} className="w-full h-full"></div>
    </>
  )
}