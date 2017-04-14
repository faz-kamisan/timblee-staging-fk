import React, { Component, PropTypes } from 'react';
import OrphanPage from './orphan_page';

const styles = {
  display: 'inline-block'
};

export default class OrphanPagePreview extends Component {
  render() {
    return (
      <div style={styles} className='page-type-preview'>
        <OrphanPage page={this.props.page} isDragPrview={true} />
      </div>
    );
  }
}
