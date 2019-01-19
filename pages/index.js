/* eslint react/prefer-stateless-function: 0 */

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../lib/withAuth";
import withLayout from "../lib/withLayout";
import { styleLoginButton } from "../lib/SharedStyles";
import LoginForm from "../components/LoginForm";

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    user: null
  };

  static getInitialProps({ req }) {
    const apiUrl = process.browser
      ? `//${window.location.host}/api/v1/login`
      : `//${req.headers.host}/api/v1/login`;

    return { apiUrl };
  }

  constructor(props) {
    super(props);
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
      </div>
    );
  }
}

export default withAuth(withLayout(Index), { loginRequired: false });
