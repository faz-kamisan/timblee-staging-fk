import React, { PropTypes } from 'react';

class Comment extends React.Component {
  static propTypes = {
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <img className="user-comment-image" src='/assets/avatar_10.svg' />
        <h4>
          {this.props.commenter.fullName}
        </h4>
        <h6>
          {this.props.createdAt}
        </h6>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Comment;
