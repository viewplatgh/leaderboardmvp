import { Component } from "react";
import Head from "next/head";
import Button from "@material-ui/core/Button";

import withAuth from "../../lib/withAuth";
import withLayout from "../../lib/withLayout";
import { styleLoginButton } from "../../lib/SharedStyles";
import Leaderboard from "../../components/Leaderboard";

class Dashboard extends Component {
  static getInitialProps({ req }) {
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
    return (
      <div style={{ textAlign: "center", margin: "0 20px" }}>
        <Head>
          <title>Dashboard of Leader Board</title>
          <meta name="description" content="Dashboard for leaderboard" />
        </Head>
        <Leaderboard {...this.state.leaderboard} />
      </div>
    );
  }
}

export default withAuth(withLayout(Dashboard), { loginRequired: true });
