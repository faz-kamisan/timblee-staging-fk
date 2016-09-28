import React, { PropTypes } from 'react';
import PageType from './page_type'

class PageChangeModal extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.setPageType = this.setPageType.bind(this);
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { searchQuery: '' }
  }

  handleSearch(e) {
    this.setState({searchQuery: e.target.value})
  }

  setPageType(pageType) {
    var _this = this
    $.ajax({
      url: '/pages/' + this.props.pageTree.id,
      method: 'put',
      dataType: 'JSON',
      data: { page: { page_type_id: pageType.id } },
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
    this.setState({currentPageType: pageType})
    this.props.onPageTypeChange(this.props.pageTree, pageType)
  }

  render() {
    var _this = this;
    var filteredPageTypes = this.props.pageTypes.filter(function(pageType) { return(pageType.name.toLowerCase().indexOf(_this.state.searchQuery.toLowerCase()) !== -1) })
    var pageTypeComponents = filteredPageTypes.map(function(pageType, index) {
      return(
        <li key={pageType.id} onClick={ function(e) { _this.setPageType(pageType) } }>
          <PageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} />
        </li>
      )
    })
    return (
      <div className="modal fade page-change-modal" id="page-change-modal" tabIndex="-1" role="dialog" aria-labelledby="page-change-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal hide-delete-modal'></img>
                </span>
              </button>
              <h4 className="modal-title">Change the page type</h4>
            </div>
            <div className="modal-body">
              <div className="clearfix">
                <div className='current-page-type pull-left'>
                  <span>Current page type:</span>
                  { this.props.pageTree.pageType &&
                    <PageType name={this.props.pageTree.pageType.name} iconName={this.props.pageTree.pageType.icon_name} id={this.props.pageTree.pageType.id} />
                  }
                </div>
                <div className="page-types pull-left">
                  <form className="search-page-type">
                    <label htmlFor="page-type">
                      <i className="icon-search"></i>
                    </label>
                    <input type="search" id="page-type" name="page-type" placeholder="Find your page type" onChange={this.handleSearch} />
                  </form>
                  <ul className="page-type-list clearfix">
                    {pageTypeComponents}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageChangeModal;
