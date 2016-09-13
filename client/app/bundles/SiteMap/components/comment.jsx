import React, { PropTypes } from 'react';

class Comment extends React.Component {
  static propTypes = {
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    setDeleteCommentId: PropTypes.func.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.showCommentDeleteConfirmation = this.showCommentDeleteConfirmation.bind(this)
  }

  showCommentDeleteConfirmation(e) {
    this.props.setDeleteCommentId(this.props.id, this.props.commentableType, this.props.commentableId, this.props.sectionId)
  }

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
        <p>
          <a onClick={this.showCommentDeleteConfirmation}>Delete</a>
        </p>
      </div>
    );
  }
}

export default Comment;
