import React, { PropTypes } from 'react';

class IntroductionScreenOne extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="intro-box share-1">
        <figure>
          <img alt=" " src="/assets/share-intro-1.png"></img>
        </figure>
        <p>Click on an individual page to add comments to that page</p>
        <a href="javascript:void(0);">Got it</a>
      </div>
    );
  }
}

export default IntroductionScreenOne;
