import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || ((item.type == 'Page') && item.parentId == props.pageTree.id)) {
      return;
    }
    if(item.type == 'page') {
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { parent_id: props.pageTree.id, position: 1 } },
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
      props.onPageDrop(item.id, props.pageTree.section_id, props.pageTree.id, 'begining');
    } else if(item.type == 'PageType') {
      var timeStamp = new Date();
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.pageTree.section_id } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          props.onPageIdUpdate(timeStamp, props.pageTree.section_id, result.id)
        },
        complete: (result) => {
          props.setSaving(true)
          setTimeout(function() {
            props.setSaving(false)
          }, 2000)
        }
      });
      props.onPageTypeDrop(props.pageTree.section_id, item, props.pageTree.id, 'begining', timeStamp);
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

class PageTileBottom extends React.Component {
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
      $(domNode).addClass('drag-over' );
      $(domNode).parent('.page-tile').siblings('.gutter').addClass('again-2-drag-over');
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      var domNode = findDOMNode(this);
      $(domNode).removeClass('drag-over');
      $(domNode).parent('.page-tile').siblings('.gutter').removeClass('again-2-drag-over');
    }
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    var formattedUid = (this.props.pageTree.uid.toString().length < 3 ? (('000' + this.props.pageTree.uid).substr(-3)) : this.props.pageTree.uid )
    return connectDropTarget(
      <div className="tile-bottom">
        <span className="tile-id">
          { (this.props.pageTree.comments.length > 0) &&
            <span className="dummy-state"></span>
          }
          ID: { formattedUid }
        </span>
      </div>
    );
  }
}

var DroppablePageTileBottom = DropTargetDecorator(PageTileBottom)
export default DroppablePageTileBottom
