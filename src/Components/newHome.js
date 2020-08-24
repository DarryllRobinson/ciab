import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import { Container, Image } from 'react-bootstrap';
import banner from '../Assets/Images/Debt-Recovery.jpg';

class newHome extends Component {
  constructor(props) {
    super(props);

    this.mysqlLayer = new MysqlLayer();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  async handleLogoutClick() {
    //console.log('Home props: ', this.props);
    let cwsUser = '';
    cwsUser = sessionStorage.getItem('cwsUser');
    await this.mysqlLayer.Delete(`/admin/sessions/${cwsUser}`, { withCredentials: true })
    .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    const background = {backgroundSize : 'cover'};
    const textStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%'
    };
    return (

        <Container>

            <Image src={banner} fluid style={background} />
            <h1 style={textStyle}>The System</h1>
            <p>
              Let us take care of your debt collection process for you. We know how important your customers are to you, even
              the ones who are struggling to pay right now.
            </p>

        </Container>

    )
  }
}

export default newHome;
