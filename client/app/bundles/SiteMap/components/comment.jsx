import React, { PropTypes } from 'react';
import ConnectedCommentEditor from '../containers/connected_comment_editor'

class Comment extends React.Component {
  static propTypes = {
    commentableId: PropTypes.number.isRequired,
    commentableType: PropTypes.string.isRequired,
    commentableName: PropTypes.string.isRequired,
    sectionId: PropTypes.number,
    commenter: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editable: PropTypes.bool.isRequired,
    modalView: PropTypes.bool.isRequired,
    footer: PropTypes.bool,
    createdAt: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {editMode: (this.props.id == this.props.commentInEditionId), editable: this.props.editable, message: this.props.message}
    this.setSelectedComment = this.setSelectedComment.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.messageFormatter = this.messageFormatter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({message: nextProps.message})
    this.setState({editable: nextProps.editable})
    this.setState({editMode: (nextProps.id == nextProps.commentInEditionId)})
  }

  componentDidMount() {
    var _this = this;
    $('#page-comments-modal').on('shown.bs.modal', function () {
      if(_this.state.editMode) {
        _this.setState({editMode: false})
      }
    });
  }

  showEditor(e) {
    this.setState({editMode: true, editable: false})
    if(this.props.commentableType == 'Page' && this.props.setCommentInEditionId) {
      this.props.setCommentInEditionId(this.props.id);
    }
  }

  closeEditor(e) {
    this.setState({editMode: false, editable: this.props.editable})
    if(this.props.commentableType == 'Page' && this.props.setCommentInEditionId) {
      this.props.setCommentInEditionId(null);
    }
  }

  messageFormatter() {
    return this.state.message.replace(/<strong(.*?)>(.*?)<\/strong>/g, function(match, p1, p2) { return('<span class="comment-mention">@' + p2 + '</span>') })
  }

  editMessage(message) {
    this.setState({message: message})
  }

  setSelectedComment(e) {
    var comment = {
                    id: this.props.id,
                    commentableId: this.props.commentableId,
                    commentableType: this.props.commentableType,
                    commentableName: this.props.commentableName,
                    sectionId: this.props.sectionId,
                    commenter: this.props.commenter,
                    message: this.props.message,
                    createdAt: this.props.createdAt,
                    modalView: this.props.modalView,
                    footer: this.props.footer
                  }
    this.props.setSelectedComment(comment)
  }

  render() {
    var commenterImageUrl = this.props.commenter.avatar ? this.props.commenter.avatar.avatar.url : '/assets/guest-icon.png'
    if((this.props.currentUser && (this.props.commenter.email == this.props.currentUser.email)) || (this.props.currentGuest && (this.props.commenter.email == this.props.currentGuest.email))) {
      return (
        <div className='comment-block'>
          <img className="user-comment-image" src={commenterImageUrl} />
          <h4>
            You
            { this.state.editable &&
              <span className={'comment-action-links' + (this.props.modalView ? ' modal-view' : '')}>
                <a className='comment-edit-link cursor' onClick={this.showEditor}> Edit</a> <span className="divider">|</span>
                <a href="#comment-delete-modal" className='comment-delete-link cursor btn-modal-open' data-dismiss="modal" onClick={this.setSelectedComment} data-toggle='modal'> Delete</a>
              </span>
            }
          </h4>
          <h6>
            {this.props.createdAt}
          </h6>
          <div className={ 'comment-editor-container' + (this.state.editMode ? '': ' hide' )}>
            <ConnectedCommentEditor message={ this.state.message } commentableId={this.props.commentableId} commentableType={this.props.commentableType} sectionId={this.props.sectionId} id={this.props.id} closeEditor={this.closeEditor} modalView={this.props.modalView} editMessage={this.editMessage} footer={this.props.footer} />
          </div>
          <div className={this.state.editMode ? 'hide': ''}>
            <p dangerouslySetInnerHTML={{ __html: this.messageFormatter() }} />
          </div>
        </div>
      );
    } else {
      return (
        <div className='comment-block'>
          <img className="user-comment-image" src={commenterImageUrl} />
          <h4>
            {this.props.commenter.fullName}
          </h4>
          <h6>
            {this.props.createdAt}
          </h6>
          <p dangerouslySetInnerHTML={{ __html: this.messageFormatter() }} />
        </div>
      );
    }
  }
}

export default Comment;
