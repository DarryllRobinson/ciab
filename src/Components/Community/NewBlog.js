import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';

class NewBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      username: '',
      title: '',
      datePublished: '',
      body: '',
      tags: ''
    }

    this.mysqlLayer = new MysqlLayer();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ [e.target.name]: value });
  }

  async submit() {
    this.setState({ disabled: true });

    let blog = {
      username: "Darryll", // must add actual username
      title: this.state.title,
      datePublished: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      body: this.state.body,
      tags: this.state.tags
    }

    await this.mysqlLayer.Post('/community/blogs', blog);
    this.props.history.push('/community/blogs');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Your new blog</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="title"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Give your blog a title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Blog contents</label>
                  <textarea
                    disabled={this.state.disabled}
                    type="text"
                    name="body"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Share your wisdom"
                    rows="10"
                  >
                  </textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tags</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="tags"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Leave a space between each tag"
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewBlog);
