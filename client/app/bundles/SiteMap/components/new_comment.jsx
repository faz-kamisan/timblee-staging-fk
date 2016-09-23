import React, { PropTypes } from 'react';
import { MentionsInput, Mention } from 'react-mentions'

class NewComment extends React.Component {
  static propTypes = {
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    sectionId: PropTypes.number,
    addComment: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    onCommentIdUpdate: PropTypes.func.isRequired,
    setShowGuestInfoForm: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = { newCommentMessage: '' }
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleClearComment = this.handleClearComment.bind(this)
  }

  handleCommentChange(e) {
    this.setState({ newCommentMessage: e.target.value, showGuestInfoForm: false })
  }

  handleAddComment(e) {
    if(this.props.currentUser || this.props.currentGuest) {
      if(this.state.newCommentMessage.trim().length > 0) {
        var _this = this;
        var timeStamp = new Date();
        this.props.addComment(this.props.commentableId, this.props.commentableType, this.state.newCommentMessage, (this.props.currentUser || this.props.currentGuest), this.props.sectionId, timeStamp)
        $.ajax({
          url: '/comments/',
          method: 'post',
          dataType: 'JSON',
          data: { comment: { commentable_id: this.props.commentableId, commentable_type: this.props.commentableType, message: this.state.newCommentMessage } },
          error: (result) => {
            document.setFlash(result.responseText)
          },
          success: (result) => {
            _this.props.setSaving(true)
            setTimeout(function() {
              _this.props.setSaving(false)
            }, 2000)
            _this.props.onCommentIdUpdate(_this.props.commentableType, _this.props.commentableId, timeStamp, result.id, _this.props.sectionId)
          }
        });
        this.setState({ newCommentMessage: '' })
      }
    } else {
      this.props.setShowGuestInfoForm(true)
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
      <div className="relative">
        <MentionsInput className='comment-input' value={this.state.newCommentMessage} onChange={this.handleCommentChange} displayTransform={function(id, display, type) { return('@' + display) }} markup={'@__display__'} ref='newComment'>
          <Mention trigger="@" data={this.props.business.users} appendSpaceOnAdd={true} />
        </MentionsInput>
        <div className="add-remove-comment">
          <span onClick={this.handleAddComment} className='cursor add'>Add my comment </span>
          <span className="or">or</span>
          <span onClick={this.handleClearComment} className='cursor cancel'> cancel</span>
        </div>
      </div>
    )
  }
}

export default NewComment;
