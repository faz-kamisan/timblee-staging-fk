import React, { PropTypes } from 'react';

class DeletePageModal extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.deletePage = this.deletePage.bind(this);
  }

  deletePage(e) {
    var _this = this
    $.ajax({
      url: '/pages/' + this.props.pageTree.id,
      method: 'delete',
      dataType: 'JSON',
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
    this.props.onPageDelete(this.props.pageTree)
  }

  render() {
    var _this = this;
    return (
      <div className="modal fade" id="delete-page-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-page-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <h4 className="modal-title">Delete page</h4>
              <p className="modal-message">{"You're about to delete the " + this.props.pageTree.name + " page. Any comments for this page will be archived and available via the comments sidebar."}</p>
            </div>
            <div className="modal-body">
              <div className="site-map-clone"></div>
              <div className="modal-button text-center">
                <a href="#" data-dismiss="modal" className="btn btn-red" onClick={this.deletePage}>Delete Page</a>
                <a href="#" data-dismiss="modal" className="btn btn-transparent btn-last">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeletePageModal;
