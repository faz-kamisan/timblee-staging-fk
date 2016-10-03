import React, { PropTypes } from 'react';

class IntroductionScreens extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = { introSlideNumber: 1 }
    this.showNextSlide = this.showNextSlide.bind(this)
  }

  showNextSlide(e) {
    this.setState({introSlideNumber: (this.state.introSlideNumber + 1)})
  }

  render() {
    return (
      <div className="public-intro">
        <div className={"intro-box share-1" + (this.state.introSlideNumber == 1 ? '' : ' hide')}>
          <figure>
            <img alt=" " src="/assets/share-intro-1.png"></img>
          </figure>
          <p>Click on an individual page to add comments to that page</p>
          <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
        </div>

        <div className={"intro-box share-2" + (this.state.introSlideNumber == 2 ? '' : ' hide')}>
          <figure>
            <img alt=" " src="/assets/share-intro-2.png"></img>
          </figure>
          <p>Click on the comments icon above to view grouped comments and to add general comments</p>
          <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
        </div>

        <div className={"intro-box share-3" + (this.state.introSlideNumber == 3 ? '' : ' hide')}>
          <figure>
            <img alt=" " src="/assets/share-intro-3.png"></img>
          </figure>
          <p>To share this sitemap with others, copy and paste the URL from the browser bar and share it with them</p>
          <a href="javascript:void(0);" onClick={this.showNextSlide}>Got it</a>
        </div>
      </div>
    );
  }
}

export default IntroductionScreens;
