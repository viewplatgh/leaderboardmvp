import { Fragment } from "react";
import Button from "@material-ui/core/Button";

export default class LeaderboardList extends React.Component {
  constructor(props) {
    super(props);
  }

  static getInitialProps({ req }) {
    return {};
  }

  render() {
    return (
      <Fragment>
        <div>Leaderboard List</div>
      </Fragment>
    );
  }
}
