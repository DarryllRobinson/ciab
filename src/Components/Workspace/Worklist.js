import React from 'react';
import Item from './Item';

function Worklist(props) {
  const worklist = props.worklist.worklist;
  const items = props.worklist.items;

  const item = items.map((item, idx) =>
    <Item key={idx} item={item.item} count={item.count} />
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
