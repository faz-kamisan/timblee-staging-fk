import React, { PropTypes } from 'react';
import ConnectedPageTileTop from '../containers/connected_page_tile_top';
import ConnectedPageTileBottom from '../containers/connected_page_tile_bottom';

class PageTile extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string,
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
    this.closeOverLay = this.closeOverLay.bind(this);
    this.openOverLay = this.openOverLay.bind(this);
    this.setSelectedPage = this.setSelectedPage.bind(this);
    this.state = { nameChangeDisabled: !props.pageTree.newRecord, hover: false, showOverLay: false, name: this.props.name, originalName: this.props.name, counter: 0 }
  }

  enableNameChangeInput(e) {
    this.setState({ nameChangeDisabled: false })
  }

  disableNameChangeInput(e) {
    var _this = this;
    var name = this.state.name
    if(name.length > 0) {
      $.ajax({
        url: '/pages/' + this.props.pageTree.id,
        method: 'put',
        dataType: 'JSON',
        data: { page: { name: name } },
        error: (result) => {
          document.setFlash(result.responseText)
        },
        success: (result) => {
          this.props.setSaving(true)
          setTimeout(function() {
            _this.props.setSaving(false)
          }, 2000)
        }
      });
      this.props.onNameChange(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id, name);

      if(this.props.pageTree.newRecord) {
        this.props.updatePagePersitence(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id)
      } else {
        this.setState({ nameChangeDisabled: true })
      }
    } else {
      if(this.props.pageTree.newRecord) {
        this.props.updatePagePersitence(this.props.pageTree.id, this.props.pageTree.footer, this.props.pageTree.section_id)
      } else {
        this.setState({name: this.state.originalName, nameChangeDisabled: true })
      }
    }
  }

  setSelectedPage(e) {
    this.props.setSelectedPage(this.props.pageTree)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.nameChangeDisabled && !this.state.nameChangeDisabled) {
      this.refs.nameInput.focus();
    }
  }

  handleNameChange(event) {
    var name = event.target.value
    this.setState({name: name})
  }

  closeOverLay(e) {
    this.setState({showOverLay: false})
  }

  openOverLay(e) {
    this.setState({showOverLay: true, counter: (this.state.counter + 1)})
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

  componentDidMount() {
    var _this = this;
    $('.page-change-modal').on('hidden.bs.modal', function () {
      _this.setState({showOverLay: false})
    });
    if(this.props.pageTree.newRecord) {
      this.refs.nameInput.focus();
    }
  }

  render() {
    if(this.props.childrenLength > 0) {
      return (
        <div className={"page-tile " + (((this.props.pageTree.level == 0) && (this.props.childrenLength % 2 == 0)) ? 'even-tree' : 'odd-tree') } onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} ref='pageTile'>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} name={this.props.name} />
          <h1 className="tile-name-edit">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.props.name}</div>
            <textarea className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' value = {this.state.name} onChange={this.handleNameChange} onBlur={this.disableNameChangeInput} tabindex="0"></textarea>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            <ul className="tile-more">
              { !this.props.publicShare &&
                <li className="first-item">
                  <span className="more-option tile-icons" onClick={this.openOverLay}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </li>
              }
              { !this.props.trial &&
                <li className="second-item">
                  <span className="icon-page-comments tile-icons" onClick={this.setSelectedPage} data-toggle='modal' data-target='#page-comments-modal'>
                    <span className="card-tooltip">View Comments</span>
                  </span>
                </li>
              }
            </ul>
          </div>
          <div className={"card-overlay" + (this.state.showOverLay ? ' overlay-in' : '')}>
            <div className="close-card-overlay">
              <a href="javascript:void(0)" className="icon-close" onClick={this.closeOverLay}></a>
            </div>
            { !this.props.trial &&
              <a href="#page-comments-modal" className="icon-page-comments" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">View Comments</span>
              </a>
            }
            <a href="#page-change-modal" className="icon-page-change" onClick={this.setSelectedPage} data-toggle='modal'>
              <span className="card-tooltip">Change Page</span>
            </a>
            {
              (this.props.pageTree.parentId != null) &&
              <a href="#new-section-modal" className="icon-page-new" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">New Section</span>
              </a>
            }
            {
              ((this.props.pageTree.parentId != null) || (this.props.pageTree.footer)) &&
              <a href="#delete-page-modal" className="icon-page-delete" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">Delete Page</span>
              </a>
            }
          </div>
          {this.props.pageTree.parentId && <div className={ "collapse-open" + (this.props.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>}
        </div>
      );
    } else {
      return (
        <div className="page-tile" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber}  name={this.props.name} />
          <h1 className="tile-name-edit">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.props.name}</div>
            <textarea className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' value = {this.state.name} onChange={this.handleNameChange} onBlur={this.disableNameChangeInput}></textarea>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          <div className={ "tile-right-hover " + (this.state.hover ? 'hovered' : '') }>
            <ul className="tile-more">
              { !this.props.publicShare &&
                <li className="first-item">
                  <span className="more-option tile-icons" onClick={this.openOverLay}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </li>
              }
              { !this.props.trial &&
                <li className="second-item">
                  <span className="icon-page-comments tile-icons" onClick={this.setSelectedPage} data-toggle='modal' data-target='#page-comments-modal'>
                    <span className="card-tooltip">View Comments</span>
                  </span>
                </li>
              }
            </ul>
          </div>
          <div className={"card-overlay" + (this.state.showOverLay ? ' overlay-in' : '')}>
            <div className="close-card-overlay">
              <a href="javascript:void(0)" className="icon-close" onClick={this.closeOverLay}></a>
            </div>
            { !this.props.trial &&
              <a href="#page-comments-modal" className="icon-page-comments" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">View Comments</span>
              </a>
            }
            <a href="#page-change-modal" className="icon-page-change" onClick={this.setSelectedPage} data-toggle='modal'>
              <span className="card-tooltip">Change Page</span>
            </a>
            {
              (this.props.pageTree.parentId != null) &&
              <a href="#new-section-modal" className="icon-page-new" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">New Section</span>
              </a>
            }
            {
              ((this.props.pageTree.parentId != null) || (this.props.pageTree.footer)) &&
              <a href="#delete-page-modal" className="icon-page-delete" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">Delete Page</span>
              </a>
            }
          </div>
        </div>
      );
    }
  }
}

export default PageTile
