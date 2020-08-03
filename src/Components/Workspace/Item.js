import React from 'react';
import {Link} from 'react-router-dom';

function Item(props) {
  console.log('Item props: ', props);
  if (props.workspace) {
    const workspace = props.workspace;
    const records = props.records;
    const type = props.type;
    const item = props.item;
    const count = props.count;
    return (

      <li className="list-group-item d-flex justify-content-between align-items-center">
        <Link className="nav-link"
          to={{
            pathname: `/workzone/${workspace}`,
            state: {
              recordStatus: item,
              records: records,
              type: type,
              workspace: workspace
            }
          }}
          style={{padding: 0}}
        >
          {item}
        </Link>
        <span className="badge badge-primary badge-pill">{count}</span>
      </li>
    );
  } else {
    return <div>Loading items...</div>
  }
}

export default Item;
