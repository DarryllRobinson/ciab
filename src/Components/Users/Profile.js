import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import Security from '../../Utilities/Security';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };

    this.security = new Security();
    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const profile = await this.mysqlLayer.Get(`/users/${params.id}`);

    this.setState({
      profile,
    });
  }

  render() {
    const {profile} = this.state;
    
    if (profile === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{profile[0].firstName} {profile[0].surname}</h1>
            <p className="lead">{profile[0].email}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
