`use client`

export default function PostSection({text, onHover, onLeave}) {
  return (
    <div onMouseOver={() => {console.log("Hovered"); onHover()}} onMouseOut={onLeave}>
      {text}
    </div>
  );
}