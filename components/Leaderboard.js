import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Fragment } from "react";

const styles = theme => ({
  root: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <h2>{this.props.leaderboard && this.props.leaderboard.displayName}</h2>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Competitor</TableCell>
                <TableCell align="right">Wins</TableCell>
                <TableCell align="right">Draws</TableCell>
                <TableCell align="right">Loss</TableCell>
                <TableCell align="right">Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.rows &&
                this.props.rows.map(row => (
                  <TableRow key={row.competitor.username}>
                    <TableCell component="th" scope="row">
                      {row.competitor.displayName
                        ? row.competitor.displayName
                        : row.competitor.username}
                    </TableCell>
                    <TableCell align="right">{row.wins}</TableCell>
                    <TableCell align="right">{row.draws}</TableCell>
                    <TableCell align="right">{row.loses}</TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Leaderboard);
