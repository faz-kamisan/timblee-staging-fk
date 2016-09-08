import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !(props.pageTree.id)) {
      return;
    }
    if(item.type == 'page') {
      props.setSaving(true)
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position + 1) } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        complete: (result) => {
          props.setSaving(false)
        }
      });
      props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
    } else if(item.type == 'PageType') {
      props.setSaving(true)
      var timeStamp = new Date();
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: (props.pageTree.position + 1), section_id: props.pageTree.section_id } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          props.onPageIdUpdate(timeStamp, props.pageTree.section_id, result.id)
        },
        complete: (result) => {
          props.setSaving(false)
        }
      });
      props.onPageTypeDrop(props.pageTree.section_id, item, props.pageTree.parentId, props.pageTree.position, timeStamp);
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
    onPageIdUpdate: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
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
