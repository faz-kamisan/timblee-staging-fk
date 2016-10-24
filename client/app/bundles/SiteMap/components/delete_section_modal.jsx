import React, { PropTypes } from 'react';

class DeleteSectionModal extends React.Component {
  static propTypes = {
    section: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.deleteSection = this.deleteSection.bind(this);
  }

  getDefaultSection(sections) {
    return(sections.filter(function(section) { return section.default })[0])
  }

  deleteSection(e) {
    var _this = this
    e.preventDefault();
    e.stopPropagation();
    if(this.props.activeSectionId == this.props.section.id) {
      this.props.changeActiveSectionId(this.getDefaultSection(this.props.sections).id)
    }
    this.props.removeSection(this.props.section.id)
    $.ajax({
      url: '/sections/' + this.props.section.id,
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
      <div className="modal fade" id="delete-section-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-section-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close btn-modal-open" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <h4 className="modal-title">Delete section</h4>
              <p className="modal-message">{'Are you sure you want to delete this section: ' + this.props.section.name}</p>
              <p className="modal-message">Pages in this section will not be deleted but added back to the main sitemap. <br/> To delete any sub-pages, delete the parent page in the main sitemap.</p>
            </div>
            <div className="modal-body">
              <div className="modal-button text-center">
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-red" onClick={this.deleteSection}>Delete Section</a>
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-grey btn-last">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeleteSectionModal;
