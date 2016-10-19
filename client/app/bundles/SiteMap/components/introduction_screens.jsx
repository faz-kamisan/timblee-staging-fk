import React, { PropTypes } from 'react';

class IntroductionScreens extends React.Component {
  static propTypes = {
    introSlideNumber: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.setIntroSlideNumber = this.setIntroSlideNumber.bind(this);
    this.hideSecondScreenHandle = this.hideSecondScreenHandle.bind(this);
    this.state = { showSecondScreenHandle: true, showThirdScreenHandle: true }
  }

  hideSecondScreenHandle(e) {
    this.setState({ showSecondScreenHandle: false })
    this.props.setIntroSlideNumber(0)
  }

  setIntroSlideNumber(number) {
    this.props.setIntroSlideNumber(number)
  }

  render() {
    var _this = this
    return (
      <div className="public-intro">
        <div className="intro-box-2">
          <span className={ "hotspot " + (this.state.showSecondScreenHandle ? '' : 'hide')} onClick={function(e) { _this.setIntroSlideNumber(2) } }>
            <span className="pulse pulse-1"></span>
            <span className="pulse pulse-2"></span>
            <span className="pulse pulse-3"></span>
          </span>
          <div className={"intro-box share-2" + (this.props.introSlideNumber == 2 ? '' : ' hide')}>
            <figure>
              <img alt=" " src="/assets/share-intro-3.jpg"></img>
            </figure>
            <p>Click on the comments icon above to view grouped comments and to add general comments</p>
            <a href="javascript:void(0);" onClick={this.hideSecondScreenHandle}>Got it</a>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroductionScreens;
