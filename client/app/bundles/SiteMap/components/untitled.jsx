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