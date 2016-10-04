import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { ItemTypes } from '../dnd/constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import PageContainer from './page_container'

const sitemapSource = {
  beginDrag(props, monitor, component) {
    return {id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page', pageTree: props.pageTree, sitemapNumber: props.sitemapNumber};
  },
  canDrag(props, monitor) {
    return((!props.publicShare) && (props.pageTree.level != 0))
  }
};

var DragSourceDecorator = DragSource(ItemTypes.PAGE_CONTAINER, sitemapSource,
  function(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    };
});

class DraggedPageContainer extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    sitemapId: PropTypes.number.isRequired
  };


  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {});
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isDragging && nextProps.isDragging) {
      var domNode = findDOMNode(this);
      $(domNode).parent('.child-page').addClass('dragging')
    }
    if (this.props.isDragging && !nextProps.isDragging) {
      // You can use this as leave handler
      var domNode = findDOMNode(this);
      $(domNode).parent('.child-page').removeClass('dragging')
    }
  }

  render() {
    const connectDragSource = this.props.connectDragSource;
    const isDragging = this.props.isDragging;
    var _this = this;
    var children;
    if (this.props.pageTree.children.filter(function(page) { return(page.state != 'archived') }) != null) {
      children = this.props.pageTree.children.filter(function(page) { return(page.state != 'archived') }).map(function(pageTree, index) {
        if(pageTree.level == 1) {
          var sitemapNumber = (index + 1).toString() + '.0';
        } else if(pageTree.level == 2) {
          var sitemapNumber = parseInt(_this.props.sitemapNumber).toString() + '.' + (index + 1);
        } else {
          var sitemapNumber = _this.props.sitemapNumber + '.' + (index + 1)
        }
        return (
          <div className='child-page' key={pageTree.id}>
            <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} sitemapNumber={sitemapNumber} publicShare={_this.props.publicShare} introSlideNumber={_this.props.introSlideNumber} showNextSlide={_this.props.showNextSlide} />
          </div>
        )
      });
    }
    // TODO: Have to fix passing of collapse separately.
    return connectDragSource(
      <div className={'page-container-wrapper' + (isDragging ? ' dragging' : '')} >
        <PageContainer pageTree={this.props.pageTree} children={children} sitemapNumber={this.props.sitemapNumber}  leftSidebarExpanded={this.props.leftSidebarExpanded} introSlideNumber={_this.props.introSlideNumber} showNextSlide={_this.props.showNextSlide} publicShare={_this.props.publicShare} />
      </div>
    );
  }
}

var DraggablePageContainer = DragSourceDecorator(DraggedPageContainer)
export default DraggablePageContainer
