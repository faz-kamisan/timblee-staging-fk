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
    var name = this.state.sectionName
    this.props.onCreateSection(this.props.pageTree, name, timeStamp)
    $.ajax({
      url: '/sections',
      method: 'post',
      dataType: 'JSON',
      data: { page_id: this.props.pageTree.id, section: { name: name } },
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

  componentDidMount() {
    var _this = this;
    $('.new-section-modal').on('hidden.bs.modal', function () {
      setTimeout(function() {
        _this.setState({sectionName: ''})
      }, 500)
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
              <div>
                <input className="form-control" type="text" value={this.state.sectionName} id="new-section-name" name="new-section-name" onChange={this.handleSectionNameChange} />
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
