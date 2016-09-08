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
          }
        });
    } else {
      document.setFlash('There are errors in the form.')
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

  render() {
    return (
      <div className='react-modal'>
        {
          this.state.errors &&
          <div class='form-error'>
            'This form has errors in it.'
          </div>
        }
        {
          this.props.showForm &&
          <form onSubmit={this.handleFormSubmit}>
            <input type='text' placeholder='name' value={this.state.name} onChange={this.handleNameChange}  />
            <input type='email' placeholder='email' value={this.state.email} onChange={this.handleEmailChange}  />
            <button type='submit' value='Submit' />
          </form>
        }
      </div>
    )
  }
}

export default GuestInfoFormModal;
