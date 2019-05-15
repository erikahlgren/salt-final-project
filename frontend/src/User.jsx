import React, { Component } from 'react';
import './User.css';

export default class User extends Component {
 
  createNewUser = async (token) => {
    await fetch(`https://localhost:8443/signup/${token}`);
  }

  componentDidMount = async () => {
    const { token } = this.props;
    await this.createNewUser(token);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="user-container">
        <p>
          <i className="far fa-user" />
          { user ? user.name : null }
          <i>
             &nbsp;Score:
            { user ? user.score : null }
          </i>
        </p>
      </div>
    );
  }
}
