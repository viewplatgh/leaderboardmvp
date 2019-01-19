import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";

class MenuDrop extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(String).isRequired
  };

  state = {
    open: false,
    anchorEl: undefined
  };

  button = undefined;

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { options, src, alt } = this.props;

    return (
      <div>
        <table style={{ float: "right" }}>
          <tr>
            <td>
              {" "}
              <Avatar
                role="presentation"
                aria-owns="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClick}
                onKeyPress={this.handleClick}
                src={src}
                alt={alt}
                style={{ margin: "0px 20px 0px auto", cursor: "pointer" }}
              />
            </td>
            <td>
              <a href="/logout">Log out</a>
            </td>
          </tr>
        </table>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <p />
          {options.map(option => (
            <div id="wrappingLink" key={option.text}>
              <Link prefetch href={option.href} as={option.as || option.href}>
                <a style={{ padding: "0px 20px" }}>{option.text}</a>
              </Link>
              <p />
            </div>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MenuDrop;
