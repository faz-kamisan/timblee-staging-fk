import React, { PropTypes } from 'react';
import ConnectedPageTileTop from '../containers/connected_page_tile_top';
import ConnectedPageTileBottom from '../containers/connected_page_tile_bottom';

class PageTile extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    childrenLength: PropTypes.number.isRequired,
    onCollapsedChanged: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleOnCollapsedChanged = this.handleOnCollapsedChanged.bind(this)
  }

  handleOnCollapsedChanged(e) {
    this.props.onCollapsedChanged(this.props.pageTree.id)
  }
  render() {
    if(this.props.childrenLength > 0) {
      return (
        <div className="page-tile">
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} />
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }></div>
          <div className={ "collapse-open" + (this.props.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>
        </div>
      );
    } else {
      return (
        <div className="page-tile">
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} />
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }></div>
        </div>
      );
    }
  }
}

export default PageTile
