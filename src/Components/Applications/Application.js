import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import SubmitComment from './SubmitComment';
import moment from 'moment';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: null,
      comments: null
    }

    this.mysqlLayer = new MysqlLayer();
    this.submitComment = this.submitComment.bind(this);
  }

  async componentDidMount() {
    await this.refreshApplication();
  }

  async refreshApplication() {
    const { match: { params } } = this.props;
    const application = await this.mysqlLayer.Get(`/workspace/applications/${params.applicationId}`);
    const comments = await this.mysqlLayer.Get(`/workspace/comments/${params.applicationId}`);
    this.setState({
      application: application,
      comments: comments
    });
  }

  async submitComment(comment) {
    let newComment = {
      username: "Darryll", // must add actual username
      dateComment: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      comment: comment,
      f_applicationId: this.state.application[0].id
    }

    await this.mysqlLayer.Post(`/workspace/comments`, newComment); /*{
      comment,
    }, {
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
    });*/
    await this.refreshApplication();
  }

  render() {
    const {application} = this.state;
    const {comments} = this.state;
    if (application === null) return <p>Loading...</p>;

    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{application[0].title}</h1>
            <p className="lead">{application[0].body}</p>
            <hr className="my-4" />
            <SubmitComment applicationId={application[0].id} submitComment={this.submitComment} />
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

export default Application;
