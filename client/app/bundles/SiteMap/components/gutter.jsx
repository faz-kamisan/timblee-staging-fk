import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !(props.pageTree.id) || (props.pageTree.level == 1) || props.pageTree.footer) {
      return;
    }
    if(item.type == 'page') {
      if(item.pageTree.state == 'active') {
        $.ajax({
          url: '/pages/' + item.id,
          method: 'put',
          dataType: 'JSON',
          data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position + 1) } },
          error: (result) => {
            document.setFlash(result.responseText)
          },
          complete: (result) => {
            props.setSaving(true)
            setTimeout(function() {
              props.setSaving(false)
            }, 2000)
          }
        });
        props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
      }else{
       $.ajax({
          url: '/pages/' + item.id,
          method: 'put',
          dataType: 'JSON',
          data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position + 1), section_id: props.activeSectionId, state: 'active' } },
          error: (result) => {
            document.setFlash(result.responseText)
          },
          complete: (result) => {
            props.setSaving(true)
            setTimeout(function() {
              props.setSaving(false)
            }, 2000)
          }
        });
        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.parentId, props.pageTree.position);
      }
    } else if(item.type == 'PageType') {
      var timeStamp = new Date();
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: (props.pageTree.position + 1), section_id: props.activeSectionId } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          props.onPageIdUpdate(timeStamp, props.activeSectionId, result.id)
        },
        complete: (result) => {
          props.setSaving(true)
          setTimeout(function() {
            props.setSaving(false)
          }, 2000)
        }
      });
      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.parentId, props.pageTree.position, timeStamp, props.maxPageUid);
    }
  }
};

var DropTargetDecorator = DropTarget([ItemTypes.PAGE_CONTAINER, ItemTypes.PAGE_TYPE, ItemTypes.ORPHAN_PAGE], sitemapTarget,
  function(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver()
    };
});

class Gutter extends React.Component {
  static propTypes = {
    onPageDrop: PropTypes.func.isRequired,
    onPageTypeDrop: PropTypes.func.isRequired,
    onPageIdUpdate: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired,
    maxPageUid: PropTypes.number.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer) {
      var domNode = findDOMNode(this);
      $(domNode).addClass('drag-over' )
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
      // You can use this as leave handler
      var domNode = findDOMNode(this);
      $(domNode).removeClass('drag-over')
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    return connectDropTarget(
      <div className={"gutter " + ((this.props.pageTree.children.length > 0) ? 'with-children' : '') }></div>
    );
  }
}

var DroppableGutter = DropTargetDecorator(Gutter)
export default DroppableGutter
