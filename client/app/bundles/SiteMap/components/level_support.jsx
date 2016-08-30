import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  // canDrop: function(props, monitor) {
  //   const item = monitor.getItem()
  //   return((item.type == 'PageType') || (item.id != props.pageTree.id))
  //   // debugger
  // },
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    // debugger
    if (monitor.didDrop() || !(props.pageTree.id)) {
      return;
    }
    if(item.type == 'page') {
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position + 1) } },
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
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: 'New Page', position: (props.pageTree.position + 1) } },
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

class LevelSupport extends React.Component {
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
      <div className="level-support"></div>
    );
  }
}

var DroppableLevelSupport = DropTargetDecorator(LevelSupport)
export default DroppableLevelSupport
