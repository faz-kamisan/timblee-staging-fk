import React, { PropTypes } from 'react';
import DraggablePageType from './draggable_page_type'
import { traverse } from '../helpers/tree_helper'

class LeftSidebar extends React.Component {
  static propTypes = {
    pageTypes: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    footerPages: PropTypes.array.isRequired,
    updatedAt: PropTypes.string.isRequired,
    leftSidebarExpanded: PropTypes.bool.isRequired,
    trial: PropTypes.bool.isRequired,
    toggleLeftSideBarExpanded: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
    this.toogleExpand = this.toogleExpand.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  toogleExpand() {
    this.props.toggleLeftSideBarExpanded(!this.props.leftSidebarExpanded)
  }

  handleSearch(e) {
    this.setState({searchQuery: e.target.value})
  }

  componentDidMount() {
    if(this.props.trial) {
      $('body').addClass('trial');
    }
  }

  getPageCount() {
    var pageCount = 0
    this.props.sections.forEach(function(section, index) {
      traverse(section.pageTree, function(page) {
        if(page.state != 'archived') {
          pageCount ++
        }
      })
    })

    this.props.footerPages.forEach(function(page, index) {
      if(page.state != 'archived') {
        pageCount ++
      }
    })
    return pageCount
  }

  render() {
    var _this = this;
    var filteredPageTypes = this.props.pageTypes.filter(function(pageType) { return(pageType.name.toLowerCase().indexOf(_this.state.searchQuery.toLowerCase()) !== -1) })
    var pageTypeComponents = filteredPageTypes.map(function(pageType, index) {
      return <li key={pageType.id}><DraggablePageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} /></li>
    })
    return (
      <div className={'sitemap-left-sidebar' + (this.props.leftSidebarExpanded ? '' : ' expand-false') + (this.props.trial ? ' trial' : '')}>
        {
          this.props.leftSidebarExpanded ?
          <div>
            <div className={"close-left-bar" + (this.props.trial ? ' hide' : '')}>
              <div className="row">
                <span className="cursor col-xs-4 p-r-0" onClick={this.toogleExpand}>
                  <span className="caret-left">
                    <i className="icon-caret"></i>
                  </span>
                  Hide Sidebar
                </span>
                <span className="last-updated col-xs-8 p-r-0 text-right">
                  {this.getPageCount()} {(this.getPageCount() == 1) ? 'Page' : 'Pages'} | Last updated {this.props.updatedAt}
                </span>
              </div>
            </div>
            <form className="search-page-type">
              <label htmlFor="page-type">
                <i className="icon-search"></i>
              </label>
              <input type="search" id="page-type" name="page-type" placeholder="Page Type" onChange={this.handleSearch} />
            </form>
            <ul className="page-type-list clearfix">
              {pageTypeComponents}
            </ul>
          </div>
          :
          <div className="expand-btn" onClick={this.toogleExpand}>
            <span>Expand</span>
          </div>
        }
      </div>
    );
  }
}

export default LeftSidebar;
