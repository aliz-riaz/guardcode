import SiteCard from "./SiteCard";

function SiteList(props) {
  return (
    <div className="px-4 py-4">
      <div className="row">
        {props.data.map((val) => {
          return <SiteCard item={val} refetch={props.refetch} />;
        })}
      </div>
    </div>
  );
}
export default SiteList;
