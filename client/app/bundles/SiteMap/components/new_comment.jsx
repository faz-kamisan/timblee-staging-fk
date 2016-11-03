import React, { PropTypes } from 'react';

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
    this.handleAddComment = this.handleAddComment.bind(this)
    this.handleClearComment = this.handleClearComment.bind(this)
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

    $(this.refs.newComment).twemojiPicker()
    $(this.refs.newComment).parent().append($('<div class="new-comment-place-holder">Add a comment... <br> You can mention people by typing @.</div>'))
    $(this.refs.newComment).siblings('.twemoji-textarea').mentionsInput({source: formatted_data, showAtCaret: true});
  }

  handleAddComment(e) {
    var textarea = $(this.refs.newComment).siblings('.twemoji-textarea')
    var textareaDup = $(this.refs.newComment).siblings('.twemoji-textarea-duplicate')

    var commentMessage = textarea.html()

    if(commentMessage.trim().length > 0) {
      var _this = this;
      var timeStamp = new Date().getTime();
      this.props.addComment(this.props.commentableId, this.props.commentableType, _this.props.footer, commentMessage, (this.props.currentUser || this.props.currentGuest), this.props.sectionId, timeStamp, this.props.sections, this.props.selectedPage)
      $.ajax({
        url: '/comments/',
        method: 'post',
        dataType: 'JSON',
        data: { comment: { commentable_id: this.props.commentableId, commentable_type: this.props.commentableType, message: commentMessage } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          _this.props.setSaving(true)
          setTimeout(function() {
            _this.props.setSaving(false)
          }, 2000)
          _this.props.onCommentIdUpdate(_this.props.commentableType, _this.props.commentableId, _this.props.footer, timeStamp, result.id, _this.props.sectionId, this.props.sections, this.props.selectedPage)
        }
      });
      this.refs.newComment.innerHTML = ''

      textarea.html('')
      textareaDup.html('')
    }
  }

  handleClearComment(e) {
    this.refs.newComment.innerHTML = ''
    $(this.refs.newComment).siblings('.twemoji-textarea').text('');
    $(this.refs.newComment).siblings('.twemoji-textarea-duplicate').text('');
  }

  componentDidUpdate(e) {
    if(this.refs.newComment.innerHTML == '') {
      $(this.refs.newComment).focus()
      $(this.refs.newComment).blur()
    }
  }

  render() {
    return (
      <div className="comment-holder">
        <textarea ref='newComment' id="temp" className="emoji-decorated comment-editor comment-input__input"></textarea>
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
