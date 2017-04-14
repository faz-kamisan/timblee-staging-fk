import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import OrphanPage from './orphan_page'

const pageTypeSource = {
  beginDrag(props, monitor, component) {
    return {id: props.page.id, pageTree: props.page, type: 'page'};
  }
};

var DragSourceDecorator = DragSource(ItemTypes.ORPHAN_PAGE, pageTypeSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
});

class DraggedOrphanPage extends React.Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {});
  }

  render() {
    var _this = this;
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div className={'page-type-wrapper' + (isDragging ? ' dragging' : '')} >
        <OrphanPage page={this.props.page} isDragging={_this.props.isDragging} isDragPrview={false} />
      </div>
    );
  }
}

var DraggableOrphanPage = DragSourceDecorator(DraggedOrphanPage);
export default DraggableOrphanPage;
