import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragLayer } from 'react-dnd';
import PageContainerPreview from './page_container_preview';
import PageTypePreview from './page_type_preview';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 20,
  width: '200px',
  height: '100%',
  transform: 'rotate(-2deg)',
  WebkitTransform: 'rotate(-2deg)'
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return({
      display: 'none'
    });
  }
  let { x, y } = currentOffset;
  const transform = 'translate(' + x + 'px,' + y + 'px)';
  return ({
    transform: transform,
    WebkitTransform: transform
  });
}

var DragLayerDecorator = DragLayer(function(monitor) {
  return ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    currentPointerOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging()
  });
})

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentPointerOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    var itemtypes = ItemTypes
    switch (type) {
    case ItemTypes.PAGE_CONTAINER:
      return (
        <PageContainerPreview pageTree={item.pageTree} sitemapNumber={item.sitemapNumber} level={item.level} />
      );
    case ItemTypes.PAGE_TYPE:
      return (
        <PageTypePreview name={item.name} iconName={item.iconName} />
      );
    default:
      return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)} className='custom-drag-layer'>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

export default DragLayerDecorator(CustomDragLayer)
