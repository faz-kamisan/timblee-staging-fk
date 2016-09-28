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

  componentDidUpdate(e) {
    if(this.props.showForm) {
      $('.modal').modal('hide');
      $('#guest-info-modal').modal('show');
    }
  }

  render() {
    return (
      <div className="modal fade" id="guest-info-modal" tabIndex="-1" role="dialog" aria-labelledby="comment-delete-modalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="message">
                <span>To view or add sitemap comments, you need to add your name and email. This will let us notify you when someone responds to your comments.</span>
                <span>You will be able to add and view comments instantly.</span>
              </div>
              <div className='gurst-info-form'>
                {
                  this.state.errors &&
                  <div class='form-error'>
                    Please enter a valid name and email.
                  </div>
                }
                {
                  this.props.showForm &&
                  <form onSubmit={this.handleFormSubmit}>
                    <input type='text' placeholder='name' value={this.state.name} onChange={this.handleNameChange}  />
                    <input type='email' placeholder='email' value={this.state.email} onChange={this.handleEmailChange}  />
                    <button type='submit' className="btn btn-red btn-modal-open">Start adding and viewing comments</button>
                  </form>
                }
              </div>
              <div>
                Already signed up? <a href='/log-in'>Log in here</a>.
              </div>
            </div>
          </div>
        </div>
      </div>




    )
  }
}

export default GuestInfoFormModal;
