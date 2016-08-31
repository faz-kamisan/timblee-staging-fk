import React, { Component, PropTypes } from 'react';
import PageContainer from './page_container';

const styles = {
  display: 'inline-block'
};

export default class PageContainerPreview extends Component {
  static propTypes = {
    pageTree: PropTypes.object.isRequired
  };
  render() {
    const { pageTree } = this.props;

    var _this = this;
    var children;
    if (this.props.pageTree.children != null) {
      children = pageTree.children.map(function(pageTree, index) {
        return (
          <div key={pageTree.id}>
            <PageContainerPreview pageTree={pageTree} />
          </div>
        )
      });
    }

    return (
      <div style={styles}>
        <PageContainer pageTree={pageTree} children={children} />
      </div>
    );
  }
}
