import React, { PropTypes } from 'react';
import Comment from './comment'
import ConnectedNewComment from '../containers/connected_new_comment'

class PageCommentsModal extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    var _this = this;
    if(this.props.pageTree.comments) {
      var renderedPageComments = this.props.pageTree.comments.map(function(comment, index) {
        return <li key={index}><Comment id={comment.id} message={comment.message} commenter={comment.commenter} createdAt={comment.created_at} /></li>
      })

      return (
        <div className="modal fade" id="page-comments-modal" tabIndex="-1" role="dialog" aria-labelledby="page-comments-modalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">
                    <img src='/assets/close-modal.svg' className='close-modal hide-delete-modalx'></img>
                  </span>
                </button>
                <div className='page-comments'>
                  <div className="page-comment-details">
                    <span className="page-id">ID: {this.props.pageTree.uid}</span>
                    <div className="clearfix">
                      <span className="page-name truncate pull-left">{this.props.pageTree.name}</span>
                      <label className="pull-right" htmlFor="mark-resolve">
                        Mark as resolved
                        <input type="checkbox" id="mark-resolve" />
                      </label>
                    </div>
                  </div>
                  <ul className="comment-group">
                    {renderedPageComments}
                  </ul>
                  <ConnectedNewComment commentableId={this.props.pageTree.id} commentableType='Page' sectionId={this.props.pageTree.sectionId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(<div />)
    }
  }
}

export default PageCommentsModal;
