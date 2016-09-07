import React, { PropTypes } from 'react';

class NewComment extends React.Component {
  static propTypes = {
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    addComment: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    onCommentIdUpdate: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = { newCommentMessage: '' }
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleClearComment = this.handleClearComment.bind(this)
  }

  handleCommentChange(e) {
    this.setState({ newCommentMessage: e.target.value })
  }

  handleAddComment(e) {
    if(this.state.newCommentMessage.trim().length > 0) {
      var _this = this;
      var timeStamp = new Date();
      this.props.addComment(this.props.commentableId, this.props.commentableType, this.state.newCommentMessage, this.props.currentUser, this.props.sectionId, timeStamp)
      this.props.setSaving(true)
      $.ajax({
        url: '/comments/',
        method: 'post',
        dataType: 'JSON',
        data: { comment: { commentable_id: this.props.commentableId, commentable_type: this.props.commentableType, message: this.state.newCommentMessage } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          _this.props.onCommentIdUpdate(_this.props.commentableType, _this.props.commentableId, timeStamp, result.id, _this.props.sectionId)
        },
        complete: (result) => {
          _this.props.setSaving(false)
        }
      });
      this.setState({ newCommentMessage: '' })
    }
  }

  handleClearComment(e) {
    this.setState({ newCommentMessage: '' })
  }

  componentDidUpdate(e) {
    if(this.state.newCommentMessage == '') {
      $(this.refs.newComment).focus()
      $(this.refs.newComment).blur()
    }
  }

  render() {
    return (
      <div>
        <textarea className='comment-input' value={this.state.newCommentMessage} onChange={this.handleCommentChange} ref='newComment'>
        </textarea>
        <span onClick={this.handleAddComment} className='cursor'>Add my comment </span>
        or
        <span onClick={this.handleClearComment} className='cursor'> cancel</span>
      </div>
    )
  }
}

export default NewComment;
