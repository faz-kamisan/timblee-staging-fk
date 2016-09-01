import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PageType from './page_type'

const pageTypeSource = {
  beginDrag(props, monitor, component) {
    return {id: props.id, name: props.name, iconName: props.iconName, type: 'PageType'};
  }
};

var DragSourceDecorator = DragSource(ItemTypes.PAGE_TYPE, pageTypeSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
});

class DraggedPageType extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {});
  }

  render() {
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div className={'page-type-wrapper' + (isDragging ? ' dragging' : '')} >
        <PageType name={this.props.name} iconName={this.props.iconName} />
      </div>
    );
  }
}

var DraggablePageType = DragSourceDecorator(DraggedPageType);
export default DraggablePageType;
