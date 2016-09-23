import React, { PropTypes } from 'react';
import ConnectedComment from '../containers/connected_comment'

class CommentDeleteModal extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    var _this = this
    this.props.deleteComment(this.props.comment.id, this.props.comment.commentableId, this.props.comment.commentableType, this.props.comment.sectionId)
    $.ajax({
      url: '/comments/' + this.props.id,
      method: 'delete',
      dataType: 'JSON',
      error: (result) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
        this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
  }

  render() {
    var _this = this;
    return (
      <div className="modal fade" id="comment-delete-modal" tabIndex="-1" role="dialog" aria-labelledby="comment-delete-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close btn-modal-open" data-dismiss="modal" data-target="#page-comments-modal" data-toggle={this.props.comment.modalView? 'modal' : ''} aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <h4 className="modal-title">Delete comment</h4>
              <p className="modal-message">{'You are about to delete this comment on ' + this.props.comment.commentableName}</p>
            </div>
            <div className="modal-body">
              <div className="comment-clone">
                {this.props.comment.commenter &&
                  <ul className="comment-group">
                    <li>
                      <ConnectedComment id={this.props.comment.id} message={this.props.comment.message} commenter={this.props.comment.commenter} createdAt={this.props.comment.createdAt} editable={false} commentableId={this.props.comment.commentableId} commentableType='Page' sectionId={this.props.comment.sectionId} commentableName={ this.props.comment.commentableName } modalView={false} />
                    </li>
                  </ul>
                }
              </div>
              <div className="modal-button text-center">
                <a href="#" data-dismiss="modal" data-target="#page-comments-modal" data-toggle={this.props.comment.modalView? 'modal' : ''} className="btn btn-red btn-modal-open" onClick={this.deleteComment}>Delete Comment</a>
                <a href="#" data-dismiss="modal" data-target="#page-comments-modal" data-toggle={this.props.comment.modalView? 'modal' : ''} className="btn btn-transparent btn-last btn-modal-open">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentDeleteModal;
