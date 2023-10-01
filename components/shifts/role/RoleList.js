import RoleCard from "./RoleCard";

function RoleList(props) {
  return (
    <div className="px-4 py-4">
      <div className="row">
        {props.data.map((val) => {
          return <RoleCard item={val} refetch={props.refetch} />;
        })}
      </div>
    </div>
  );
}
export default RoleList;
