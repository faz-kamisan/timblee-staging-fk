import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ConnectedPageTile from '../containers/connected_page_tile'
import ConnectedFirstPageDroppable from '../containers/connected_first_page_droppable'

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    if (monitor.didDrop() || (item.pageType == 'page')) {
      return;
    }
    if(item.type == 'PageType') {
      var timeStamp = new Date();
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, footer: true, sitemap_id: props.sitemapId, name: item.name } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          props.onPageIdUpdate(timeStamp, result.id)
        },
        complete: (result) => {
          props.setSaving(true)
          setTimeout(function() {
            props.setSaving(false)
          }, 2000)
        }
      });
      props.onPageTypeDrop(item, timeStamp, props.maxPageUid);
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

class Footer extends React.Component {
  static propTypes = {
    onPageTypeDrop: PropTypes.func.isRequired,
    onPageIdUpdate: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    sitemapId: PropTypes.number.isRequired,
    maxPageUid: PropTypes.number.isRequired,
    leftSidebarExpanded: PropTypes.bool.isRequired
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
    var usablePages = this.props.footerPages.filter(function(page) { return(page.state != 'archived') })
    var renderedFooterPages = usablePages.map(function(footerPage, index) {
      return(
        <li key={footerPage.id} className='footer-page'>
          <ConnectedPageTile pageTree={footerPage} collapsed={true} childrenLength={0} name={footerPage.name} />
        </li>
      )
    })
    return connectDropTarget(
      <div className={'sitemap-footer hide' + (this.props.leftSidebarExpanded ? '' : ' left-sidebar-contracted')}>
        <span>Footer</span>
        { (usablePages.length > 0) &&
          <ul className='footer-page-list'>
            {renderedFooterPages}
          </ul>
        }
        { (usablePages.length == 0) &&
          <ConnectedFirstPageDroppable pageTree={{footer: true}} leftSidebarExpanded={this.props.leftSidebarExpanded} />
        }
      </div>
    );
  }
}

var DroppableFooter = DropTargetDecorator(Footer)
export default DroppableFooter
