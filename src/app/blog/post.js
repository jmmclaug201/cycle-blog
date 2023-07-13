import BlogMap from './blogmap'

export default function BlogPost({id}) {

  return (
    <div className="w-full h-1/2 bg-white shadow-md rounded-lg p-4">
      <BlogMap id={id} route={{coordinates: [[1,2],[3,4]]}}/>
    </div>
  )
}