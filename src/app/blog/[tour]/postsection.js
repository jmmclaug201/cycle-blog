`use client`

export default function PostSection({text, onHover, onLeave}) {
  return (
    <>
        <div className="hover:bg-slate-200" 
          onMouseOver={() => onHover()}
          onMouseOut={onLeave}
          dangerouslySetInnerHTML = {{__html: text}}>
      </div>
      <br></br>
    </>
  );
}