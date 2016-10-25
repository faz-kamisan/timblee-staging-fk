import React, { PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import ConnectedPageTileTop from '../containers/connected_page_tile_top';
import ConnectedPageTileBottom from '../containers/connected_page_tile_bottom';
import ConnectedIntroductionScreenOne from '../containers/connected_introduction_screen_one';

class PageTile extends React.Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired,
    sitemapNumber: PropTypes.string,
    name: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    childrenLength: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    onCollapsedChanged: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleOnCollapsedChanged = this.handleOnCollapsedChanged.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.enableNameChangeInput = this.enableNameChangeInput.bind(this);
    this.disableNameChangeInput = this.disableNameChangeInput.bind(this);
    this.closeOverLay = this.closeOverLay.bind(this);
    this.openOverLay = this.openOverLay.bind(this);
    this.setSelectedPage = this.setSelectedPage.bind(this);
    this.checkUserOrGuest = this.checkUserOrGuest.bind(this);
    this.showLinkedSection = this.showLinkedSection.bind(this);
    this.addSameLevelNextPage = this.addSameLevelNextPage.bind(this);
    this.addSubPage = this.addSubPage.bind(this);
    this.addFaded = this.addFaded.bind(this);
    this.removeFaded = this.removeFaded.bind(this);
    this.handeNameChange = this.handeNameChange.bind(this);
    this.nameFormatter = this.nameFormatter.bind(this);
    this.state = { nameChangeDisabled: !props.pageTree.newRecord, hover: false, showOverLay: false, name: this.props.name, originalName: this.props.name, counter: 0 }
  }

  handleClickOutside() {
    if(this.state.showOverLay) {
      this.setState({ showOverLay: false });
    }
  }

  enableNameChangeInput(e) {
    if(!(this.props.pageTree.alt_section_id && (this.props.level == 0))) {
      this.setState({ nameChangeDisabled: false })
      this.refs.nameInput.focus();
    }
  }

  handeNameChange(e) {
    if(e.charCode == 13) {
      e.preventDefault()
      e.stopPropagation()
      this.disableNameChangeInput();
    }
  }

  disableNameChangeInput(e) {
    var _this = this;
    var name = this.refs.nameInput.value
    if((name != this.props.name) && name.length > 0) {
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

  addSameLevelNextPage(e) {
    var timeStamp = new Date();
    var _this = this;
    $.ajax({
      url: '/pages/',
      method: 'post',
      dataType: 'JSON',
      data: { page: { page_type_id: this.props.pageType.id, parent_id: this.props.pageTree.parentId, sitemap_id: this.props.sitemapId, name: this.props.pageType.name, position: (this.props.pageTree.position + 1), section_id: this.props.activeSectionId } },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      success: (result) => {
        var onPageIdUpdate = _this.props.onPageIdUpdate
        var pageTree = _this.props.pageTree
        onPageIdUpdate(timeStamp, _this.props.activeSectionId, result.id)
      },
      complete: (result) => {
        _this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
    this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.parentId, (this.props.pageTree.position), timeStamp, this.props.maxPageUid);
    this.removeFaded();
  }

  addSubPage(e) {
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
        onPageIdUpdate(timeStamp, _this.props.activeSectionId, result.id)
      },
      complete: (result) => {
        _this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
    this.props.onPageTypeDrop(this.props.activeSectionId, this.props.pageType, this.props.pageTree.id, 'begining', timeStamp, this.props.maxPageUid);
    this.removeFaded();
  }

  checkUserOrGuest(e) {
    if(this.props.currentUser || this.props.currentGuest) {
      this.props.setSelectedPage(this.props.pageTree)
      $('#page-comments-modal').modal('show')
    } else {
      this.props.setShowGuestInfoForm(true)
      $('.modal').modal('hide');
      $('#guest-info-modal').modal('show');
    }
  }

  setSelectedPage(e) {
    this.props.pageTree.tempLevel = this.props.level
    this.props.setSelectedPage(this.props.pageTree)
  }

  closeOverLay(e) {
    this.setState({showOverLay: false})
  }

  openOverLay(e) {
    this.setState({showOverLay: true, counter: (this.state.counter + 1)})
  }

  mouseOver(e) {
    this.setState({hover: true});
    if(!this.props.pageTree.footer) {
      this.addFaded()
    }
  }

  mouseOut(e) {
    this.setState({hover: false});
    if(!this.props.pageTree.footer) {
      this.removeFaded()
    }
  }

  addFaded() {
    $(this.refs.pageTile).addClass('not-faded');
    $('.page-tile').not($(this.refs.pageTile)).addClass('faded');
    $(this.refs.pageTile).parents('.parent.to-be-not-faded').addClass('not-faded');
    $(this.refs.pageTile).parents('.child-page').siblings().addClass('faded')
    $(this.refs.pageTile).parents('.child-page').siblings().find('.child-page').addClass('faded')
    $('.parent.to-be-faded').addClass('faded')
    $(this.refs.pageTile).parents('.parent.to-be-faded').addClass('faded');
    $(this.refs.pageTile).closest('.child-page').siblings().find('.parent.to-be-faded').addClass('faded')
    $(this.refs.pageTile).siblings('.parent.to-be-faded').addClass('faded');
    $(this.refs.pageTile).siblings('.parent').find('.parent.to-be-faded').addClass('faded');
    $('.page-container').not($(this.refs.pageTile).parents('.page-container')).addClass('faded')
    $('.page-container.to-be-faded').addClass('faded')
  }

  removeFaded() {
    $(this.refs.pageTile).removeClass('not-faded');
    $('.page-tile').not($(this.refs.pageTile)).removeClass('faded');
    $(this.refs.pageTile).parents('.parent.to-be-not-faded').removeClass('not-faded');
    $('.child-page').removeClass('faded')
    $('.parent.to-be-faded').removeClass('faded')
    $(this.refs.pageTile).parents('.parent.to-be-faded').removeClass('faded');
    $(this.refs.pageTile).siblings('.parent.to-be-faded').removeClass('faded');
    $(this.refs.pageTile).siblings('.parent').find('.parent.to-be-faded').addClass('faded');
    $('.page-container').removeClass('faded');
  }

  handleOnCollapsedChanged(e) {
    this.props.onCollapsedChanged(this.props.pageTree.id, this.props.pageTree.section_id)
  }

  showLinkedSection(e) {
    this.props.changeActiveSectionId(this.props.pageTree.alt_section_id)
  }

  nameFormatter() {
    return(this.props.name.length > 24 ? (this.props.name.substr(0, 24) + '...') : this.props.name)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.nameChangeDisabled && !this.state.nameChangeDisabled) {
      this.refs.nameInput.focus();
    }
  }

  componentDidMount() {
    var _this = this;
    document.moveCaretToEnd(this.refs.nameInput);
    $('.modal').on('hidden.bs.modal', function () {
      _this.setState({showOverLay: false})
    });
    if(!this.state.nameChangeDisabled) {
      this.enableNameChangeInput()
    }
  }

  render() {
    if(this.props.childrenLength > 0) {
      return (
        <div className={"page-tile " + (((this.props.level == 0) && (this.props.childrenLength % 2 == 0)) ? 'even-tree' : 'odd-tree') + (((this.props.level > 7) && (this.props.pageTree.alt_section_id)) ? " level-with-section" : "") } onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} ref='pageTile'>
          { this.props.publicShare && (this.props.level == 0) &&
            <ConnectedIntroductionScreenOne />
          }
          { !this.props.isDragging && !this.props.publicShare &&
            <div style={{zIndex: 100}}>
              <div className="right-button-div">
                <div className='right-button' onClick={this.addSameLevelNextPage}>
                  <div className="collapse-open collapse-close"></div>
                  Add same level page
                </div>
              </div>
              { !(this.props.pageTree.alt_section_id && (this.props.pageTree.alt_section_id != this.props.activeSectionId)) &&
                <div className="bottom-button-div">
                  <div className='bottom-button' onClick={this.addSubPage}>
                    <div className="collapse-open collapse-close"></div>
                    Add sub page
                  </div>
                </div>
              }
            </div>
          }
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} name={this.props.name} level={this.props.level} />
          <div className="tile-top-data">
            <h1 className="tile-name">
              <span className="tile-number">{this.props.sitemapNumber}</span>
            </h1>
            { this.props.pageTree.alt_section_id && !(this.props.level == 0) &&
              <span className="section-tag" onClick={this.showLinkedSection}>
                section
                <img src="/assets/link.png" alt=" "></img>
              </span>
            }
          </div>
          <h1 className="tile-name-edit">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.nameFormatter()}</div>
            <textarea className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' defaultValue={this.props.name} onBlur={this.disableNameChangeInput} onKeyPress={this.handeNameChange}></textarea>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} commentsLength={this.props.pageTree.comments.length} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          { !((this.props.level == 0) && this.props.pageTree.alt_section_id) &&
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
                    <span className="icon-page-comments tile-icons" onClick={this.checkUserOrGuest}>
                      <span className="card-tooltip">View Comments</span>
                    </span>
                  </li>
                }
              </ul>
            </div>
          }
          { !((this.props.level == 0) && this.props.pageTree.alt_section_id) &&
            <div className={"card-overlay" + (this.state.showOverLay ? ' overlay-in' : '')}>
              <div className="close-card-overlay">
                <a href="javascript:void(0)" className="icon-close" onClick={this.closeOverLay}></a>
              </div>
              { !this.props.trial &&
                <a href="javascript:void(0)" className="icon-page-comments" onClick={this.checkUserOrGuest} data-toggle='modal'>
                  <span className="card-tooltip">View Comments</span>
                </a>
              }
              <a href="#page-change-modal" className="icon-page-change" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">Change Page</span>
              </a>
              {
                !(this.props.level == 0) && !this.props.pageTree.alt_section_id &&
                <a href="#new-section-modal" className="icon-page-new" onClick={this.setSelectedPage} data-toggle='modal'>
                  <span className="card-tooltip">New Section</span>
                </a>
              }
              {
                (!(this.props.level == 0) || (this.props.pageTree.footer)) &&
                <a href="#delete-page-modal" className="icon-page-delete" onClick={this.setSelectedPage} data-toggle='modal'>
                  <span className="card-tooltip">Delete Page</span>
                </a>
              }
            </div>
          }
          {((this.props.level > 0) && (!this.props.pageTree.alt_section_id)) && <div className={ "collapse-open" + (this.props.collapsed ? ' collapse-close' : '') } onClick={this.handleOnCollapsedChanged}></div>}
        </div>
      );
    } else {
      return (
        <div className={ "page-tile " + (((this.props.level > 7) && (this.props.pageTree.alt_section_id)) ? " level-with-section" : "" )} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} ref='pageTile'>
          { this.props.publicShare && (this.props.level == 0) &&
            <ConnectedIntroductionScreenOne />
          }
          { !this.props.isDragging && !this.props.publicShare &&
            <div>
              <div className="right-button-div">
                <div className='right-button' onClick={this.addSameLevelNextPage}>
                  <div className="collapse-open collapse-close"></div>
                  Add same level page
                </div>
              </div>
              { !(this.props.pageTree.alt_section_id && (this.props.pageTree.alt_section_id != this.props.activeSectionId)) &&
                <div className="bottom-button-div">
                  <div className='bottom-button' onClick={this.addSubPage}>
                    <div className="collapse-open collapse-close"></div>
                    Add sub page
                  </div>
                </div>
              }
            </div>
          }
          <ConnectedPageTileTop pageTree={this.props.pageTree} sitemapNumber={this.props.sitemapNumber} name={this.props.name} level={this.props.level} />
          <div className="tile-top-data">
            <h1 className="tile-name">
              <span className="tile-number">{this.props.sitemapNumber}</span>
            </h1>
            { this.props.pageTree.alt_section_id && !(this.props.level == 0) &&
              <span className="section-tag" onClick={this.showLinkedSection}>
                section
                <img src="/assets/link.png" alt=" "></img>
              </span>
            }
          </div>
          <h1 className="tile-name-edit">
            <div onClick={this.enableNameChangeInput} className={this.state.nameChangeDisabled ? '' : 'hide'}> {this.nameFormatter()}</div>
            <textarea className={"form-control" + (this.state.nameChangeDisabled ? ' hide' : '') } ref='nameInput' defaultValue={this.props.name} onBlur={this.disableNameChangeInput}  onKeyPress={this.handeNameChange}></textarea>
          </h1>
          <ConnectedPageTileBottom pageTree={this.props.pageTree} commentsLength={this.props.pageTree.comments.length} />
          <div className={ "tile-right " + this.props.pageTree.pageType.icon_name }>
          </div>
          { !((this.props.level == 0) && this.props.pageTree.alt_section_id) &&
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
                    <span className="icon-page-comments tile-icons" onClick={this.checkUserOrGuest}>
                      <span className="card-tooltip">View Comments</span>
                    </span>
                  </li>
                }
              </ul>
            </div>
          }
          { !((this.props.level == 0) && this.props.pageTree.alt_section_id) &&
            <div className={"card-overlay" + (this.state.showOverLay ? ' overlay-in' : '')}>
              <div className="close-card-overlay">
                <a href="javascript:void(0)" className="icon-close" onClick={this.closeOverLay}></a>
              </div>
              { !this.props.trial &&
                <a href="javascript:void(0)" className="icon-page-comments" onClick={this.checkUserOrGuest} data-toggle='modal'>
                  <span className="card-tooltip">View Comments</span>
                </a>
              }
              <a href="#page-change-modal" className="icon-page-change" onClick={this.setSelectedPage} data-toggle='modal'>
                <span className="card-tooltip">Change Page</span>
              </a>
              {
                !(this.props.level == 0) && !this.props.pageTree.alt_section_id &&
                <a href="#new-section-modal" className="icon-page-new" onClick={this.setSelectedPage} data-toggle='modal'>
                  <span className="card-tooltip">New Section</span>
                </a>
              }
              {
                (!(this.props.level == 0) || (this.props.pageTree.footer)) &&
                <a href="#delete-page-modal" className="icon-page-delete" onClick={this.setSelectedPage} data-toggle='modal'>
                  <span className="card-tooltip">Delete Page</span>
                </a>
              }
            </div>
          }
        </div>
      );
    }
  }
}

export default enhanceWithClickOutside(PageTile)
