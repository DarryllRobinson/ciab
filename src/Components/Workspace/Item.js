import React from 'react';
import {Link} from 'react-router-dom';

function Item(props) {
  const workspace = props.workspace;
  const item = props.item;
  const count = props.count;
  return (

    <li className="list-group-item d-flex justify-content-between align-items-center">
      <Link className="nav-link" to={{
        pathname: `/workspace/${workspace}`,
        currentStatus: item,
        workspace: workspace
      }}
      style={{padding: 0}}
      >
        {item}
      </Link>
      <span className="badge badge-primary badge-pill">{count}</span>
    </li>
  );
}

export default Item;
