import React, { PropTypes } from 'react';
import UrlParser from '../helpers/url_parser';
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
    var error = ((this.state.nameError.length > 0) || (this.state.emailError.length > 0) || (this.state.passwordError.length > 0));
    return (
      <div className="modal fade react-sign-up" id="user-signup-modal" tabIndex="-1" role="dialog" aria-labelledby="user-signup-modalLabel">
        <div className={"modal-body user-entry registration-page text-center" +  (error ? " modal-with-error": "" )}>
          <div className="logo">
            <img className="logo-inner" src="/assets/Timblee-icon.svg"></img>
          </div>
          <h1 className="modal-heading">
            Save and share your sitemap, and try timblee free for <br/> 30 days with no restrictions.
          </h1>
          <p className="small">
            No credit card required. Invite unlimited team <br/> members to try it out with you.
          </p>
          <div className="user-form">
            <div className="form-group">
              <input type='text' placeholder='Your name' ref='nameInput' className='form-control'></input>
              <div className='error-div name-error' dangerouslySetInnerHTML={this.createMarkup(this.state.nameError)} />
            </div>
            <div className="form-group">
              <input type='email' placeholder='Your work email' ref='emailInput' className='form-control' defaultValue={UrlParser.getQueryVariable('email') || ''}></input>
              <div className='error-div email-error' dangerouslySetInnerHTML={this.createMarkup(this.state.emailError)} />
            </div>
            <div className="form-group">
              <input type='password' placeholder='Choose a password' ref='passwordInput' className='form-control'></input>
              <div className='error-div password-error' dangerouslySetInnerHTML={this.createMarkup(this.state.passwordError)} />
            </div>
            <div className="form-group">
              <a href="javascript:void(0);" className="btn btn-pink btn-block" onClick={this.signup}>SIGN UP FOR FREE </a>
            </div>
            <p className="go-to-login">
              Already signed up? <a href='/log-in' className="link"> Log in here.</a>
            </p>
            <p className="go-to-terms">By signing up, you agree to our plain English <a href='http://timblee.io/terms' className="link">terms.</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignupModal;
