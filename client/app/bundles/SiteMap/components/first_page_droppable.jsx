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
        var data = { page: { page_type_id: item.id, parent_id: props.pageTree.id, sitemap_id: props.sitemapId, name: item.name, position: 1, section_id: props.activeSectionId } }
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
        props.onFooterPageTypeDrop(item, timeStamp, props.maxPageUid);
      } else {
        props.onPageTypeDrop(props.activeSectionId, item, props.pageTree.id, 'begining', timeStamp, props.maxPageUid);
      }
    }else if(item.type == 'page' && item.pageTree.state == 'orphan'){
      if(props.pageTree.footer) {
        var data = { page: { parent_id: null, position: null, section_id: null, footer: true, state: 'active' } }
      } else {
        var data = { page: { parent_id: props.pageTree.id, position: 1, section_id: props.activeSectionId, state: 'active' } }
      }
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: data,
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
      if(props.pageTree.footer) {
        props.onFooterOrphanPageDrop(item);
      } else {
        props.onOrphanPageDrop(item.id, props.pageTree.section_id, props.pageTree.id, 'begining');
      }
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

  constructor(props) {
    super(props);
    this.addFirstSubPage = this.addFirstSubPage.bind(this)
  }

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

  addFirstSubPage(e) {
    var timeStamp = new Date();
    var _this = this;
    $.ajax({
      url: '/pages/',
      method: 'post',
      dataType: 'JSON',
      data: { page: { page_type_id: this.props.pageType.id, parent_id: this.props.pageTree.id, sitemap_id: this.props.sitemapId, name: this.props.pageType.name, position: 1, section_id: this.props.activeSectionId } },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      success: (result) => {
        var onPageIdUpdate = _this.props.onPageIdUpdate
        var pageTree = _this.props.pageTree
        onPageIdUpdate(timeStamp, pageTree.section_id, result.id)
      },
      complete: (result) => {
        _this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
    this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.id, 'begining', timeStamp, this.props.maxPageUid);
  }

  render() {
    const connectDropTarget = this.props.connectDropTarget
    return connectDropTarget(
      <div className='first-page'>
        { !this.props.pageTree.footer &&
          <div className="collapse-open collapse-close" onClick={this.addFirstSubPage}></div>
        }
        { !this.props.pageTree.footer &&
          <div className={'first-page-droppable' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted')}>
            <span>Drag and drop screen tiles here <br/> to start building your sitemap</span>
          </div>
        }
        { this.props.pageTree.footer &&
          <div className={'first-page-droppable' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted')}>
            <span>Drag and drop screen tiles here <br/> to add them into the footer</span>
          </div>
        }
      </div>
    );
  }
}

var DroppableFirstPageDroppable = DropTargetDecorator(FirstPageDroppable)
export default DroppableFirstPageDroppable
