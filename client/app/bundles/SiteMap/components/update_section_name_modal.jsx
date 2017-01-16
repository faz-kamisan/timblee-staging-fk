import React, { PropTypes } from 'react';
import PageType from './page_type'

class UpdateSectionNameModal extends React.Component {
  static propTypes = {
    section: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.updateSection = this.updateSection.bind(this);
    this.handleSectionNameChange = this.handleSectionNameChange.bind(this)
    this.state = {sectionName: ''}
  }

  handleSectionNameChange(e) {
    this.setState({ sectionName: e.target.value })
  }

  updateSection(e) {
    var _this = this
    var name = this.state.sectionName.trim()
    var id = this.props.section.id
    if(name) {
      this.props.onUpdateSection(name, id)
      $.ajax({
        url: '/sections/' + this.props.section.id,
        method: 'put',
        dataType: 'JSON',
        data: { id: id, section: { name: name } },
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
  }

  componentDidMount() {
    var _this = this;
    $('.update-section-name-modal').on('hidden.bs.modal', function () {
      setTimeout(function() {
        _this.setState({sectionName: _this.props.section.name})
      }, 500)
    });

    $('.update-section-name-modal').on('shown.bs.modal', function () {
        _this.setState({sectionName: _this.props.section.name})
      $('#section-name-new').focus();
    });
  }



  render() {
    var _this = this;
    return (
      <div className="modal fade update-section-name-modal" id="update-section-name-modal" tabIndex="-1" role="dialog" aria-labelledby="update-section-name-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <div className="create-section-heading">
                Give this section a new name
              </div>
              <div>
                <input className="form-control" type="text" value={this.state.sectionName} id="section-name-new" name="section-name-new" onChange={this.handleSectionNameChange} />
              </div>
              <div className="modal-button">
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-red" onClick={this.updateSection}>Update name</a>
                <a href="javascript:void(0);" data-dismiss="modal" className="btn btn-grey btn-last">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateSectionNameModal;
