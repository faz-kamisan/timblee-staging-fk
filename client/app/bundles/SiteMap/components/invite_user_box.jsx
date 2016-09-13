import React, { PropTypes } from 'react';

class InviteUserBox extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {email: ''}
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {

  }

  handleEmailChange(e) {
    this.setState({emails: e.target.value})
  }

  render() {
    return (
      <div>
        <label>Emails</label>
        <input type='text' name='emails' value={this.state.emails} id='emails' onChange={this.handleEmailChange}></input>
      </div>
    );
  }
}

export default InviteUserBox;
