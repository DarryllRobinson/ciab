import React from 'react';
import Item from './Item';

function Worklist(props) {
  //console.log('Worklist props: ', props);
  const workspace = props.workspace;
  const records = props.records;
  const type = props.type;
  const worklist = props.worklist.worklist;
  const items = props.worklist.items;

  const item = items.map((item, idx) =>
    <Item
      key={idx}
      records={records}
      workspace={workspace}
      type={type}
      item={item.item}
      count={item.count} />
  );

  return (

    <div className="col-lg-4">
      <div className="bs-component">
        <ul className="list-group">
          <h5 className="card-subtitle" style={{ padding: "15px" }}>{worklist}</h5>
            {item}
        </ul>
      </div>
    </div>
  );
}

export default Worklist;
