import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || !(props.pageTree.id) || props.pageTree.footer || props.level == 0) {
      return;
    }
    if(item.type == 'page') {
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
    } else if(item.type == 'PageType') {
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
          props.setSaving(true)
          setTimeout(function() {
            props.setSaving(false)
          }, 2000)
        }
      });
      props.onPageTypeDrop(props.pageTree.section_id, item, props.pageTree.parentId, props.pageTree.position, timeStamp, props.maxPageUid);
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
    onPageIdUpdate: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string,
    name: PropTypes.string.isRequired,
    sitemapId: PropTypes.number.isRequired,
    maxPageUid: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
      if((this.props.level > 0) && !this.props.pageTree.footer) {
        var domNode = findDOMNode(this);
        $(domNode).addClass('drag-over' )
        $('.custom-drag-layer').addClass('over-page-top');
        if(this.props.level == 1) {
          $(domNode).parent('.page-tile').siblings('.level-support').addClass('again-drag-over')
        } else {
          $(domNode).parent('.page-tile').siblings('.gutter').addClass('again-drag-over')
        }
      }
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can use this as leave handler
      if((this.props.level > 0) && !this.props.pageTree.footer) {
        var domNode = findDOMNode(this);
        $(domNode).removeClass('drag-over')
        $('.custom-drag-layer').removeClass('over-page-top');
        if(this.props.level == 1) {
          $(domNode).parent('.page-tile').siblings('.level-support').removeClass('again-drag-over')
        } else {
          $(domNode).parent('.page-tile').siblings('.gutter').removeClass('again-drag-over')
        }
      }
    }
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    return connectDropTarget(
      <div className="tile-top">
        <h1 className="tile-name">
          <span className="tile-number">{this.props.sitemapNumber}</span>
        </h1>
      </div>
    );
  }
}

var DroppablePageTileTop = DropTargetDecorator(PageTileTop)
export default DroppablePageTileTop
