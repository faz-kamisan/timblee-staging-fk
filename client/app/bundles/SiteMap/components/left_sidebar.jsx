import React, { PropTypes } from 'react';
import DraggablePageType from './draggable_page_type'
import { traverse } from '../helpers/tree_helper'

class LeftSidebar extends React.Component {
  static propTypes = {
    pageTypes: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    updatedAt: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      searchQuery: ''
    }
    this.toogleExpand = this.toogleExpand.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  toogleExpand() {
    this.setState({expand: !this.state.expand});
  }

  handleSearch(e) {
    this.setState({searchQuery: e.target.value})
  }

  getPageCount() {
    var pageCount = 0
    this.props.sections.forEach(function(section, index) {
      traverse(section.pageTree, function(page) {
        pageCount ++
      })
    })
    return pageCount
  }

  render() {
    var _this = this;
    var filteredPageTypes = this.props.pageTypes.filter(function(pageType) { return(pageType.name.toLowerCase().indexOf(_this.state.searchQuery.toLowerCase()) !== -1) })
    var pageTypeComponents = filteredPageTypes.map(function(pageType, index) {
      return <li key={index}><DraggablePageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} /></li>
    })
    return (
      <div className={'sitemap-left-sidebar' + (this.state.expand ? '' : ' expand-false')}>
        {
          this.state.expand ?
          <div>
            <div className="close-left-bar">
              <span className="cursor" onClick={this.toogleExpand}>
                <span className="caret-left">
                  <i className="icon-caret"></i>
                </span>
                Hide Sidebar
              </span>
              <span>
                {this.getPageCount()} Pages | Last updated {this.props.updatedAt}
              </span>
            </div>
            <form className="search-page-type">
              <input type="search" placeholder="Page Type" onChange={this.handleSearch} />
              <i className="icon-search"></i>
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
