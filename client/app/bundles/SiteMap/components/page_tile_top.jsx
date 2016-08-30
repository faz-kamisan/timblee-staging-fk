import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

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
        data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position) } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        }
      });
      props.onPageDrop(item.id, props.pageTree.parentId, props.pageTree.position);
    } else if(item.type == 'pageType') {
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: 'New Page', position: (props.pageTree.position) } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        }
      });
      props.onPageTypeDrop(item.id, props.pageTree.parentId, props.pageTree.position);
    }
  }
};

var DropTargetDecorator = DropTarget([ItemTypes.PAGE_CONTAINER, ItemTypes.PAGE_TYPE], sitemapTarget,
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver()
    };
});

class PageTileTop extends React.Component {
  static propTypes = {
    onPageDrop: PropTypes.func.isRequired,
    onPageTypeDrop: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired
  };

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
    const connectDropTarget = this.props.connectDropTarget

    return connectDropTarget(
      <div className="tile-top">
        <h1 className="tile-name">
          <span className="tile-number">1.0</span>
          { this.props.pageTree.name }
        </h1>
      </div>
    );
  }
}

var DroppablePageTileTop = DropTargetDecorator(PageTileTop)
export default DroppablePageTileTop
