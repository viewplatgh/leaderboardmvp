import { Component } from "react";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../../lib/withAuth";
import withLayout from "../../lib/withLayout";
import { styleLoginButton } from "../../lib/SharedStyles";

import LeaderboardList from "../../components/LeaderboardList";
import CreateLeaderboardForm from "../../components/CreateLeaderboardForm";

import { login } from "../../utils/auth";

class Dashboard extends Component {
  static getInitialProps({ req }) {
    const apiUrl = process.browser
      ? `//${window.location.host}/api/v1/login`
      : `//${req.headers.host}/api/v1/login`;

    return { apiUrl };
  }
  constructor(props) {
    super(props);

    this.state = { username: "", error: "" };
  }

  render() {
    return (
      <div style={{ textAlign: "center", margin: "0 20px" }}>
        <Head>
          <title>Dashboard of Leader Board</title>
          <meta name="description" content="Dashboard for leaderboard" />
        </Head>
        <br />
        <LeaderboardList />
        <CreateLeaderboardForm />
      </div>
    );
  }
}

export default withAuth(withLayout(Dashboard), {
  loginRequired: true,
  refereeRequired: true
});
