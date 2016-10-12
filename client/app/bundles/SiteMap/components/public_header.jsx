import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'

class PublicHeader extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    sections: PropTypes.array.isRequired,
    footerPages: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.handleMainHeaderToggle = this.handleMainHeaderToggle.bind(this);
    this.handleSitemapShareClick = this.handleSitemapShareClick.bind(this);
    this.toggleCommentState = this.toggleCommentState.bind(this);
    this.toggleInductionState = this.toggleInductionState.bind(this);
    this.state = { name: props.name, showMainHeader: true, commentSidebarOpen: false, inductionSidebarOpen: false }
  }

  handleMainHeaderToggle(e) {
    $('body').toggleClass('hide-header');
    this.setState({showMainHeader: !this.state.showMainHeader})
  }

  handleSitemapShareClick(e) {
    this.props.showSitemapShareModal();
  }

  componentDidMount() {
    var _this = this
    $('body').addClass('hide-header')
    $('body').on('click', function(e) {
      if(!(e.target.closest('.sitemap-induction-sidebar') || e.target.closest('.sitemap-right-sidebar') || e.target.closest('.show-comments-sidebar-link') || e.target.closest('.show-induction-sidebar-link'))) {
        _this.setState({commentSidebarOpen: false, inductionSidebarOpen: false})
        $('.sitemap-induction-sidebar').removeClass('open')
        $('.sitemap-right-sidebar').removeClass('open')
        $('.comment-list').removeClass('open')
      }
    })
  }

  toggleCommentState(e) {
    this.setState({commentSidebarOpen: !this.state.commentSidebarOpen, inductionSidebarOpen: false})
    $('.sitemap-right-sidebar').toggleClass('open')
    $('.comment-list').toggleClass('open')
    $('.sitemap-induction-sidebar').removeClass('open')
  }

  toggleInductionState(e) {
    this.setState({inductionSidebarOpen: !this.state.inductionSidebarOpen, commentSidebarOpen: false})
    $('.sitemap-induction-sidebar').toggleClass('open')
    $('.sitemap-right-sidebar').removeClass('open')
    $('.comment-list').removeClass('open')
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
    return (
      <div className="react-public-header">
        <div className="business-name">
          <h3 className="site-map-name">{this.props.business.name}</h3>
        </div>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 text-center shared-details">
            <h1 className="truncate">{this.props.name}</h1>
            <span className='last-updated'>Last updated {this.props.updatedAt}</span>
            <span className='page-count'>{this.getPageCount()} {(this.getPageCount() == 1) ? 'Page' : 'Pages'}</span>
          </div>
        </div>
        <div className="header-options">
          <a href="javascript:void(0)" className={'show-comments-sidebar-link ' + ((this.state.commentSidebarOpen || (this.props.introSlideNumber == 2)) ? ' active' : '')} onClick={this.toggleCommentState}>
            <span className="icon-comment-circle"></span>
          </a>
          <a href="javascript:void(0)" className={'show-induction-sidebar-link ' + (this.state.inductionSidebarOpen ? 'active' : '')} onClick={this.toggleInductionState}>
            <span className="icon-question-circle"></span>
          </a>
        </div>
      </div>
    );
  }
}

export default PublicHeader;
