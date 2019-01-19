import { Component } from "react";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../../lib/withAuth";
import withLayout from "../../lib/withLayout";
import { styleLoginButton } from "../../lib/SharedStyles";

import LoginForm from "../../components/LoginForm";

class Login extends Component {
  static getInitialProps({ req }) {
    const apiUrl = process.browser
      ? `//${window.location.host}/api/v1/login`
      : `//${req.headers.host}/api/v1/login`;

    return { apiUrl };
  }
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
        <LoginForm />
      </div>
    );
  }
}

export default withAuth(withLayout(Login), { logoutRequired: true });
