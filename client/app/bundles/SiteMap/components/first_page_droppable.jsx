import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || (item.pageType == 'page')) {
      return;
    }
    if(item.type == 'PageType') {
      var timeStamp = new Date();
      if(props.pageTree.footer) {
        var data = { page: { page_type_id: item.id, parent_id: null, sitemap_id: props.sitemapId, name: item.name, position: null, section_id: null, footer: true } }
      } else {
        var data = { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.pageTree.section_id } }
      }
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: data,
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          if(props.pageTree.footer) {
            props.onFooterPageIdUpdate(timeStamp, result.id)
          } else {
            props.onPageIdUpdate(timeStamp, props.pageTree.section_id, result.id)
          }
        },
        complete: (result) => {
          props.setSaving(true)
          setTimeout(function() {
            props.setSaving(false)
          }, 2000)
        }
      });
      if(props.pageTree.footer) {
        props.onFooterPageTypeDrop(item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
      } else {
        props.onPageTypeDrop(props.pageTree.section_id, item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
      }
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

class FirstPageDroppable extends React.Component {
  static propTypes = {
    onPageDrop: PropTypes.func.isRequired,
    onPageTypeDrop: PropTypes.func.isRequired,
    onPageIdUpdate: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired,
    leftSidebarExpanded: PropTypes.bool.isRequired,
    maxPageUid: PropTypes.number.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
      var domNode = findDOMNode(this);
      $(domNode).addClass('drag-over' )
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      var domNode = findDOMNode(this);
      $(domNode).removeClass('drag-over')
    }
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    return connectDropTarget(
      <div className='first-page'>
        <div className="collapse-open collapse-close"></div>
      <div className={'first-page-droppable' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted')}>
          <span>Drag and drop page tiles here to start building  your sitemap</span>
        </div>
      </div>
    );
  }
}

var DroppableFirstPageDroppable = DropTargetDecorator(FirstPageDroppable)
export default DroppableFirstPageDroppable
