export default function SplitRowContainer(props) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {props.children}
    </div>
  );
}
