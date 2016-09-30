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
    $('#page-type').on('focus', function() {
      $(this).prop('placeholder', 'Search page types')
    })
    $('#page-type').on('blur', function() {
      $(this).prop('placeholder', 'Page type')
    })
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
    var searchQueryRegExp = new RegExp(('^' + this.state.searchQuery), 'i')
    var filteredPageTypes = this.props.pageTypes.filter(function(pageType) { return(pageType.name.match(searchQueryRegExp)) })
    var pageTypeComponents = filteredPageTypes.map(function(pageType, index) {
      return <li key={pageType.id}><DraggablePageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} /></li>
    })
    return (
      <div className={'sitemap-left-sidebar' + (this.props.leftSidebarExpanded ? '' : ' expand-false')}>
        {
          this.props.leftSidebarExpanded ?
          <div>
            <div className="close-left-bar">
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
              <input type="search" id="page-type" name="page-type" placeholder="Page type" onChange={this.handleSearch} />
              <label htmlFor="page-type">
                <i className="icon-search"></i>
              </label>
            </form>
            <ul className={"page-type-list clearfix" + ((filteredPageTypes.length == 0) ? ' hide' : '')}>
              {pageTypeComponents}
            </ul>
            <div className={'text-center no-match-text' + ((filteredPageTypes.length == 0) ? '' : ' hide')}>
              There are no page types that match '{this.state.searchQuery}'
            </div>
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
