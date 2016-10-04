import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'

class PublicHeader extends React.Component {
  static propTypes = {
  };
  constructor(props) {
    super(props);
  }

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
        <div className="row">
          <div className="col-xs-4 col-xs-offset-2 text-center shared-details">
            <h6>Create a free account to save, share, comment, an to create more sitemaps.</h6>
          </div>
          <div className="col-xs-4 col-xs-offset-1 text-center">
            <a className='btn' data-toggle='modal' href='#user-signup-modal'>Create my free account</a>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicHeader;
