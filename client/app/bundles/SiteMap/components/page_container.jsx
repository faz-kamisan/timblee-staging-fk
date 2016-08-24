import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapSource = {
  beginDrag(props, monitor, component) {
    return {id: props.pageTree.id, parentId: props.pageTree.parentId};
  }
  // beginDrag: function (props) {
  //   // Return the data describing the dragged item
  //   var item = { id: props.pageTree.id };
  //   return item;
  // },
};

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

const sitemapTarget = {
  hover: function(props, monitor, component) {
    // var domNode = findDOMNode(component);
    // $(domNode).css('background-color', 'yellow')
  },
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || item.parentId == props.pageTree.id) {
      return;
    }
    props.onDrop(item.id, props.pageTree.id);
  }
};

const sitemapDragLayer = {

}

var DragSourceDecorator = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
});

var DragLayerDecorator = DragLayer(function(monitor) {
                                    return {
                                      item: monitor.getItem(),
                                      itemType: monitor.getItemType(),
                                      currentOffset: monitor.getSourceClientOffset(),
                                      isDragging: monitor.isDragging()
                                    };
});

var DropTargetDecorator = DropTarget(ItemTypes.PAGE_CONTAINER, sitemapTarget,
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver()
    };
});

export default class PageContainer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
    // onDrop: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
      var domNode = findDOMNode(this);
      $(domNode).addClass('drag-over' )
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can use this as leave handler
      var domNode = findDOMNode(this);
      $(domNode).removeClass('drag-over')
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    const connectDragSource = this.props.connectDragSource
    const connectDropTarget = this.props.connectDropTarget
    const connectDragPreview = this.props.connectDragPreview;
    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.map(function(pageTree, index) {
        return <li key={index}><WrappedDraggableNode pageTree={pageTree} onDrop={_this.props.onDrop} /></li>
      });
    }

    return connectDragSource(connectDropTarget(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() + (this.props.isDragging ? ' dragging' : '') }>
        <h5>
          {this.props.pageTree.name}
        </h5>
        {this.props.isDragging && ' (and I am being dragged now)'}
        <ul>
          {children}
        </ul>
      </div>
    ));
  }
}

// var WrappedDraggableNode = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource, collect)(PageContainer)
var WrappedDraggableNode = DragLayerDecorator(DropTargetDecorator(DragSourceDecorator(PageContainer)))
// var WrappedDroppableDraggableNode = Drop(ItemTypes.PAGE_CONTAINER, sitemapSource, collect)(PageContainer)
export default WrappedDraggableNode

