import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || ((item.type == 'Page') && item.parentId == props.pageTree.id) || props.pageTree.footer || (props.pageTree.alt_section_id && (props.pageTree.alt_section_id != props.activeSectionId))) {
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
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.activeSectionId } },
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
      props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
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
    commentsLength: PropTypes.number.isRequired,
    sitemapId: PropTypes.number.isRequired,
    maxPageUid: PropTypes.number.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent && !this.props.pageTree.footer && !(this.props.pageTree.alt_section_id && (this.props.pageTree.alt_section_id != this.props.activeSectionId))) {
      var domNode = findDOMNode(this);
      $(domNode).addClass('drag-over' );
      $('.custom-drag-layer').addClass('over-page-bottom');
      $(domNode).parent('.page-tile').siblings('.gutter').addClass('again-2-drag-over');
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent && !this.props.pageTree.footer && !(this.props.pageTree.alt_section_id && (this.props.pageTree.alt_section_id != this.props.activeSectionId))) {
      var domNode = findDOMNode(this);
      $(domNode).removeClass('drag-over');
      $('.custom-drag-layer').removeClass('over-page-bottom');
      $(domNode).parent('.page-tile').siblings('.gutter').removeClass('again-2-drag-over');
    }
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    var formattedUid = (this.props.pageTree.uid.toString().length < 3 ? (('000' + this.props.pageTree.uid).substr(-3)) : this.props.pageTree.uid )
    return connectDropTarget(
      <div className="tile-bottom">
        <span className="tile-id">
          { (this.props.commentsLength > 0) &&
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
