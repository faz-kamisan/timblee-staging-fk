import React, { PropTypes } from 'react';

class InviteUserBox extends React.Component {
  static propTypes = {
    sitemapId: PropTypes.number.isRequired
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
    this.setState({ customMessage: '', customMessage: this.state.lastFinalisedMessage });
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
    console.log(this.refs.emails.value)
    $.ajax({
      url: '/sitemaps/' + this.props.sitemapId + '/share_via_email',
      method: 'post',
      dataType: 'JSON',
      data: { emails: this.refs.emails.value, custom_message: this.state.lastFinalisedMessage },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
      }
    });
  }

  render() {
    return (
      <div>
        <div key='upper'>
          <label>Emails</label>
          <input type='text' name='emails' id='emails' ref='emails'></input>
        </div>
        { !this.state.messageEditorActivated &&
          <div key='lower'>
            <p>{this.state.customMessage}</p>
            <a onClick={this.activateMessageEditor}>Edit Message</a>
          </div>
        }
        { this.state.messageEditorActivated &&
          <div key='lower'>
            <textarea value={this.state.customMessage} placeholder='Include an optional personal message.' onChange={this.handleOnCustomMessageChange}></textarea>
            <a onClick={this.deactivateMessageEditor}>Add message</a>
            <span> or</span>
            <a onClick={this.cancelMessageEditing}> cancel</a>
          </div>
        }
        <button className='btn' onClick={this.handleEmailShare}>Send Email</button>
      </div>
    );
  }
}

export default InviteUserBox;
