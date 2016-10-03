import React, { PropTypes } from 'react';

class IntroductionScreenThree extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="intro-box share-3">
        <figure>
          <img alt=" " src="/assets/share-intro-3.png"></img>
        </figure>
        <p>To share this sitemap with others, copy and paste the URL from the browser bar and share it with them</p>
        <a href="javascript:void(0);">Got it</a>
      </div>
    );
  }
}

export default IntroductionScreenThree;
