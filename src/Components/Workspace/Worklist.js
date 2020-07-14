import React from 'react';
import Item from './Item';

function Worklist(props) {
  const workspace = props.workspace;
  const records = props.records;
  const worklist = props.worklist.worklist;
  const items = props.worklist.items;

  const item = items.map((item, idx) =>
    <Item
      key={idx}
      records={records}
      workspace={workspace}
      item={item.item}
      count={item.count} />
  );

  return (

    <div className="col-lg-4">
      <div className="bs-component">
        <ul className="list-group">
          <p className="lead">{worklist}</p>
            {item}
        </ul>
      </div>
    </div>
  );
}

export default Worklist;
