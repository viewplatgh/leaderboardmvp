/* eslint react/prefer-stateless-function: 0 */

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../lib/withAuth";
import withLayout from "../lib/withLayout";
import { styleLoginButton } from "../lib/SharedStyles";

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    user: null
  };

  constructor(props) {
    super(props);

    this.state = { username: "", error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const url = this.props.apiUrl;
    login({ username, url }).catch(() =>
      this.setState({ error: "Login failed." })
    );
  }

  render() {
    return (
      <div style={{ textAlign: "center", margin: "0 20px" }}>
        <Head>
          <title>Log in to Leader Board</title>
          <meta name="description" content="Login page for leaderboard" />
        </Head>
        <br />
        <p style={{ margin: "45px auto", fontSize: "44px", fontWeight: "400" }}>
          Log in
        </p>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">GitHub username</label>

            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <button type="submit">Login</button>

            <p className={`error ${this.state.error && "show"}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx="true">{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          form {
            display: flex;
            flex-flow: column;
          }

          label {
            font-weight: 600;
          }

          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }

          .error.show {
            display: block;
          }
        `}</style>
      </div>
    );
  }
}

export default withAuth(withLayout(Index), { loginRequired: false });
