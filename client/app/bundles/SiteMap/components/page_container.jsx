import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DragSource, DragLayer } from 'react-dnd';
import ConnectedPageTile from '../containers/connected_page_tile'

const sitemapSource = {
  beginDrag(props, monitor, component) {
    return {id: props.pageTree.id, parentId: props.pageTree.parentId, type: 'page'};
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

class PageContainer extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapId: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.pageTree.id == 6) {
    //   debugger
    // }
  }

  componentWillUpdate(nextProps, nextState) {
    // if(nextProps.pageTree.id == 6) {
    //   debugger
    // }
  }

  render() {
    const connectDragSource = this.props.connectDragSource;
    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = this.props.pageTree.children.map(function(pageTree, index) {
        return (
        <div key={pageTree.id}>
          <DraggablePageContainer pageTree={pageTree} onPageDrop={_this.props.onPageDrop} onPageTypeDrop={_this.props.onPageTypeDrop} sitemapId={_this.props.sitemapId} />
          <div className="level-support"></div>
        </div>
        )
      });
    }

    // if(this.props.pageTree.id == 6) {
    //   debugger
    // }

    // TODO: Have to fix passing of collapse separately.
    return connectDragSource(
      <div data-level={this.props.pageTree.level} className={ 'page-container level-' + this.props.pageTree.level.toString() + (this.props.isDragging ? ' dragging' : '') }>
        <ConnectedPageTile pageTree={ this.props.pageTree } />
        <div className="gutter"></div>
        <div className={ 'parent parent-' + this.props.pageTree.level.toString() + (this.props.pageTree.collapsed ? ' hide' : '')}>
          {children}
        </div>
      </div>
    );
  }
}

var DraggablePageContainer = DragSourceDecorator(PageContainer)
export default DraggablePageContainer

