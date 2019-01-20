/* eslint react/prefer-stateless-function: 0 */

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../lib/withAuth";
import withLayout from "../lib/withLayout";
import { styleLoginButton } from "../lib/SharedStyles";
import LoginForm from "../components/LoginForm";
import Leaderboard from "../components/Leaderboard";
// import fetch from "isomorphic-unfetch";
class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string
    })
  };

  static defaultProps = {
    user: null
  };

  static async getInitialProps({ req }) {
    const apiUrl = process.browser
      ? `//${window.location.host}/api/v1/oneleaderboard`
      : `//${req.headers.host}/api/v1/oneleaderboard`;
    return { apiUrl };
  }

  constructor(props) {
    super(props);
    this.state = { leaderboard: null };
  }

  async componentDidMount() {
    const resp = await fetch(this.props.apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const lb = await resp.json();
    return this.setState({ leaderboard: lb });
  }

  render() {
    const { user } = this.props;
    return (
      <div style={{ textAlign: "center", margin: "0 20px" }}>
        <Head>
          <title>Log in to Leader Board</title>
          <meta name="description" content="Login page for leaderboard" />
        </Head>
        <br />
        {!user && <LoginForm {...this.props} />}
        <Leaderboard {...this.state.leaderboard} />
      </div>
    );
  }
}

export default withAuth(withLayout(Index), { loginRequired: false });
