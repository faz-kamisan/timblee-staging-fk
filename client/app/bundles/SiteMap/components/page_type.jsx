import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource} from 'react-dnd';

const pageTypeSource = {
  beginDrag(props, monitor, component) {
    return {id: props.id, name: props.name, type: 'pageType'};
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

class PageType extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };
  render() {
    const connectDragSource = this.props.connectDragSource
    return connectDragSource(
      <div>
        {this.props.name}
      </div>
    );
  }
}

var DraggablePageType = DragSourceDecorator(PageType);
export default DraggablePageType;
