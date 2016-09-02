import React, { PropTypes } from 'react';
import { ItemTypes } from '../dnd/constants';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const sitemapTarget = {
  drop: function(props, monitor, component) {
    const item = monitor.getItem();
    var _this = this;
    if (monitor.didDrop() || !(props.pageTree.id)) {
      return;
    }
    if(item.type == 'page') {
      $.ajax({
        url: '/pages/' + item.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { parent_id: props.pageTree.parentId, position: (props.pageTree.position + 1) } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        }
      });
      props.onPageDrop(item.id, props.pageTree.parentId, (props.pageTree.position));
    } else if(item.type == 'PageType') {
      var timeStamp = new Date();
      $.ajax({
        url: '/pages/',
        method: 'post',
        dataType: 'JSON',
        data: { page: { page_type_id: item.id, parent_id: props.pageTree.parentId, sitemap_id: props.sitemapId, name: item.name, position: (props.pageTree.position + 1) } },
        error: (result, b, c, d) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          props.onPageIdUpdate(timeStamp, result.id)
        }
      });
      props.onPageTypeDrop(item, props.pageTree.parentId, (props.pageTree.position), timeStamp);
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
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sitemapId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { nameChangeDisabled: true }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    var name = event.target.value
    $.ajax({
      url: '/pages/' + this.props.pageTree.id,
      method: 'put',
      dataType: 'JSON',
      data: { page: { name: name } },
      error: (result) => {
        document.setFlash(result.responseText)
      }
    });
    this.props.onNameChange(this.props.pageTree.id, name);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
      if(this.props.pageTree.parentId) {
        var domNode = findDOMNode(this);
        $(domNode).addClass('drag-over' )
        if(this.props.pageTree.level == 1) {
          $(domNode).parent('.page-tile').siblings('.level-support').addClass('drag-over')
        } else {
          $(domNode).parent('.page-tile').siblings('.gutter').addClass('drag-over')
        }
      }
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can use this as leave handler
      if(this.props.pageTree.parentId) {
        var domNode = findDOMNode(this);
        $(domNode).removeClass('drag-over')
        if(this.props.pageTree.level == 1) {
          $(domNode).parent('.page-tile').siblings('.level-support').removeClass('drag-over')
        } else {
          $(domNode).parent('.page-tile').siblings('.gutter').removeClass('drag-over')
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
          {this.state.nameChangeDisabled && this.props.name}
          {!(this.state.nameChangeDisabled) && <textarea value = {this.props.name} onChange={this.handleNameChange} disabled={this.state.nameChangeDisabled}></textarea>}
        </h1>
      </div>
    );
  }
}

var DroppablePageTileTop = DropTargetDecorator(PageTileTop)
export default DroppablePageTileTop
