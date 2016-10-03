import React, { PropTypes } from 'react';

class IntroductionScreenTwo extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className="intro-box share-2">
        <figure>
          <img alt=" " src="/assets/share-intro-2.png"></img>
        </figure>
        <p>Click on the comments icon above to view grouped comments and to add general comments</p>
        <a href="javascript:void(0);">Got it</a>
      </div>
    );
  }
}

export default IntroductionScreenTwo;
