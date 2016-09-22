import React, { PropTypes } from 'react';

class Comment extends React.Component {
  static propTypes = {
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    sectionId: PropTypes.number,
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editable: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    this.props.deleteComment(this.props.id, this.props.commentableId, this.props.commentableType, this.props.sectionId)
  }

  render() {
    if((this.props.currentUser && (this.props.commenter.email == this.props.currentUser.email)) || (this.props.currentGuest && (this.props.commenter.email == this.props.currentGuest.email))) {
      return (
        <div>
          <img className="user-comment-image" src='/assets/avatar_10.svg' />
          <h4>
            You
            { this.props.editable &&
              <span className='comment-action-links'>
                <a className='comment-edit-link cursor'> Edit</a> |
                <a className='comment-delete-link cursor' onClick={this.deleteComment}> Delete</a>
              </span>
            }
          </h4>
          <h6>
            {this.props.createdAt}
          </h6>
          <p>
            {this.props.message}
          </p>
        </div>
      );
    } else {
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
}

export default Comment;
