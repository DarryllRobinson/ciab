import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import SubmitComment from './SubmitComment';
import moment from 'moment';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blog: null,
      comments: null
    }

    this.mysqlLayer = new MysqlLayer();
    this.submitComment = this.submitComment.bind(this);
  }

  async componentDidMount() {
    await this.refreshBlog();
  }

  async refreshBlog() {
    const { match: { params } } = this.props;
    const blog = await this.mysqlLayer.Get(`/blogs/${params.blogId}`);
    const comments = await this.mysqlLayer.Get(`/comments/${params.blogId}`);
    this.setState({
      blog: blog,
      comments: comments
    });
  }

  async submitComment(comment) {
    let newComment = {
      username: "Darryll", // must add actual username
      dateComment: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      comment: comment,
      f_blogId: this.state.blog[0].id
    }

    await this.mysqlLayer.Post(`/comments`, newComment); /*{
      comment,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });*/
    await this.refreshBlog();
  }

  render() {
    const {blog} = this.state;
    const {comments} = this.state;
    if (blog === null) return <p>Loading...</p>;
    
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{blog[0].title}</h1>
            <p className="lead">{blog[0].body}</p>
            <hr className="my-4" />
            <SubmitComment blogId={blog[0].id} submitComment={this.submitComment} />
            <p>Comments</p>
            {
              comments.map((comment, idx) => (
                <p className="lead" key={idx}>
                  {comment.comment}
                  - <i>
                    {comment.username}
                  - ({moment(comment.dateComment).format('YYYY-MM-DD HH:mm:ss')})
                  </i>
                </p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Blog;
