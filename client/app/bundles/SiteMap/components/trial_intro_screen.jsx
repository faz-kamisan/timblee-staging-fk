import React, { PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

class TrialIntroScreen extends React.Component {
  static propTypes = {
    introSlideNumber: PropTypes.number.isRequired
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



  handleClickOutside() {
    if(this.state.showDemo) {
      this.hideDemo()
    }
  }

  render() {
    var _this = this
    return (
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
    );
  }
}

export default enhanceWithClickOutside(TrialIntroScreen);
