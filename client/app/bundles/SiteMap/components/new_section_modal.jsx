import React, { PropTypes } from 'react';
import PageType from './page_type'

class NewSectionModal extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.createSection = this.createSection.bind(this);
    this.handleSectionNameChange = this.handleSectionNameChange.bind(this)
    this.state = {sectionName: ''}
  }

  handleSectionNameChange(e) {
    this.setState({ sectionName: e.target.value })
  }

  createSection(e) {
    var _this = this
    var timeStamp = new Date();
    this.props.onCreateSection(this.props.pageTree, this.state.sectionName, timeStamp)
    $.ajax({
      url: '/sections',
      method: 'post',
      dataType: 'JSON',
      data: { page_id: this.props.pageTree.id, section: { name: this.state.sectionName } },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
        _this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
  }

  render() {
    var _this = this;
    return (
      <div className="modal fade new-section-modal" id="new-section-modal" tabIndex="-1" role="dialog" aria-labelledby="new-section-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <div className="create-section-heading">
                Give this section a name
              </div>
              <div className="page-types">
                <form>
                  <input className="form-control" type="text" id="new-section-name" name="new-section-name" onChange={this.handleSectionNameChange} />
                </form>
              </div>
              <div className="modal-button">
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-red" onClick={this.createSection}>Create section</a>
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-grey btn-last">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewSectionModal;
