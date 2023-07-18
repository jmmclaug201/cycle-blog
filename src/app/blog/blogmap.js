'use client'

import maplibregl from 'maplibre-gl'; 
import {useEffect, useRef} from 'react';

function getbbox(coordinates) { // Can replace with a turfjs call
  const lons = coordinates.map(v => v[0]);
  const lats = coordinates.map(v => v[1]);
  let [w, e] = [Math.min(...lons), Math.max(...lons)];
  let [s, n] = [Math.min(...lats), Math.max(...lats)];
  return [w,s,e,n];
}

export default function BlogMap({id, route, highlight}) {
  const mapId = `${id}-map`;
  
  const bbox = getbbox(route.coordinates);

  const map = useRef(undefined);
  useEffect(() => {
    if (map.current === undefined) {
      const m = new maplibregl.Map({
        container: mapId,
        style: process.env.NEXT_PUBLIC_MAPTILER_URL, // CRITICAL! CHANGE HOW STORED
        bounds: bbox,                                // BEFORE SENDING TO PRODUCTION
      });  

      m.on('load', function () {
        m.addSource(`${id}-route`, {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "geometry": route,
          }
        });
        m.addLayer({
          "id": `${id}-route`,
          "source": `${id}-route`,
          "type": "line",
          "paint": {
            "line-color": "#0000FF",
            "line-width": 5
          }
        });
        m.addLayer({
          "id": `${id}-route-background`,
          "source": `${id}-route`,
          "type": "line",
          "paint": {
            "line-color": "#FFFFFF",
            "line-width": 9
          }
        },`${id}-route`);
      });

      m.fitBounds(bbox, {padding: {top: 25, bottom: 25, left: 25, right: 25}});
      map.current = m;
    }
    if (map.current.getLayer(`${id}-route-highlight`)) {
      map.current.removeLayer(`${id}-route-highlight`);
    }
    if (map.current.getSource(`${id}-route-highlight`)) {
      map.current.removeSource(`${id}-route-highlight`);
    }
    if (highlight !== undefined) {
      map.current.addSource(`${id}-route-highlight`, {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "geometry": highlight.geometry,
        }
      });
      map.current.addLayer({
        "id": `${id}-route-highlight`,
        "source": `${id}-route-highlight`,
        "type": "line",
        "paint": {
          "line-color": "#FF0000",
          "line-width": 5
        }
      });
    }
  });

  return (
    <>
      <div id={mapId} className="w-full h-full"></div>
    </>
  )
}