import React from 'react';

function Welcome(props) {
  return (

    <div className="row">
      <div className="lead">
        <h1 className="display-5">Welcome to your workspace</h1>
        <p className="lead">{`It will provide you with an overview of what's happening and is where you will start your day`}</p>
        <hr className="my-4" />
      </div>
    </div>
  );
}

export default Welcome;
