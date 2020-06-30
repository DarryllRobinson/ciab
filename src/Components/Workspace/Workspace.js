import React from 'react';
import Worklist from './Worklist';

function Workspace(props) {
  console.log('Workspace props: ', props);
  const workspace = props.workspaces.workspace;
  const worklists = props.workspaces.worklists;

  const worklist = worklists.map((worklist, idx) =>
    <Worklist key={idx} workspace={workspace} worklist={worklist} items={worklist.items} />
  );

  return (
    <>
      <p className="lead">{workspace}</p>
      <div className="row">
        {worklist}
      </div>
    </>
  );
}

export default Workspace;
