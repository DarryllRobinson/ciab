import React, { Component } from 'react';
import Worklist from './Worklist';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workspace: '',
      worklist: '',
      list: '',
      items: null
    }

  }

  async componentDidMount() {

    const workspaces = this.props.workspaces;
    Object.keys(workspaces).forEach(key =>  {
      // Getting the workspace value
      if (typeof workspaces[key] === 'string') {
        let workspace = workspaces[key];
        this.setState({ workspace: workspace });
      } else {
        let worklists = workspaces[key];

        // Getting the through worklist object to find the list
        Object.keys(worklists).forEach(key => {
          let worklist = worklists[key];
          this.setState({ worklist: worklist });

          Object.keys(worklist).forEach(key => {
            //console.log('worklist[key]: ', worklist[key]);
            // Getting the list value
            if (typeof worklist[key] === 'string') {
              let list = worklist[key];
              this.setState({ list: list });
            } else {
              let items = worklist[key];

              // Getting through the items to find the item and count
              Object.keys(items).forEach(key => {
                let itemsArr = [];
                itemsArr.push(items[key]);
                console.log('Workspace itemsArr: ', itemsArr);
                this.setState({ items: itemsArr });
                /*let item = [];
                let count = [];
                item.push()
                this.setState({ item: item });
                this.setState({ count: count });*/
              });
            }


          });
        });
      }
    });
  }

  render() {
    if (this.state.items) {
      return (
        <>
          <p className="lead">This is a Workspace instead of {this.state.workspace}</p>
          <div className="row">


            {/* Queues
            <Worklist list={this.state.list} items={this.state.items} />*/}

          </div>
        </>
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }
}

export default Workspace;
