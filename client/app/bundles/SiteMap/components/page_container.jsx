import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapSource = {
  beginDrag(props, monitor, component) {
    return {id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page'};
  }
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
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || item.parentId == props.pageTree.id) {
      return;
    }
    if(item.type == 'page') {
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { parent_id: props.pageTree.id } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        }
      });
      props.onPageDrop(item.id, props.pageTree.id);
    } else if(item.type == 'pageType') {
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: 'New Page' } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        }
      });
      props.onPageTypeDrop(item.id, props.pageTree.id);
    }
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

var DragLayerDecorator = DragLayer(function(monitor) {
                                    return {
                                      isDragging: monitor.isDragging()
                                    };
});

var DropTargetDecorator = DropTarget([ItemTypes.PAGE_CONTAINER, ItemTypes.PAGE_TYPE], sitemapTarget,
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver()
    };
});

class PageContainer extends React.Component {
  static propTypes = {
    onPageDrop: PropTypes.func.isRequired,
    onPageTypeDrop: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired
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
        return <li key={index}><DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} /></li>
      });
    }

    return connectDragSource(connectDropTarget(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() + (this.props.isDragging ? ' dragging' : '') }>
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

var DraggablePageContainer = DragLayerDecorator(DropTargetDecorator(DragSourceDecorator(PageContainer)))
export default DraggablePageContainer

