import React, { PropTypes } from 'react';
import DraggablePageType from './page_type'

class LeftSidebar extends React.Component {
  static propTypes = {
    pageTypes: PropTypes.array.isRequired
  };
  render() {
    var pageTypeComponents = this.props.pageTypes.map(function(pageType, index) {
      return <li key={index}><DraggablePageType name={pageType.name} id={pageType.id} /></li>
    })
    return (
      <div className='sitemap-left-sidebar'>
        <ul>
          {pageTypeComponents}
        </ul>
      </div>
    );
  }
}

export default LeftSidebar;
