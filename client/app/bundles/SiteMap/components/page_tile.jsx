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
    this.handleNameChange = this.handleNameChange.bind(this);
    this.enableNameChangeInput = this.enableNameChangeInput.bind(this);
    this.disableNameChangeInput = this.disableNameChangeInput.bind(this);
    this.state = { nameChangeDisabled: true, hover: false }
  }

  enableNameChangeInput(e) {
    this.setState({ nameChangeDisabled: false })
  }

  disableNameChangeInput(e) {
    this.setState({ nameChangeDisabled: true })
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
    this.props.onNameChange(this.props.pageTree.id, this.props.pageTree.section_id, name);
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

  componentDidUpdate(props, state) {
    if(!state.nameChangeDisabled) {
      $(this.refs.nameInput).focus();
    }
  }
  render() {
    if(this.props.childrenLength > 0) {
      return (
        <div className={"page-tile " + (((this.props.pageTree.level == 0) && (this.props.childrenLength % 2 == 0)) ? 'even-tree' : 'odd-tree') } onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} name={this.props.name} />
          <h1 className="tile-name">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.props.name}</div>
            <input className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' value = {this.props.name} onChange={this.handleNameChange} onBlur={this.disableNameChangeInput}></input>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
            <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            </div>
          </div>
          <div className={ "collapse-open" + (this.props.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>
        </div>
      );
    } else {
      return (
        <div className="page-tile" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber}  name={this.props.name} />
          <h1 className="tile-name">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.props.name}</div>
            <input className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' value = {this.props.name} onChange={this.handleNameChange} onBlur={this.disableNameChangeInput}></input>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
            <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PageTile
