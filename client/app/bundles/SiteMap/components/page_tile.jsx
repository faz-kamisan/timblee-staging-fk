import React, { PropTypes } from 'react';
import ConnectedPageTileTop from '../containers/connected_page_tile_top';
import ConnectedPageTileBottom from '../containers/connected_page_tile_bottom';

class PageTile extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
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
    return (
      <div className="page-tile">
        <ConnectedPageTileTop pageTree={this.props.pageTree} />
        <ConnectedPageTileBottom pageTree={this.props.pageTree} />
        <div className="tile-right"></div>
        <div className={ "collapse-open" + (this.props.pageTree.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>
      </div>
    );
  }
}

export default PageTile
