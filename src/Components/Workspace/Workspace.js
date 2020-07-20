import React from 'react';
import Worklist from './Worklist';
import AppButton from '../Applications/AppButton';

function Workspace(props) {
  console.log('Workspace props: ', props);
  if (props.workspaces) {
    const workspace = props.workspaces.workspace;
    const records = props.records;
    const workspaceCapitalised = workspace.charAt(0).toUpperCase() + workspace.slice(1)
    const worklists = props.workspaces.worklists;

    const worklist = worklists.map((worklist, idx) =>
      <Worklist
        key={idx}
        records={records}
        workspace={workspace}
        worklist={worklist}
        items={worklist.items} />
    );

    return (
      <>
        <p className="lead">{workspaceCapitalised}</p>
        <AppButton workspace={workspace}/>
        <div className="row">
          {worklist}
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>
  }
}


export default Workspace;
