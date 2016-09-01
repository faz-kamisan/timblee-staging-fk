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
    iconName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };
  render() {
    const connectDragSource = this.props.connectDragSource
    return connectDragSource(
      <div className={"page-type-outer " + this.props.iconName}>
        <div className="page-type-box">
          <aside className="page-type-details">
            <span className="dummy-number">xx</span>
            <h5>{this.props.name}</h5>
            <span className="dummy-id">
              <span className="dummy-state"></span> ID: xxx
            </span>  
          </aside>
          <aside className="page-type-icon"></aside>
        </div>
        <h4>{this.props.name}</h4>
      </div>
    );
  }
}

var DraggablePageType = DragSourceDecorator(PageType);
export default DraggablePageType;
