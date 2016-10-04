import React, { PropTypes } from 'react';
import ConnectedComment from '../containers/connected_comment'

class UserSignupModal extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = { nameError: '', emailError: '', passwordError: '' }
    this.signup = this.signup.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  signup(e) {
    var _this = this
    $.ajax({
      url: '/users',
      method: 'post',
      dataType: 'JSON',
      data: { user: { full_name: this.refs.nameInput.value, email: this.refs.emailInput.value, password: this.refs.passwordInput.value } },
      error: (result) => {
        var errors = result.responseJSON
        this.setState({ nameError: (errors.full_name && errors.full_name.join('<br />')), emailError: (errors.email && errors.email.join('<br />')), passwordError: (errors.password && errors.password.join('<br />')) })
      },
      success: (result) => {
        window.location = "/sitemaps/" + this.props.sitemapId;
      }
    });
  }

  createMarkup(str) {
    return { __html: str }
  }

  render() {
    var _this = this;
    return (
      <div className="modal fade" id="user-signup-modal" tabIndex="-1" role="dialog" aria-labelledby="user-signup-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <p className="modal-message">Save and share your sitemap, and try timblee free for 30 days with no restrictions.</p>
            </div>
            <div className="modal-body">
              <p>
                No credit card required. Invite unlimited team members to try it out with  you.
              </p>
              <div className='signup-fields'>
                <input type='text' placeholder='Your name' ref='nameInput' className='form-control'></input>
                 <div className='error-div name-error' dangerouslySetInnerHTML={this.createMarkup(this.state.nameError)} />
                <input type='email' placeholder='Your work email' ref='emailInput' className='form-control'></input>
                <div className='error-div email-error' dangerouslySetInnerHTML={this.createMarkup(this.state.emailError)} />
                <input type='password' placeholder='Choose a password' ref='passwordInput' className='form-control'></input>
                 <div className='error-div password-error' dangerouslySetInnerHTML={this.createMarkup(this.state.passwordError)} />
              </div>
              <div className="modal-button text-center">
                <a href="#" className="btn btn-red btn-modal-open" onClick={this.signup}>SIGN UP FOR FREE</a>
              </div>
              <p>
                Already signed up? <a href='/log-in'>Log in here.</a>
              </p>
              <p>
                By signing up, you agree to our plain English <a href='javascript:void(0)'>terms.</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignupModal;
