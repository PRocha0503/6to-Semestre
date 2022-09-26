import { Classes, Tag } from "@blueprintjs/core";
import QueryClasses from "../styles/Query.module.css";

interface QueryTagProps {
    query: Query;
    onRemoveQuery: () => void;
}

const QueryTag: React.FC<QueryTagProps> = ({ query, onRemoveQuery }) => {
    return (
        <Tag 
            large
            minimal
            interactive={false}
            intent="success"
            onRemove={onRemoveQuery}
        >
            {query.header} <span className={QueryClasses.queryTagOperator}>{query.operator}</span> {query.value}
        </Tag>
    )
}

export default QueryTag;