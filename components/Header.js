import PropTypes from "prop-types";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

import MenuDrop from "./MenuDrop";

import { styleToolbar } from "../lib/SharedStyles";

const optionsMenu = [
  {
    text: "Got question?",
    href: "https://github.com/viewplatgh/leaderboardmvp/issues"
  },
  {
    text: "Log out",
    href: "/logout"
  }
];

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item sm={1} xs={1} style={{ textAlign: "left" }}>
            {user ? (
              <div>
                <Hidden smDown>
                  <a
                    style={{ marginRight: "20px" }}
                    href={user.isReferee ? "/referee" : "/competitor"}
                  >
                    {user.isReferee
                      ? "Referee Dashboard"
                      : "Competitor Dashboard"}
                  </a>
                </Hidden>
              </div>
            ) : null}
          </Grid>
          <Grid item sm={1} xs={1}>
            <Link prefetch href="/">
              <a>
                <Avatar
                  src="/logo.jpg"
                  alt="Leader board"
                  style={{ margin: "0px auto 0px 20px" }}
                />
              </a>
            </Link>
          </Grid>
          <Grid item sm={6} xs={7} style={{ textAlign: "left" }}>
            <h2>
              <a href="/">Leader Board by Rob</a>
            </h2>
          </Grid>
          <Grid item sm={4} xs={3} style={{ textAlign: "right" }}>
            {user ? (
              <div style={{ whiteSpace: " nowrap" }}>
                {user.avatarUrl ? (
                  <MenuDrop
                    options={optionsMenu}
                    src={user.avatarUrl}
                    alt="Leader Board"
                    displayName={user.displayName}
                  />
                ) : null}
              </div>
            ) : (
              <Link prefetch href="/login">
                <a style={{ margin: "0px 20px 0px auto" }}>Log in</a>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string
  })
};

Header.defaultProps = {
  user: null
};

export default Header;
