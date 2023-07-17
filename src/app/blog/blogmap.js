'use client'

import maplibregl from 'maplibre-gl'; 
import {useEffect} from 'react';

function getbbox(coordinates) { // Can replace with a turfjs call
  const lons = coordinates.map(v => v[0]);
  const lats = coordinates.map(v => v[1]);
  let [w, e] = [Math.min(...lons), Math.max(...lons)];
  let [s, n] = [Math.min(...lats), Math.max(...lats)];
  return [w,s,e,n];
}

export default function BlogMap({id, route}) {
  const mapId = `${id}-map`;
  
  const bbox = getbbox(route.coordinates);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapId,
      style: process.env.NEXT_PUBLIC_MAPTILER_URL, // CRITICAL! CHANGE HOW STORED
      bounds: bbox,                                // BEFORE SENDING TO PRODUCTION
    });  

    map.on('load', function () {
      console.log("JFIFJI")
      map.addSource(`${id}-route`, {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": route,
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

    map.fitBounds(bbox, {padding: {top: 25, bottom: 25, left: 25, right: 25}});
  });

  return (
    <>
      <div id={mapId} className="w-full h-full"></div>
    </>
  )
}