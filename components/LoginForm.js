import { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { styleLoginButton } from "../lib/SharedStyles";
import { login } from "../utils/auth";

export default class LoginForm extends React.Component {
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
      <Fragment>
        <p style={{ margin: "45px auto", fontSize: "44px", fontWeight: "400" }}>
          Log in
        </p>
        <div className="login">
          <form method="post" action="/login">
            <label htmlFor="username">GitHub username</label>

            <input
              type="text"
              id="username"
              name="username"
              value={this.props.username}
              onChange={this.handleChange}
            />
            <input type="hidden" name="password" value="password" />

            <label style={{ textAlign: "left" }}>
              <input type="checkbox" name="isreferee" value="value" />
              <span>&nbsp;&nbsp;is referee</span>
            </label>

            <Button variant="contained" style={styleLoginButton} type="submit">
              Login
            </Button>

            <p className={`error ${this.state.error && "show"}`}>
              {this.props.error && `Error: ${this.state.error}`}
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
      </Fragment>
    );
  }
}
