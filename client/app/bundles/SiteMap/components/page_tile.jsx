import React, { PropTypes } from 'react';
import ConnectedPageTileTop from '../containers/connected_page_tile_top';
import ConnectedPageTileBottom from '../containers/connected_page_tile_bottom';

class PageTile extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    childrenLength: PropTypes.number.isRequired,
    onCollapsedChanged: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleOnCollapsedChanged = this.handleOnCollapsedChanged.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.state = {hover: false, showOverLay: true}
  }

  mouseOver(e) {
    this.setState({hover: true});
  }

  mouseOut(e) {
    this.setState({hover: false});
  }

  handleOnCollapsedChanged(e) {
    this.props.onCollapsedChanged(this.props.pageTree.id, this.props.pageTree.section_id)
  }
  render() {
    if(this.props.childrenLength > 0) {
      return (
        <div className={"page-tile " + (((this.props.pageTree.level == 0) && (this.props.childrenLength % 2 == 0)) ? 'even-tree' : 'odd-tree') } onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} name={this.props.name} />
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            <ul className="tile-more">
              <li className="first-item">
                <span className="more-option tile-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>    
              </li>
              <li className="second-item">
                <span className="icon-page-comments tile-icons"></span>    
              </li>
            </ul>
          </div>
          { this.state.showOverLay &&
            <div className="card-overlay">
              <div className="close-card-overlay">
                <a href="#" className="icon-close"></a>  
              </div>
              <a href="#" className="icon-page-comments"></a>
              <a href="#" className="icon-page-change"></a>
              <a href="#" className="icon-page-new"></a>
              <a href="#" className="icon-page-delete"></a>
            </div>
          }
          <div className={ "collapse-open" + (this.props.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>
        </div>
      );
    } else {
      return (
        <div className="page-tile" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber}  name={this.props.name} />
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            <ul className="tile-more">
              <li className="first-item">
                <span className="more-option tile-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>    
              </li>
              <li className="second-item">
                <span className="icon-page-comments tile-icons"></span>    
              </li>
            </ul>
          </div>
          { this.state.showOverLay &&
            <div className="card-overlay">
              <div className="close-card-overlay">
                <a href="#" className="icon-close"></a>  
              </div>
              <a href="#" className="icon-page-comments"></a>
              <a href="#" className="icon-page-change"></a>
              <a href="#" className="icon-page-new"></a>
              <a href="#" className="icon-page-delete"></a>
            </div>
          }
        </div>
      );
    }
  }
}

export default PageTile
