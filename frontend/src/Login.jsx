import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className="login-container">
{/*       <div className="login-elements">
 */}        <h1>Welcome to Saltwars</h1>
        <a className="btn btn-block btn-social btn-github" href="https://localhost:8443/login">
          <span className="fab fa-github" />
          Sign in with Github
        </a>
{/*       </div>
 */}    </div>
  );
}
