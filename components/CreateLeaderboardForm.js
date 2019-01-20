import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { styleRaisedButton } from "../lib/SharedStyles";
import { create } from "../utils/leaderboard";

export default class CreateLeaderboardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { display_name: "", error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ display_name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    create({
      displayName: this.state.display_name,
      url: "/api/v1/referee/leaderboards/create"
    }).catch(() => this.setState({ error: "Failed to create leaderboard" }));
  }

  render() {
    return (
      <Fragment>
        <p style={{ margin: "45px auto", fontSize: "44px", fontWeight: "400" }}>
          Create Leaderboard
        </p>
        <div className="createForm">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="display_name">Leaderboard name</label>

            <input
              type="text"
              id="display_name"
              name="display_name"
              value={this.state.display_name}
              onChange={this.handleChange}
            />

            <Button variant="contained" style={styleRaisedButton} type="submit">
              Create
            </Button>

            <p className={`error ${this.state.error && "show"}`}>
              {this.props.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx="true">{`
          .createForm {
            max-width: 768px;
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
      </Fragment>
    );
  }
}
