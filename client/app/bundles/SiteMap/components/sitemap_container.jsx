import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource } from 'react-dnd';

const sitemapSource = {
  beginDrag() {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default class SitemapContainer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
  };
  render() {
    const connectDragSource = this.props.connectDragSource
    const isDragging = this.props.isDragging
    var children;
    if (this.props.sitemapTree.children != null) {
      children = this.props.sitemapTree.children.map(function(sitemapTree, index) {
        return <li key={index}><WrappedDraggableNode sitemapTree={sitemapTree} /></li>
      });
    }

    return connectDragSource(
      <div>
        <h5>
          {this.props.sitemapTree.name}
        </h5>
        <ul>
          {children}
        </ul>
      </div>
    );
  }
}

var WrappedDraggableNode = DragSource(ItemTypes.SITEMAP_CONTAINER, sitemapSource, collect)(SitemapContainer)
export default WrappedDraggableNode

