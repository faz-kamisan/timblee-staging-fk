import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'

class PublicHeader extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.handleMainHeaderToggle = this.handleMainHeaderToggle.bind(this);
    this.handleSitemapShareClick = this.handleSitemapShareClick.bind(this);
    this.toggleCommentState = this.toggleCommentState.bind(this);
    this.toggleInductionState = this.toggleInductionState.bind(this);
    this.state = { name: props.name, showMainHeader: true, commentSidebarOpen: false }
  }

  handleMainHeaderToggle(e) {
    $('body').toggleClass('hide-header');
    this.setState({showMainHeader: !this.state.showMainHeader})
  }

  handleSitemapShareClick(e) {
    this.props.showSitemapShareModal();
  }

  componentDidMount() {
    $('body').addClass('hide-header')
  }

  toggleCommentState(e) {
    this.setState({commentSidebarOpen: !this.state.commentSidebarOpen})
    $('.sitemap-right-sidebar').toggleClass('open')
    $('.comment-list').toggleClass('open')
    $('.sitemap-induction-sidebar').removeClass('open')
  }

  toggleInductionState(e) {
    $('.sitemap-induction-sidebar').toggleClass('open')
    $('.sitemap-right-sidebar').removeClass('open')
    $('.comment-list').removeClass('open')
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
    return (
      <div className="react-public-header">
        <div className="row">
          <div className="col-xs-4">
            <div className="row">
              <div className="col-xs-9">
                <h3 className="site-map-name">{this.props.business.name}</h3>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
              <ul>
                <li>{this.props.name}</li>
                <li><span className='last-updated'>Last updated {this.props.updatedAt}</span></li>
                <li>{this.getPageCount()} {(this.getPageCount() == 1) ? 'Page' : 'Pages'}</li>
              </ul>
          </div>
          <div className="col-xs-4">
            <div className="pull-right">
              <a href="javascript:void(0)" className="btn btn-toggle-comments" onClick={this.toggleCommentState}>Comments</a>
              <a href="javascript:void(0)" className="btn btn-help" onClick={this.toggleInductionState}>Help</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicHeader;
