import React, { PropTypes } from 'react';
export default class SitemapContainer extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
  };
  render() {
    var children;
    if (this.props.sitemapTree.children != null) {
      children = this.props.sitemapTree.children.map(function(sitemapTree, index) {
        return <li key={index}><SitemapContainer sitemapTree={sitemapTree} /></li>
      });
    }

    return (
      <div>
        <h5>
          {this.props.sitemapTree.name}
        </h5>
        <ul>
          {children}
        </ul>
      </div>
    );
  }
}
