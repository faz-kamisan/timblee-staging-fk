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
        if(pageTree.level == 2) {
          var sitemapNumber = parseInt(_this.props.sitemapNumber).toString() + '.1';
        } else {
          var sitemapNumber = _this.props.sitemapNumber + '.' + (index + 1)
        }
        return (
          <div className='test' key={pageTree.id}>
            <PageContainerPreview pageTree={pageTree} sitemapNumber={sitemapNumber} />
          </div>
        )
      });
    }

    return (
      <div style={styles} className='custom-drag-preview'>
        <PageContainer pageTree={pageTree} children={children} sitemapNumber={this.props.sitemapNumber} />
      </div>
    );
  }
}
