import React, { PropTypes } from 'react';

class IntroductionScreens extends React.Component {
  static propTypes = {
    introSlideNumber: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.showNextSlide = this.showNextSlide.bind(this)
  }

  showNextSlide(e) {
    this.props.showNextSlide()
  }

  render() {
    return (
      <div className="public-intro">
        <div className="intro-box-2">
          <div className={"intro-box share-2" + (this.props.introSlideNumber == 2 ? '' : ' hide')}>
            <span className="hotspot"></span>
            <figure>
              <img alt=" " src="/assets/share-intro-2.png"></img>
            </figure>
            <p>Click on the comments icon above to view grouped comments and to add general comments</p>
            <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
          </div>
        </div>

        <div className="intro-box-3">
          <div className={"intro-box share-3" + (this.props.introSlideNumber == 3 ? '' : ' hide')}>
            <span className="hotspot"></span>
            <figure>
              <img alt=" " src="/assets/share-intro-3.png"></img>
            </figure>
            <p>To share this sitemap with others, copy and paste the URL from the browser bar and share it with them</p>
            <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
          </div>
        </div>

      </div>
    );
  }
}

export default IntroductionScreens;
