import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PageContainer from './page_container'

const sitemapSource = {
  beginDrag(props, monitor, component) {
    return {id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page', pageTree: props.pageTree, sitemapNumber: props.sitemapNumber};
  },
  canDrag(props, monitor) {
    return(props.pageTree.level != 0)
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

class DraggedPageContainer extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    sitemapId: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {});
  }

  render() {
    const connectDragSource = this.props.connectDragSource;
    const isDragging = this.props.isDragging;
    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.map(function(pageTree, index) {
        if(pageTree.level == 1) {
          var sitemapNumber = (index + 1).toString() + '.0';
        } else if(pageTree.level == 2) {
          var sitemapNumber = parseInt(_this.props.sitemapNumber).toString() + '.1';
        } else {
          var sitemapNumber = _this.props.sitemapNumber + '.' + (index + 1)
        }
        return (
          <div key={pageTree.parentId.toString() + pageTree.position.toString()}>
            <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} sitemapNumber={sitemapNumber} />
          </div>
        )
      });
    }
    // TODO: Have to fix passing of collapse separately.
    return connectDragSource(
      <div className={'page-container-wrapper' + (isDragging ? ' dragging' : '')} >
        <PageContainer pageTree={this.props.pageTree} children={children} sitemapNumber={this.props.sitemapNumber} />
      </div>
    );
  }
}

var DraggablePageContainer = DragSourceDecorator(DraggedPageContainer)
export default DraggablePageContainer
