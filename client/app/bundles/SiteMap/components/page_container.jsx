import React, { PropTypes } from 'react';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedLevelSupport from '../containers/connected_level_support'
import ConnectedGutter from '../containers/connected_gutter'

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  };
  render() {
    return (
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() }>
        <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={this.props.pageTree.children.length} sitemapNumber={this.props.sitemapNumber} />
        <ConnectedGutter pageTree={this.props.pageTree} />
        <ConnectedLevelSupport pageTree={this.props.pageTree} />
        <div className={ 'parent parent-' + this.props.pageTree.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageContainer;
