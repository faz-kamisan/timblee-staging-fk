import React, { PropTypes } from 'react';
import TrialIntroScreen from './trial_intro_screen';
import { traverse } from '../helpers/tree_helper'

class TrialHeader extends React.Component {
  componentDidMount() {
    var remainingTime = (15 * 60 * 1000) - ((new Date()) - new Date(this.props.createdAt))
    setTimeout(function() {
      $('#user-signup-modal').modal('show');
    }, remainingTime)
  }

  render() {
    var _this = this;
    return (
      <div className="react-trial-header">
        <a href="/log-in" className="logo-dark-trial">
          <img src="/assets/logo-dark.svg" alt=" "></img>
        </a>
        <div className="shared-details">
          <p>Create a free account to save, share, comment, and to create more sitemaps.</p>
          <a className='btn' data-toggle='modal' href='#user-signup-modal'>Create my free account</a>
        </div>
        <TrialIntroScreen />
      </div>
    );
  }
}

export default TrialHeader;
