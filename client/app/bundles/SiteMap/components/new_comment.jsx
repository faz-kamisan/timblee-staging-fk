import React, { PropTypes } from 'react';
import { MentionsInput, Mention } from 'react-mentions'

class NewComment extends React.Component {
  static propTypes = {
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    footer: PropTypes.bool.isRequired,
    sectionId: PropTypes.number,
    addComment: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    onCommentIdUpdate: PropTypes.func.isRequired,
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
    console.log("comment change")
    console.log(e)
    console.log(this)
    this.setState({ newCommentMessage: e.target.value, showGuestInfoForm: false })
  }

  componentDidMount() {
    var data = this.props.business.users

    var formatted_data = data.map(function(object, index){
      var d = {}
      d["value"] = object["full_name"]
      d["uid"] = object["id"]
      return d
    })

    $('.comment-editor').twemojiPicker()

    $('.comment-editor').siblings('.twemoji-textarea').mentionsInput({source: formatted_data});
  }

  handleAddComment(e) {
    console.log("comment add")
    console.log(e)
    console.log(this)

    if(this.state.newCommentMessage.trim().length > 0) {
      var _this = this;
      var timeStamp = new Date().getTime();
      this.props.addComment(this.props.commentableId, this.props.commentableType, _this.props.footer, this.state.newCommentMessage, (this.props.currentUser || this.props.currentGuest), this.props.sectionId, timeStamp, this.props.sections, this.props.selectedPage)
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
          _this.props.onCommentIdUpdate(_this.props.commentableType, _this.props.commentableId, _this.props.footer, timeStamp, result.id, _this.props.sectionId)
        }
      });
      this.setState({ newCommentMessage: '' })
    }
  }

  handleClearComment(e) {
    console.log("comment clear")
    console.log(e)
    console.log(this)

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
        <textarea className="emoji-decorated comment-editor" value={this.state.newCommentMessage} onChange={this.handleCommentChange}></textarea>
        <div className="emoji-section">
          <a className="add-message add-invite-message" onClick={this.handleAddComment}>Add my message</a> or
          <a className="clear-text clear-custom-message" onClick={this.handleClearComment}>Cancel</a>
        </div>
      </div>
    )
  }
}

export default NewComment;
