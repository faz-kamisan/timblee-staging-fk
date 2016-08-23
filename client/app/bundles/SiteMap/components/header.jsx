import React, { PropTypes } from 'react';
class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }
  render() {
    return (
      <h2>{this.state.name}</h2>
    );
  }
}

export default Header;
