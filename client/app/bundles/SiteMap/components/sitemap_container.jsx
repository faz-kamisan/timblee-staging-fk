import React, { PropTypes } from 'react';
export default class SitemapContainer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
  };
  render() {
    var childNodes;
    if (this.props.sitemapTree.childNodes != null) {
      childNodes = this.props.sitemapTree.childNodes.map(function(sitemapTree, index) {
        return <li key={index}><SitemapContainer sitemapTree={sitemapTree} /></li>
      });
    }

    return (
      <div>
        <h5>
          {this.props.sitemapTree.name}
        </h5>
        <ul>
          {childNodes}
        </ul>
      </div>
    );
  }
}
