import React, { PropTypes } from 'react';

class InviteUserBox extends React.Component {
  static propTypes = {
    sitemapId: PropTypes.number.isRequired,
    sharedUsers: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {customMessage: '', lastFinalisedMessage: '', messageEditorActivated: true}
    this.handleEmailShare = this.handleEmailShare.bind(this);
    this.deactivateMessageEditor = this.deactivateMessageEditor.bind(this);
    this.activateMessageEditor = this.activateMessageEditor.bind(this);
    this.afterTagAdded = this.afterTagAdded.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.cancelMessageEditing = this.cancelMessageEditing.bind(this);
    this.handleOnCustomMessageChange = this.handleOnCustomMessageChange.bind(this);
  }

  componentDidMount() {
    var _this = this
    $(this.refs.emails).tagit({
    afterTagAdded: function(event, ui) {
      _this.afterTagAdded(event, ui);
    }
    })
  }

  deactivateMessageEditor(e) {
    this.setState({ messageEditorActivated: false, lastFinalisedMessage: this.state.customMessage });
  }

  activateMessageEditor(e) {
    this.setState({ messageEditorActivated: true, customMessage: this.state.lastFinalisedMessage });
  }

  cancelMessageEditing(e) {
    this.setState({ customMessage: '', lastFinalisedMessage: '' });
  }

  afterTagAdded(event, ui) {
    var tagValue = $(ui.tag.find('span')[0]).html();
    if (!this.isEmail(tagValue)){
      $(this.refs.emails).tagit("removeTagByLabel", tagValue);
    }
  };

  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

  handleOnCustomMessageChange(e) {
    this.setState({customMessage: e.target.value})
  }

  handleEmailShare(e) {
    var emailsValue = this.refs.emails.value.trim()
    if(emailsValue.length > 0) {
      this.props.onShare(emailsValue.split(' '));
      $.ajax({
        url: '/sitemaps/' + this.props.sitemapId + '/share_via_email',
        method: 'post',
        dataType: 'JSON',
        data: { emails: emailsValue, custom_message: this.state.lastFinalisedMessage },
        error: (result) => {
          document.setFlash(result.responseText)
        }
      });
    }
  }

  showAllUsers(e) {
    $('.extra-shared-users').removeClass('hide');
    $(e.target).addClass('hide');
  }

  render() {
    var renderdsharedUsers = this.props.sharedUsers.map(function(user,index) {
      return(
        <li key={user.id} className={(index > 1 ? 'extra-shared-users hide' : '')}>
          {user.user_email}
          <span className="icon-save-circle"></span>
        </li>
      )
    })
    return (
      <div>
        <div key='upper'>
          <input type='text' name='emails' id='emails' ref='emails'></input>
        </div>
        <div className="already-emailed">
          { (this.props.sharedUsers.length > 0) &&
            <p>These people have already been emailed:</p>
          }
          <ul>
            {renderdsharedUsers}
          </ul>
          { (this.props.sharedUsers.length == 3) &&
            <a href="javascript:void(0)" id="show-others" onClick={this.showAllUsers}>+ 1 other</a>
          }
          { (this.props.sharedUsers.length > 3) &&
            <a href="javascript:void(0)" id="show-others" onClick={this.showAllUsers}>+ {this.props.sharedUsers.length - 2} others</a>
          }
        </div>
        { !this.state.messageEditorActivated &&
          <div key='lower' className="message-preview">
            <p>{this.state.customMessage}</p>
            <a onClick={this.activateMessageEditor}>Edit Message</a>
          </div>
        }
        { this.state.messageEditorActivated &&
          <div key='lower' className="comment-input">
            <textarea value={this.state.customMessage} placeholder='Include an optional personal message.' ref='customMessage' onChange={this.handleOnCustomMessageChange}></textarea>
            <div className="add-remove-comment">
              <a className="cursor add" onClick={this.deactivateMessageEditor}>Add message</a>
              <span className="or"> or</span>
              <a className="cursor cancel" onClick={this.cancelMessageEditing}> cancel</a>
            </div>
          </div>
        }
        <div className="bottom-btns text-center">
          <a href="#sitemap-share-preview-modal" data-dismiss="modal" data-toggle='modal' className="btn btn-grey btn-modal-open">Here's what they'll see</a>
          <button className='btn btn-pink-hover' data-dismiss="modal" onClick={this.handleEmailShare}>Send the email</button>
        </div>
      </div>
    );
  }
}

export default InviteUserBox;
