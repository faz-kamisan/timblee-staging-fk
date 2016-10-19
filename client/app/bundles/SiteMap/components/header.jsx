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
    this.handleNameInputBlur = this.handleNameInputBlur.bind(this);
    this.handleNameInputFocus = this.handleNameInputFocus.bind(this);
    this.handleMainHeaderToggle = this.handleMainHeaderToggle.bind(this);
    this.handleSitemapShareClick = this.handleSitemapShareClick.bind(this);
    this.toggleCommentState = this.toggleCommentState.bind(this);
    this.handleNameKeyPressed = this.handleNameKeyPressed.bind(this);
    this.state = { nameFocused: false, name: props.name, showMainHeader: true, commentSidebarOpen: false }
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
      $(this.refs.sitemapNameInput).focus()
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
        dataType: 'script',
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
    var otherUsersLength = this.props.business.users.length - 3
    return (
      <div className="react-header">
        <div className="row">
          <div className="col-xs-5">
            <div className="row">
              <div className="col-xs-9">
                <span className="logo-dark relative">
                  <a href="/home">
                    <img src="/assets/go-back.svg" className="go-back-link"></img>
                  </a>
                </span>
                <input value = {this.state.name} onChange={this.handleNameChange} onBlur={this.handleNameInputBlur} className={"site-map-name site-map-name-input" + (this.state.nameFocused ? '' : ' hide')} ref='sitemapNameInput' onKeyPress={this.handleNameKeyPressed} />
                <h3 className={"site-map-name truncate " + (this.state.nameFocused ? ' hide' : '')} onClick={this.handleNameInputFocus} ref='nameEditor'>{this.state.name}</h3>
              </div>
              <div className="col-xs-3 state-status text-center">
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
            </div>
          </div>
          <div className="col-xs-2 saved-status">
            <span>
              { this.props.saving &&
                <div>
                  <i className="icon-save-circle"></i> Saved
                </div>
              }
            </span>
          </div>
          <div className="col-xs-5">
            <div className="pull-left">
              <a href="#sitemap-share-modal" data-toggle="modal" className="btn btn-share" onClick={this.handleSitemapShareClick}>
               <span className="share-icon"></span>   Share
              </a>
            </div>
            <div className="toggle-comments">
              <a href="javascript:void(0)" className={"btn-toggle-comments" + (this.state.commentSidebarOpen ? ' active' : '')} onClick={this.toggleCommentState}>
                <span className="icon-comment"></span>
                Comments
                <span>click to toggle</span>
              </a>
            </div>
            <div className="pull-left users-block">
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
        </div>
        <div className="toggle-header" onClick={this.handleMainHeaderToggle}>
          <div className={this.state.showMainHeader ? 'caret-up' : ''}>
            <i className="icon-caret"></i>
          </div>
          {this.state.showMainHeader && <div>hide</div>}
          {!this.state.showMainHeader && <div>show</div>}
        </div>
      </div>
    );
  }
}

export default Header;
