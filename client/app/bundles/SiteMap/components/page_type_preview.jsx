import React, { Component, PropTypes } from 'react';
import PageType from './page_type';

const styles = {
  display: 'inline-block'
};

export default class PageTypePreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
  };
  render() {
    return (
      <div style={styles} className='page-type-preview'>
        <PageType name={this.props.name} iconName={this.props.iconName} />
      </div>
    );
  }
}
