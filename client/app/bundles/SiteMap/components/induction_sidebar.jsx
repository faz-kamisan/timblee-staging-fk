import React, { PropTypes } from 'react';

class InductionSidebar extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className='sitemap-induction-sidebar'>
        <div className='general-comments'>
          <h2 className="comment-type-heading">
            Induction
          </h2>
          <ul>
            <li>
              <p>Click on an individual page to add comments to that <br /> page</p>
              <figure>
                <img alt=" " src="/assets/share-intro-1.jpg"></img>
              </figure>
            </li>
            <li>
              <p>Click on the comments icon above to view grouped comments and to add general comments</p>
              <figure>
                <img alt=" " src="/assets/share-intro-2.jpg"></img>
              </figure>
            </li>
            <li>
              <p>To share this sitemap with others, copy and paste the URL from the browser bar and share it with them</p>
              <figure>
                <img alt=" " src="/assets/share-intro-3.jpg"></img>
              </figure>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default InductionSidebar;
