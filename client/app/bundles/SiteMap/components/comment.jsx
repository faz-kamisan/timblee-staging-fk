import React, { PropTypes } from 'react';

class Comment extends React.Component {
  static propTypes = {
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <h4>
          {this.props.commenter.fullName}
        </h4>
        <h5>
          {this.props.message}
        </h5>
      </div>
    );
  }
}

export default Comment;
