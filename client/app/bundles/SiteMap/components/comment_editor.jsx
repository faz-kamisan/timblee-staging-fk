import React, { PropTypes } from 'react';
import { MentionsInput, Mention } from 'react-mentions'

class CommentEditor extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sectionId: PropTypes.number,
    updateComment: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    editMessage: PropTypes.func.isRequired,
    footer: PropTypes.bool.isRequired,
    business: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = { commentMessage: this.props.message }
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleUpdateComment = this.handleUpdateComment.bind(this)
    this.handleClearComment = this.handleClearComment.bind(this)
  }

  handleCommentChange(e) {
    this.setState({ commentMessage: e.target.value, showGuestInfoForm: false })
  }

  handleUpdateComment(e) {
    if(this.state.commentMessage.trim() != this.props.message.trim()) {
      var _this = this;
      this.props.updateComment(this.props.id, this.props.commentableId, this.props.commentableType, this.props.footer, this.state.commentMessage, this.props.sectionId)
      $.ajax({
        url: '/comments/' + this.props.id,
        method: 'put',
        dataType: 'JSON',
        data: { comment: { message: this.state.commentMessage } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          _this.props.setSaving(true)
          setTimeout(function() {
            _this.props.setSaving(false)
          }, 2000)
        }
      });
      this.props.editMessage(this.state.commentMessage)
    }
    this.props.closeEditor()
  }

  handleClearComment(e) {
    this.setState({ commentMessage: this.props.message })
    this.props.closeEditor()
  }

  componentDidUpdate(e) {
    if(this.state.commentMessage == '') {
      $(this.refs.newComment).focus()
      $(this.refs.newComment).blur()
    }
  }

  render() {
    return (
      <div className="relative">
        <MentionsInput className='comment-input' value={this.state.commentMessage} onChange={this.handleCommentChange} displayTransform={function(id, display, type) { return('@' + display + '') }} markup={'@[__display__]'} ref='newComment'>
          <Mention trigger="@" data={this.props.business.users} appendSpaceOnAdd={true} />
        </MentionsInput>
        <div className="add-remove-comment">
          <span onClick={this.handleUpdateComment} className='cursor add'>Update my comment </span>
          <span className="or">or</span>
          <span onClick={this.handleClearComment} className='cursor cancel'> cancel</span>
        </div>
      </div>
    )
  }
}

export default CommentEditor;
