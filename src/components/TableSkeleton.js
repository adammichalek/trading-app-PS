import "../styles/TableSkeleton.css";
import SkeletonRow from "./SkeletonRow";

const TableSkeleton = (props) => {
  const renderedRows = [...Array(props.rows)].map((e, i) => (
    <SkeletonRow key={i} />
  ));
  return <>{renderedRows}</>;
};

export default TableSkeleton;
