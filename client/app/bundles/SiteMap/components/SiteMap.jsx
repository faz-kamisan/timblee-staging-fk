import React, { PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import ConnectedPageContainer from '../containers/connected_page_container';
import { DragDropContext } from 'react-dnd';

class SiteMap extends React.Component {
  render() {
    return (
        <div>
          <ConnectedPageContainer />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(SiteMap);
