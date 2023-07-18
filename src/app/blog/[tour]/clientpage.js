'use client'

import {useState} from "react";

import BlogMap from "../blogmap.js"
import PostSection from "./postsection.js"

// Montour Trail: localhost:3000/blog/64adc13893fc813b852392b5
export default function ClientPage({tour, lineSlices}) {
  const [focus, setFocus] = useState(undefined);

  return (
    <div className="flex">
      <div className="basis-3/5 h-screen">
        <BlogMap id={"tourMap"} route={tour.route} highlight={focus}/>
      </div>
      <div className="basis-2/5 bg-red-100">
        <h2>
          {tour.title}
        </h2>
        <div>
          {tour.post.map((section, index) => (
            <PostSection 
              key={index} 
              text={section.text}
              onHover = {() => setFocus(lineSlices[index])}
              onLeave = {() => setFocus(undefined)}/>
          ))}
        </div>
      </div>
    </div>
  );
}