import Image from 'next/image'

import BlogPost from './post.js'

export default function BlogPage() {
  return (
    <div className="flex">
      <div className="basis-1/4 px-8">
        {/*<Image
          src="/"
          height={144}
          width={144}
          alt="Profile Photo"
        />*/}
        <h2 className="text-3xl font-bold mb-12">
          Joe McLaughlin
        </h2>
        <h3 className="text-2xl font-bold">
          Tours
        </h3>
      </div>
      <div className="basis-3/4 bg-dirt h-screen px-16">
        <h1>Pittsburgh</h1>
        <BlogPost id="blog"/>
      </div>
    </div>
  )
}