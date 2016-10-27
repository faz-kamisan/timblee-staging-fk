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
    this.handleClearComment = this.handleClearComment.bind(this)
  }

  componentDidMount() {
    var data = this.props.business.users
    var formatted_data = data.map(function(object, index){
      var d = {}
      d["value"] = object["full_name"]
      d["uid"] = object["id"]
      d['image'] = object['avatarUrl']
      return d
    })
    $(this.refs.commentEditor).twemojiPicker()
    $(this.refs.commentEditor).siblings('.twemoji-textarea').mentionsInput({source: formatted_data});

    this.refs.commentEditor.innerHTML = this.props.message

    $(this.refs.commentEditor).siblings('.twemoji-textarea').html(this.props.message);
    $(this.refs.commentEditor).siblings('.twemoji-textarea-duplicate').html(this.props.message);
  }


  handleUpdateComment(e) {
    var textarea = $(this.refs.commentEditor).siblings('.twemoji-textarea')
    var textareaDup = $(this.refs.commentEditor).siblings('.twemoji-textarea-duplicate')

    var commentMessage = textarea.html()

    this.refs.commentEditor.innerHTML = ''

    textarea.html('');
    textareaDup.html('');

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

  handleClearComment(e) {
    this.refs.commentEditor.innerHTML = ''
    $(this.refs.commentEditor).siblings('.twemoji-textarea').text('');
    $(this.refs.commentEditor).siblings('.twemoji-textarea-duplicate').text('');
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
      <div className="relative">
        <textarea ref='commentEditor' defaultValue={this.props.message} id="temp" className="emoji-decorated comment-editor comment-input__input"></textarea>
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
