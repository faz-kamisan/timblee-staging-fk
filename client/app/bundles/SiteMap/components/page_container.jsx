import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DragLayer } from 'react-dnd';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedLevelSupport from '../containers/connected_level_support'
import ConnectedGutter from '../containers/connected_gutter'
const sitemapSource = {
  beginDrag(props, monitor, component) {
    console.log("hello")
    return {id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page'};
  }
};

var DragSourceDecorator = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
});

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props)
  }

  render() {
    const connectDragSource = this.props.connectDragSource;
    const isDragging = this.props.isDragging;
    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.map(function(pageTree, index) {
        if(pageTree.level == 1) {
          return (
            <div key={pageTree.id}>
              <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} />
              <ConnectedLevelSupport pageTree={pageTree} />
            </div>
          )
        } else {
          return (
            <div key={pageTree.id}>
              <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} />
            </div>
          )
        }
      });
    }

    // TODO: Have to fix passing of collapse separately.
    return connectDragSource(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() + (isDragging ? ' dragging' : '') }>
        <ConnectedPageTile pageTree={this.props.pageTree} collapsed={this.props.pageTree.collapsed} childrenLength={this.props.pageTree.children.length} />
        <ConnectedGutter pageTree={this.props.pageTree} />
        <div className={ 'parent parent-' + this.props.pageTree.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
          {children}
        </div>
      </div>
    );
  }
}

var DraggablePageContainer = DragSourceDecorator(PageContainer)
export default DraggablePageContainer

