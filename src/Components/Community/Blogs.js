import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const blogs = await this.mysqlLayer.Get('/community/blogs');
    this.setState({ blogs: blogs })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/community/new-blog">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Feel like adding to our library?</div>
              <div className="card-body">
                <h4 className="card-title">+ New Blog</h4>
                <p className="card-text">Get those creative juices following!</p>
              </div>
            </div>
          </Link>

          {this.state.blogs === null && <p>Loading blogs...</p>}
          {
            this.state.blogs && this.state.blogs.map(blog => (
              <div key={blog.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/community/blogs/${blog.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Likes: {blog.likes}</div>
                    <div className="card-body">
                      <h4 className="card-title">{blog.title}</h4>
                      <p className="card-text">Tags: {blog.tags}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Blogs;
