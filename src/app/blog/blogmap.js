'use client'

import bbox from "@turf/bbox"

import maplibregl from 'maplibre-gl'; 
import {useEffect, useRef} from 'react';

export default function BlogMap({id, route, lineSlices, highlight}) {
  const mapId = `${id}-map`;
  
  const routeBbox = bbox(route);

  const map = useRef(undefined);
  useEffect(() => {
    console.log(highlight)
    // If we haven't already defined the map define and load it
    if (map.current === undefined) {
      const m = new maplibregl.Map({
        container: mapId,
        style: process.env.NEXT_PUBLIC_MAPTILER_URL, // CRITICAL! CHANGE HOW STORED
        bounds: routeBbox,                           // BEFORE SENDING TO PRODUCTION
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
          },
        });
        m.addLayer({
          "id": `${id}-route-background`,
          "source": `${id}-route`,
          "type": "line",
          "paint": {
            "line-color": "#FFFFFF",
            "line-width": 9
          },
        },`${id}-route`);
        for (let i = 0; i < lineSlices.length; i++) {
          const slice = lineSlices[i];
          if (slice !== undefined) {
            console.log(slice)
            // Create Source for Slice
            m.addSource(`${id}-slice-${i}`, {
              "type": "geojson",
              "data": slice
            });
            // Create Invisible Layer for Slice
            m.addLayer({
              "id": `${id}-slice-${i}`,
              "source": `${id}-slice-${i}`,
              "type": "line",
              "paint": {
                "line-color": "#FF0000",
                "line-width": 5
              },
              "layout": {
                "visibility": "none",
              }
            });
            console.log(`Created ${id}-slice-${i}`)
          }
        }
      });

      m.fitBounds(routeBbox, {padding: {top: 25, bottom: 25, left: 25, right: 25}});
      map.current = m;
    }
    // Remove Highlight from Previous Render
    for (const index in lineSlices) {
      if (map.current.getLayer(`${id}-slice-${index}`)) {
        map.current.setLayoutProperty(`${id}-slice-${index}`, 'visibility', 'none');
      }
    } 
    // Add Highlight for This Render, if Applicable
    if (highlight !== undefined && lineSlices[highlight] !== undefined) {
      map.current.setLayoutProperty(`${id}-slice-${highlight}`, 'visibility', 'visible');
    }
  });

  return (
    <>
      <div id={mapId} className="w-full h-full"></div>
    </>
  )
}