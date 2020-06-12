import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.mysqlLayer = new MysqlLayer();
    this.publishBlog = this.publishBlog.bind(this);
  }

  async publishBlog(blog) {
    const published = await this.mysqlLayer.Post('/blogs', blog);

    console.log('published: ', published);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="display-3">Blog title</h1>
        </div>
      </div>
    )
  }
}

export default Blog;
