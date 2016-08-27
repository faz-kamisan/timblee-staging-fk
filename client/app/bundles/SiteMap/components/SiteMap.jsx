import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ConnectedPageContainer from '../containers/connected_page_container';
import { DragDropContext } from 'react-dnd';
import ConnectedHeader from '../containers/connected_header';
import ConnectedLeftSidebar from '../containers/connected_left_sidebar';
import ConnectedRightSidebar from '../containers/connected_right_sidebar';

class SiteMap extends React.Component {
  render() {
    return (
        <div>
          <ConnectedHeader />
          <ConnectedLeftSidebar />
          <ConnectedRightSidebar />
          <ConnectedPageContainer />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
