import React, { PropTypes } from 'react';
import DraggablePageType from './draggable_page_type'
import DraggableOrphanPage from './draggable_orphan_page'
import { traverse } from '../helpers/tree_helper'

class LeftSidebar extends React.Component {
  static propTypes = {
    pageTypes: PropTypes.array.isRequired,
    orphanPages: PropTypes.array.isRequired,
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
    /*$('body').on('focus', '#page-type', function() {
      $(this).prop('placeholder', 'Search screen types')
    });
    $('body').on('blur', '#page-type', function() {
      $(this).prop('placeholder', 'Screen types')
    });*/
    if(this.props.trial) {
      $('body').addClass('trial');
    }
  }

  getPageCount(sections, footerPages) {
    var pageCount = 0
    sections.forEach(function(section, index) {
      traverse(section.pageTree, function(page) {
        if(page.state != 'archived' && page.state != 'orphan') {
          pageCount ++
        }
      })
    })

    footerPages.forEach(function(page, index) {
      if(page.state != 'archived' && page.state != 'orphan') {
        pageCount ++
      }
    })
    return pageCount
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.leftSidebarExpanded != nextProps.leftSidebarExpanded) ||
      (this.props.updatedAt != nextProps.updatedAt) ||
      (this.getPageCount(this.props.sections, this.props.footerPages) != this.getPageCount(nextProps.sections, nextProps.footerPages)) ||
      (this.props.footerPages.length != nextProps.footerPages.length) ||
      (this.state.searchQuery != nextState.searchQuery) ||
      (this.props.orphanPages.length != nextProps.orphanPages.length)
    )
  }

  render() {
    var _this = this;
    if(this.state.searchQuery.length > 0) {
      var searchQueryRegExp = new RegExp(('\\b' + this.state.searchQuery), 'gi')
      var filteredPageTypes = this.props.pageTypes.filter(function(pageType) { return(pageType.name.match(searchQueryRegExp)) })
      var filteredOrphanPages = this.props.orphanPages.filter(function(page) { return(page.name.match(searchQueryRegExp)) })
    } else {
      var filteredPageTypes = this.props.pageTypes
      var filteredOrphanPages = this.props.orphanPages
    }
    var pageTypeComponents = filteredPageTypes.map(function(pageType, index) {
      return <li key={pageType.id}><DraggablePageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} /></li>
    })
    var orphanPageComponents = filteredOrphanPages.map(function(page, index) {
      return <li key={page.id}><DraggableOrphanPage page={page} /></li>

    })
    return (
      <div className={'sitemap-left-sidebar' + (this.props.leftSidebarExpanded ? '' : ' expand-false') + (this.props.trial ? ' trial' : '')}>
        {
          this.props.leftSidebarExpanded ?
          <div>
            <div className={"close-left-bar" + (this.props.trial ? ' hide' : '')}>
              <div className="row">
                <span className="cursor col-xs-5 p-r-0" onClick={this.toogleExpand}>
                  <span className="caret-left">
                    <i className="icon-caret"></i>
                  </span>
                  Hide Sidebar
                </span>
                <span className="last-updated col-xs-7 p-r-0 text-right">
                  {this.getPageCount(this.props.sections, this.props.footerPages)} {(this.getPageCount(this.props.sections, this.props.footerPages) == 1) ? 'Page' : 'Pages'} | Last updated {this.props.updatedAt}
                </span>
              </div>
            </div>
            <form className="search-page-type">
              <input type="search" id="page-type" value={this.state.searchQuery} name="page-type" placeholder="Search screens..." className={(this.state.searchQuery.length > 0) ? ' search-active' : ''} onChange={this.handleSearch} />
              <label htmlFor="page-type">
                <i className="icon-search"></i>
              </label>
            </form>
            <div className="left-bar-wrapper">
            { filteredOrphanPages.length > 0 &&
              <span>
                  <div className="orphan-screens-details">
                    Orphan screens  <span className='pull-right screens-count'>{filteredOrphanPages.length + (filteredOrphanPages.length == 1 ? ' Screen' : ' Screens')}</span>
                  </div>
                  <ul className={"page-type-list orphan-page-type-list clearfix" + ((filteredOrphanPages.length == 0) ? ' hide' : '')}>
                    {orphanPageComponents}
                  </ul>
                </span>
              }
            <div className="default-screens-details">
              Default screens  <span className='pull-right screens-count'>{filteredPageTypes.length + (filteredPageTypes.length == 1 ? ' Screen' : ' Screens')}</span>
            </div>
            <ul className={"page-type-list clearfix" + ((filteredPageTypes.length == 0) ? ' hide' : '')}>
              {pageTypeComponents}
            </ul>
            <div className={'text-center no-match-text' + ((filteredPageTypes.length == 0) ? '' : ' hide')}>
              There are no default screens that match '{this.state.searchQuery}'
            </div>
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
