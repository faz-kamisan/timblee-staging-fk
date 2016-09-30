import React, { PropTypes } from 'react';

class DeleteSectionModal extends React.Component {
  static propTypes = {
    section: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.deleteSection = this.deleteSection.bind(this);
  }

  deleteSection(e) {
    var _this = this
    this.props.removeSection(this.props.section.id)
    // this.props.deleteSection(this.props.comment.id, this.props.comment.commentableId, this.props.comment.commentableType, this.props.comment.footer, this.props.comment.sectionId)
    // $.ajax({
    //   url: '/comments/' + this.props.comment.id,
    //   method: 'delete',
    //   dataType: 'JSON',
    //   error: (result) => {
    //     document.setFlash(result.responseText)
    //   },
    //   complete: (result) => {
    //     this.props.setSaving(true)
    //     setTimeout(function() {
    //       _this.props.setSaving(false)
    //     }, 2000)
    //   }
    // });
  }

  render() {
    var _this = this;
    return (
      <div className="modal fade" id="delete-section-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-section-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close btn-modal-open" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <h4 className="modal-title">Delete comment</h4>
              <p className="modal-message">{'Are you sure you want to delete this section: ' + this.props.section.name}</p>
              <p className="modal-message">All pages in this section will be deleted and their comments will be archived.</p>
            </div>
            <div className="modal-body">
              <div className="modal-button text-center">
                <a href="#" data-dismiss="modal" className="btn btn-red btn-modal-open" onClick={this.deleteSection}>Delete Section</a>
                <a href="#" data-dismiss="modal" className="btn btn-transparent btn-last btn-modal-open">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteSectionModal;
