import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'

class TrialHeader extends React.Component {
  static propTypes = {
  };
  constructor(props) {
    super(props);
    this.state = { showDemo: false, showDemoHandle: true }
    this.hideDemo = this.hideDemo.bind(this);
    this.showDemo = this.showDemo.bind(this);
  }

  hideDemo() {
    this.setState({showDemo: false, showDemoHandle: false});
  }


  showDemo() {
    this.setState({showDemo: true});
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
        <a href="/log-in" className="logo-dark-trial">
          <img src="/assets/logo-dark.svg" alt=" "></img>
        </a>
        <div className="shared-details">
          <p>Create a free account to save, share, comment, and to create more sitemaps.</p>
          <a className='btn' data-toggle='modal' href='#user-signup-modal'>Create my free account</a>
        </div>
        <div className={"intro-box-trial " + (this.state.showDemo ? '' : 'hide-demo')}>
          { this.state.showDemoHandle &&
            <span className="hotspot" onClick={this.showDemo}>
              <span className="pulse pulse-1"></span>
              <span className="pulse pulse-2"></span>
              <span className="pulse pulse-3"></span>
            </span>
          }
          {this.state.showDemo &&
            <div className="intro-box">
              <figure>
                <img alt=" " src="/assets/Intro1.png"></img>
              </figure>
              <p>Drag and drop page tiles to build your sitemap fast.</p>
              <a href="javascript:void(0);" onClick={this.hideDemo}>Got it</a>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default TrialHeader;
