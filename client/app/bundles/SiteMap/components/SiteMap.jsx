import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ConnectedPageContainer from '../containers/connected_page_container';
import { DragDropContext } from 'react-dnd';
import ConnectedHeader from '../containers/connected_header';

class SiteMap extends React.Component {
  render() {
    return (
        <div>
          <ConnectedHeader />
          <ConnectedPageContainer />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
