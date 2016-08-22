import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapSource = {
  beginDrag() {
    return {};
  }
};

const sitemapTarget = {
  hover: function(props, monitor, component) {
    // var domNode = findDOMNode(component);
    // $(domNode).css('background-color', 'yellow')
  },
  drop: function(props, monitor, component) {
    // var domNode = findDOMNode(component);
  }
};

var DragSourceDecorator = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
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
    pageTree: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
      var domNode = findDOMNode(this);
      // debugger
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
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.map(function(pageTree, index) {
        return <li key={index}><WrappedDraggableNode pageTree={pageTree} /></li>
      });
    }
    console.log(this.props.isDragging)

    return connectDragSource(connectDropTarget(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() }>
        <h5>
          {this.props.pageTree.name}
        </h5>
        <ul>
          {children}
        </ul>
      </div>
    ));
  }
}

// var WrappedDraggableNode = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource, collect)(PageContainer)
var WrappedDraggableNode = DropTargetDecorator(DragSourceDecorator(PageContainer))
// var WrappedDroppableDraggableNode = Drop(ItemTypes.PAGE_CONTAINER, sitemapSource, collect)(PageContainer)
export default WrappedDraggableNode

