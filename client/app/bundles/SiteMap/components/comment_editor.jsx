import React, { PropTypes } from 'react';

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
    this.handleUpdateComment = this.handleUpdateComment.bind(this)
    this.handleCancelComment = this.handleCancelComment.bind(this)
  }

  componentDidMount() {
    var users_data =  this.props.business.users.map(function(object, index){
                        var d = {}
                        d["value"] = object["full_name"]
                        d["uid"] = "user:" + object["id"]
                        d['image'] = object['avatarUrl']
                        return d
                      })

    var guests_data = this.props.business.guestUsers.map(function(object, index){
                        var d = {}
                        d["value"] = object["full_name"]
                        d["uid"] = "guest:" + object["id"]
                        d['image'] = object['avatarUrl']
                        return d
                      })

    var formatted_data = []

    formatted_data = formatted_data.concat(users_data)
    formatted_data = formatted_data.concat(guests_data)

    setupEmojiPicker()

    var placeholderText = $('<div class="new-comment-place-holder">Add a comment... <br> You can mention people by typing @.</div>')
    $(this.refs.commentEditor).parent().append(placeholderText)

    $(this.refs.commentEditor).next().mentionsInput({source: formatted_data, showAtCaret: true})

    $(this.refs.commentEditor).html(this.props.message)
    $(this.refs.commentEditor).next().html(this.props.message)

    displayPlaceholderText($(this.refs.commentEditor))
  }


  handleUpdateComment(e) {
    var textarea = $(this.refs.commentEditor).next()

    var commentMessage = textarea.html()

    if(commentMessage.trim() != this.props.message.trim()) {
      var _this = this;
      this.props.updateComment(this.props.id, this.props.commentableId, this.props.commentableType, this.props.footer, commentMessage, this.props.sectionId)
      $.ajax({
        url: '/comments/' + this.props.id,
        method: 'put',
        dataType: 'JSON',
        data: { comment: { message: commentMessage } },
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
      this.props.editMessage(commentMessage)
    }
    this.props.closeEditor()
  }

  handleCancelComment(e) {
    this.props.closeEditor()
  }

  componentDidUpdate(e) {
    if(this.refs.commentEditor.innerHTML == '') {
      $(this.refs.commentEditor).focus()
      $(this.refs.commentEditor).blur()
    }
  }

  render() {
    return (
      <div className="comment-editor-div">
        <textarea ref='commentEditor' defaultValue={this.props.message} id="temp" className="emoji-decorated comment-editor comment-input__input" data-emojiable="true" data-emoji-input="unicode"></textarea>
        <div className="add-remove-comment">
          <span onClick={this.handleUpdateComment} className='cursor add'>Update my comment </span>
          <span className="or">or</span>
          <span onClick={this.handleCancelComment} className='cursor cancel'> cancel</span>
        </div>
      </div>
    )
  }
}

export default CommentEditor;
