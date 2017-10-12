import React from 'react';
import login from '../../api/login';
import { renderIf } from '../../utils/helpers';

import './style';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      personalAccessToken: '',
      isLoggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePersonalAccessTokenChange = this.handlePersonalAccessTokenChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    login(this.state.username, this.state.personalAccessToken).then(succeeded => {
      this.setState(Object.assign({}, this.state, {
        isLoggedIn: succeeded
      }));
    });
  }

  handleUsernameChange(event) {
    this.setState(Object.assign({}, this.state, {
      username: event.target.value
    }));
  }

  handlePersonalAccessTokenChange(event) {
    this.setState(Object.assign({}, this.state, {
      personalAccessToken: event.target.value
    }));
  }

  renderLogin() {
    return <div className='login'>
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type='text' value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Personal Access Token: 
          <input type='text' value={this.state.personalAccessToken} onChange={this.handlePersonalAccessTokenChange} />
        </label>
        <input className='submit-btn' type='submit' value='clickme' />
      </form>
    </div>
  }

  render() {
    return <div>
      {renderIf(() => this.state.isLoggedIn, () => this.props.children)}
      {renderIf(() => !this.state.isLoggedIn, () => this.renderLogin())}
    </div>;
  }
}