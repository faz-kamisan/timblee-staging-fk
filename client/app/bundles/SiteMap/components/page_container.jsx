import React, { PropTypes } from 'react';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedLevelSupport from '../containers/connected_level_support'
import ConnectedLevelSupportBefore from '../containers/connected_level_support_before'
import ConnectedGutter from '../containers/connected_gutter'
import ConnectedFirstPageDroppable from '../containers/connected_first_page_droppable'

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  };

  render() {
    var children = [];
    if (this.props.pageTree.children) {
      children = this.props.pageTree.children.filter(function(page) { return(page.state != 'archived') })
    }
    var _this = this
    if(this.props.level == 0) {
      if(this.props.leftSidebarExpanded) {
        var width = ((children.length * 240) + 240)
      } else {
        var width = ((children.length * 240) + 240)
      }
      if(this.props.publicShare) {
        width -= 372
      }

      width = width.toString() + 'px'
      var className = 'page-container level-' + this.props.level.toString() + ((this.props.level > 0) ? (' border-level-' + ((this.props.level % 10) == 0 ? 10 : (this.props.level % 10)).toString()) : '') + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') + ((children.length == 0) ? ' no-children' : '') + ((this.props.level < 6) ? '' : ' to-be-faded')
      return (
        <div data-level={this.props.level} className={ className }>
          { this.props.sitemapNumber == '1.0' &&
            <ConnectedLevelSupportBefore pageTree={this.props.pageTree} />
          }
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} level={this.props.level} isDragging={this.props.isDragging} />
          <ConnectedGutter pageTree={this.props.pageTree} />
          { (children.length == 0) &&
            <ConnectedFirstPageDroppable pageTree={this.props.pageTree} leftSidebarExpanded={this.props.leftSidebarExpanded} />
          }
          <ConnectedLevelSupport pageTree={this.props.pageTree} />
          <div className={ 'parent parent-' + this.props.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '') + ((this.props.level > 4) ? '' : ' to-be-not-faded') + ((this.props.level < 6) ? '' : ' to-be-faded')} data-level={this.props.level}>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      var className = 'page-container level-' + this.props.level.toString() + ((this.props.level > 0) ? (' border-level-' + ((this.props.level % 10) == 0 ? 10 : (this.props.level % 10)).toString()) : '') + (this.props.leftSidebarExpanded ? '' : ' left-bar-contracted') + ((this.props.level < 6) ? '' : ' to-be-faded')
      return (
        <div data-level={this.props.level} className={ className }>
          { this.props.sitemapNumber == '1.0' &&
            <ConnectedLevelSupportBefore pageTree={this.props.pageTree} />
          }
          <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={children.length} sitemapNumber={this.props.sitemapNumber} name={this.props.pageTree.name} level={this.props.level} isDragging={this.props.isDragging} />
          <ConnectedGutter pageTree={this.props.pageTree} />
          <ConnectedLevelSupport pageTree={this.props.pageTree} />
          <div className={ 'parent parent-' + this.props.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '') + ((this.props.level > 4) ? '' : ' to-be-not-faded') + ((this.props.level < 6) ? '' : ' to-be-faded')} data-level={this.props.level}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default PageContainer;
