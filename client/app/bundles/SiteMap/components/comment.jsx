import React, { PropTypes } from 'react';

class Comment extends React.Component {
  static propTypes = {
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <h3>
          {this.props.commenter.fullName}
        </h3>
        <h6>
          <span>
            {this.props.createdAt}
          </span>
        </h6>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Comment;
