import React, { PropTypes } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

class IntroductionScreensOne extends React.Component {
  static propTypes = {
    introSlideNumber: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.setIntroSlideNumber = this.setIntroSlideNumber.bind(this);
    this.hideFirstScreenHandle = this.hideFirstScreenHandle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { showFirstScreenHandle: true }
  }

  hideFirstScreenHandle(e) {
    this.setState({ showFirstScreenHandle: false })
    this.props.setIntroSlideNumber(0)
  }

  setIntroSlideNumber(number) {
    this.props.setIntroSlideNumber(number)
  }

  handleClickOutside() {
    if(this.state.showFirstScreenHandle && this.props.introSlideNumber == 1) {
      this.hideFirstScreenHandle()
    }
  }

  render() {
    var _this = this
    return (
      <div className="intro-box-1">
        <span className={ "hotspot " + (this.state.showFirstScreenHandle ? '' : 'hide')} onClick={function(e) { _this.setIntroSlideNumber(1) } }>
          <span className="pulse pulse-1"></span>
          <span className="pulse pulse-2"></span>
          <span className="pulse pulse-3"></span>
        </span>
        <div className={"intro-box share-1" + (this.props.introSlideNumber == 1 ? '' : ' hide')}>
          <figure>
            <img alt=" " src="/assets/share-intro-1.jpg"></img>
          </figure>
          <p>Click on an individual page to add comments to that page</p>
          <a href="javascript:void(0);" onClick={this.hideFirstScreenHandle}>Got it</a>
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(IntroductionScreensOne);
