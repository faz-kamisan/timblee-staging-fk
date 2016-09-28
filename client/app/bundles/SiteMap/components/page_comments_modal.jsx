  import React, { PropTypes } from 'react';
import ConnectedComment from '../containers/connected_comment'
import ConnectedMarkAsResolvedCheck from '../containers/connected_mark_as_resolved_check'
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
        return <li key={index}><ConnectedComment id={comment.id} message={comment.message} commenter={comment.commenter} createdAt={comment.created_at} editable={(_this.props.pageTree.state == 'active')} commentableId={_this.props.pageTree.id} commentableType='Page' sectionId={_this.props.pageTree.section_id} commentableName={ _this.props.pageTree.name } modalView={true} /></li>
      })
    }
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
                      <ConnectedMarkAsResolvedCheck page={this.props.pageTree} pageState={this.props.pageTree.state} />
                  </div>
                </div>
                <ul className="comment-group">
                  {this.props.pageTree && renderedPageComments}
                </ul>
                { (this.props.pageTree.state == 'active') &&
                  <ConnectedNewComment commentableId={this.props.pageTree.id} commentableType='Page' sectionId={this.props.pageTree.section_id} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageCommentsModal;
