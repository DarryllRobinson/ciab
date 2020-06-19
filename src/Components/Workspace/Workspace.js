import React from 'react';
import Worklist from './Worklist';
const applicationqueueitems = [
  {
    item: 'Referred',
    count: 12
  },
  {
    item: 'Pended',
    count: 3
  },
  {
    item: 'Decline Reviews',
    count: 2
  }
];

const collectionqueueitems = [
  {
    item: 'Status 1',
    count: 12
  },
  {
    item: 'Status 2',
    count: 3
  },
  {
    item: 'Status 3',
    count: 2
  }
];

const applicationcommitems = [
  {
    item: 'Your badges',
    count: 14
  },
  {
    item: 'New publishings',
    count: 6
  },
  {
    item: 'Top topics',
    count: 7
  }
];

const collectioncommitems = [
  {
    item: 'Community 1',
    count: 12
  },
  {
    item: 'Community 2',
    count: 3
  },
  {
    item: 'Community 3',
    count: 2
  }
];

const applicationnewsitems = [
  {
    item: 'CNN',
    count: 5
  },
  {
    item: 'Business Day',
    count: 11
  },
  {
    item: 'Daily Maverick',
    count: 9
  }
];

const collectionnewsitems = [
  {
    item: 'News 1',
    count: 12
  },
  {
    item: 'News 2',
    count: 3
  },
  {
    item: 'News 3',
    count: 2
  }
];

function Workspace(props) {
  const workspace = props.workspace;

  /*const item = items.map((item, idx) =>
    <Item key={idx} item={item.item} count={item.count} />
  );*/

  return (
    <>
      <p className="lead">This is a Workspace instead of {workspace}</p>
      <div className="row">


        {/* Queues  */}
        <Worklist list="Queues" items={applicationqueueitems}/>


        {/* Community  */}
        <Worklist list="Community" items={applicationcommitems}/>


        {/* News  */}
        <Worklist list="News" items={applicationnewsitems}/>

      </div>
    </>
  );
}

export default Workspace;
