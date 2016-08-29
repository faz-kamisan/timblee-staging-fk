import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DragLayer } from 'react-dnd';
import PageTile from './page_tile'

const sitemapSource = {
  beginDrag(props, monitor, component) {
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
    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.sort(function(first, second) { first.position - second.position }).map(function(pageTree, index) {
        return (
        <div key={index}>
          <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} />
          <div key={index + 'support'} className="level-support"></div>
        </div>
        )
      });
    }

    return connectDragSource(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() + (this.props.isDragging ? ' dragging' : '') }>
        <PageTile pageTree={ this.props.pageTree } />
        <div className="gutter"></div>
        <div className={ 'parent parent-' + this.props.pageTree.level.toString()}>
          {children}
        </div>
      </div>
    );
  }
}

var DraggablePageContainer = DragSourceDecorator(PageContainer)
export default DraggablePageContainer

