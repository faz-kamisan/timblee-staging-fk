// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import SitemapContainer from './sitemap_container';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Simple example of a React "dumb" component
class SiteMap extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    sitemapProps: PropTypes.object.isRequired
  };

  // React will automatically provide us with the event `e`
  // handleChange(e) {
  //   const name = e.target.value;
  //   this.props.updateName(name);
  // }
  constructor(props) {
    super(props);
    this.state = {
      name: props.sitemapProps.name,
      sitemapTree: props.sitemapProps.page_tree,
    };
  }
  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <SitemapContainer sitemapTree={this.state.sitemapTree} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
