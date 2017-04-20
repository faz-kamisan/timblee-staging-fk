import React, { PropTypes } from 'react';
import State from './state'
class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    newSitemap: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    setSaving: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
    showSitemapShareModal: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleShareModalClick = this.handleShareModalClick.bind(this);
    this.handleNameInputBlur = this.handleNameInputBlur.bind(this);
    this.handleNameInputFocus = this.handleNameInputFocus.bind(this);
    this.handleMainHeaderToggle = this.handleMainHeaderToggle.bind(this);
    this.handleSitemapShareClick = this.handleSitemapShareClick.bind(this);
    this.toggleCommentState = this.toggleCommentState.bind(this);
    this.handleNameKeyPressed = this.handleNameKeyPressed.bind(this);
    this.state = { nameFocused: false, name: props.name, showMainHeader: true, commentSidebarOpen: false, maxLevelOnePages: 0 }
  }

  handleNameKeyPressed(e) {
    if(e.charCode == 13) {
      e.preventDefault()
      e.stopPropagation()
      this.handleNameInputBlur();
    }
  }

  handleMainHeaderToggle(e) {
    $('body').toggleClass('hide-header');
    this.setState({showMainHeader: !this.state.showMainHeader})
  }

  handleNameChange(event) {
    var name = event.target.value
    this.setState({name: name})
  }

  componentDidMount() {
    var _this = this;
    if(this.props.newSitemap) {
      this.handleNameInputFocus()
      setTimeout(function() {
        $(_this.refs.sitemapNameInput).focus()
      }, 1000)
    }
    var reactOuterWrapper = $('#react-app-outer-wrapper')
    $('.react-header .icon-invite-female').data('url', reactOuterWrapper.data('url'))
    $('.react-header .icon-invite-female').addClass(reactOuterWrapper.data('invite-permission-modal'))
  }

  handleNameInputBlur(e) {
    var _this = this
    this.setState({nameFocused: false})
    if(this.state.name != this.props.name) {
      $.ajax({
        url: '/sitemaps/' + this.props.id + '/rename',
        method: 'patch',
        dataType: 'json',
        data: { dont_show_flash: true, sitemap: { name: this.state.name } },
        error: (result) => {
          var name = _this.props.name
          document.setFlash(result.responseText)
          this.setState({name: name})
        },
        success: (result) => {
          this.props.setSaving(true)
          setTimeout(function() {
            _this.props.setSaving(false)
          }, 2000)
          this.props.onNameChange(_this.state.name);
        }
      });
    }
  }

  handleNameInputFocus(e) {
    this.setState({nameFocused: true})
  }

  handleSitemapShareClick(e) {
    this.props.showSitemapShareModal();
  }

  handleShareModalClick(e) {
    this.setState({maxLevelOnePages: Math.max(...this.props.sections.map(function(section) {return (section.pageTree && section.pageTree.children.filter(function (child) {  return child.state == 'active'  }).length)}))})
  }

  componentDidUpdate() {
    var _this = this
    if(this.state.nameFocused) {
      $(this.refs.sitemapNameInput).focus()
    }
  }

  toggleCommentState(e) {
    this.setState({commentSidebarOpen: !this.state.commentSidebarOpen})
    $('.sitemap-right-sidebar').toggleClass('open')
    $('.comment-list').toggleClass('open')
  }

  render() {
    var _this = this;
    var renderStates = ['In Progress', 'Review', 'Approved', 'On Hold'].map(function(state, index) {
      return(
        <li key={index} className={ (_this.props.state == state) ? 'active' : '' }>
          <i className="icon-save-circle"></i>
          <State state={state} id={_this.props.id} onStateChange={_this.props.onStateChange} setSaving={_this.props.setSaving} />
        </li>
      )
    })
    var renderUsers = this.props.business.users.slice(0,3).map(function(user, index) {
      return(
        <li key={user.id}>
          <img src={user.avatarUrl} />
        </li>
      )
    })
    var otherUsersLength = this.props.business.users.length - 3;
    return (
      <div className="react-header">
        <div className="logo-dark relative pull-left sitemap-back-link">
          <a href="/home">
            <img src="/assets/go-back.svg" className="go-back-link"></img>
          </a>
        </div>

        <div className="pull-left sitemap-name-div">
          <div className="sitemap-name-div">
            <input value = {this.state.name} onChange={this.handleNameChange} onBlur={this.handleNameInputBlur} className={"site-map-name site-map-name-input" + (this.state.nameFocused ? '' : ' hide')} ref='sitemapNameInput' onKeyPress={this.handleNameKeyPressed} />
            <h3 className={"site-map-name truncate " + (this.state.nameFocused ? ' hide' : '')} onClick={this.handleNameInputFocus} ref='nameEditor'>{this.state.name}</h3>
          </div>
        </div>

        <div className="state-status text-center pull-left">
          <h5>
            <span className={this.props.state}>
              {this.props.state}
              <i className="icon-caret"></i>
            </span>
            <ul className="state-drop-down">
              {renderStates}
            </ul>
          </h5>
        </div>

        <div className="saved-status pull-left">
          <span>
            { this.props.saving &&
              <div>
                <i className="icon-save-circle"></i> Saved
              </div>
            }
          </span>
        </div>

        <div className="canvas-switch">
          <ul>
            <li className="active">Sitemap</li>
            <li><a href={location.href.match(/(.*\/\d+)/)[0] + '/userflows'} >User Flow <span className="beta-tag">Beta</span></a></li>
          </ul>
        </div>

        <div className="toggle-header pull-right" onClick={this.handleMainHeaderToggle}>
          <div className={"inner-toggle " + (this.state.showMainHeader ? 'caret-up' : '')}>
            <i className="icon-caret"></i>
            {this.state.showMainHeader && <div>hide</div>}
            {!this.state.showMainHeader && <div>show</div>}
          </div>
        </div>

        <div className="toggle-comments-outer pull-right">
          <div className="toggle-comments">
            <a href="javascript:void(0)" className={"btn-toggle-comments" + (this.state.commentSidebarOpen ? ' active' : '')} onClick={this.toggleCommentState}>
              <span className="icon-comment"></span>
              Comments
              <span>click to toggle</span>
            </a>
          </div>
        </div>

        <div className="pull-right users-block">
          <div className="inner-user-block">
            { this.props.currentUser.isAdmin &&
              <span className="icon-invite-female user-invite cursor" data-remote={true}>
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
              </span>
            }
            <ul className='users-list'>
              {renderUsers}
            </ul>
            {(otherUsersLength > 1) &&
              <a className='other-users cursor'>
                + { otherUsersLength } others
              </a>
            }
            {(otherUsersLength == 1) &&
              <a className='other-users'>
                + { otherUsersLength } other
              </a>
            }
          </div>
        </div>

        <div className="pull-right share-sitemap-btn-div">
          <div className="share-sitemap-btn-div">
            <a href="javascript:void(0)" onMouseEnter={this.handleShareModalClick} className="btn btn-share action sitemap-share-modal-link" data-url={this.props.publicShareUrl} data-name={this.props.name} data-id={this.props.id} data-level-one-pages={this.state.maxLevelOnePages} data-shared-users={this.props.sharedUsers.map(function(user) { return(user.user_email) }).join(',')}>
             <span className="share-icon"></span> Share
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default Header;
