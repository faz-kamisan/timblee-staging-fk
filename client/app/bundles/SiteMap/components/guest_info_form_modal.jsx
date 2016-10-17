import React, { PropTypes } from 'react';

class GuestInfoFormModal extends React.Component {
  static propTypes = {
    showForm: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {name: '', email: '', errors: false}
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if(this.valid(this.state.name, this.state.email)) {
      this.props.onFormSubmit(this.state.name, this.state.email)
      $.ajax({
          url: '/guests/',
          method: 'post',
          dataType: 'JSON',
          data: { name: this.state.name, email: this.state.email },
          error: (result) => {
            document.setFlash(result.responseText)
          },
          success: (result) => {
            $('#guest-info-modal').modal('hide');
          }
        });
    } else {
      this.setState({errors: true})
    }
  }

  valid(name, email) {
    var nameIsValid = name.trim().length > 0
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailIsValid = emailRegex.test(email.trim());
    return nameIsValid && emailIsValid
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  // componentDidUpdate(e) {
  //   if(this.props.showForm) {
  //     $('.modal').modal('hide');
  //     $('#guest-info-modal').modal('show');
  //   }
  // }

  render() {
    return (
      <div className="modal fade guest-modal" id="guest-info-modal" tabIndex="-1" role="dialog" aria-labelledby="comment-delete-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body user-entry text-center">
              <div className="logo">
                <img className="logo-inner" src="/assets/Timblee-icon.svg"></img>
              </div>
              <h1 className="modal-heading">
                To view or add sitemap comments, you need to <br/> add your name and email. This will let us notify <br/> you when someone responds to your <br/> comments.
              </h1>
              <p className="small">You will be able to add and view comments instantly.</p>
              <div className='gurst-info-form user-form'>
                {
                  this.state.errors &&
                  <div className='form-error'>
                    Please enter a valid name and email.
                  </div>
                }
                {
                  this.props.showForm &&
                  <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                      <input className="form-control" type='text' placeholder='Your name' value={this.state.name} onChange={this.handleNameChange}  />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type='email' placeholder='Your email' value={this.state.email} onChange={this.handleEmailChange}  />
                    </div>
                    <div className="form-group">
                      <button type='submit' className="btn btn-pink btn-block">Start adding and viewing comments</button>
                    </div>
                  </form>
                }
              </div>
              <div className="go-to-login text-center">
                Already signed up? <a href='/log-in' className="link">Log in here</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GuestInfoFormModal;
