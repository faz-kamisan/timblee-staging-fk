// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import SitemapContainer from './sitemap_container';
// Simple example of a React "dumb" component
export default class SiteMap extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
  };

  // React will automatically provide us with the event `e`
  // handleChange(e) {
  //   const name = e.target.value;
  //   this.props.updateName(name);
  // }
  constructor(props) {
    super(props);
    this.state = {
      sitemap: {
        name: "howdy"
      },
      sitemapTree: {
        name: 'page1',
        childNodes: [
          {name: "page2"},
          {name: "page3", childNodes: [
            {name: "page4", childNodes: [
              {name: "page5"}
            ]},
            {name: "page6"}
          ]}
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <SitemapContainer sitemapTree={this.state.sitemapTree} />
      </div>
    );
  }
}
