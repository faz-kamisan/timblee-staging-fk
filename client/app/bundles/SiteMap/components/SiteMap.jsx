import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ConnectedSecionContainer from '../containers/connected_section_container';
import { DragDropContext } from 'react-dnd';
import ConnectedHeader from '../containers/connected_header';
import ConnectedLeftSidebar from '../containers/connected_left_sidebar';
import ConnectedRightSidebar from '../containers/connected_right_sidebar';
import CustomDragLayer from '../components/custom_drag_layer';

class SiteMap extends React.Component {
  render() {
    return (
        <div>
          <ConnectedHeader />
          <ConnectedLeftSidebar />
          <ConnectedRightSidebar />
          <ConnectedSecionContainer sitemapNumber='' />
          <CustomDragLayer />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
