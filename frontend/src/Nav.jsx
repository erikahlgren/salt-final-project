import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Editor from './Editor';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get('id'),
      loggedIn: false,
    };
  }

  componentDidMount = async () => {
    const { token } = this.state;
    const p = await fetch(`https://api.github.com/?access_token=${token}`);
    const statusCode = p.status;
    if (statusCode === 200) {
      this.setState({
        loggedIn: true,
      });
    } else {
      this.setState({
        loggedIn: false,
      });
    }
  }

  render() {
    const { loggedIn, token } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              loggedIn ? (
                <Editor token={token} />
              ) : (
                <Login />
              )
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Nav;
