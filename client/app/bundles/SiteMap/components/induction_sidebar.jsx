import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import ConnectedComment from '../containers/connected_comment'
import ConnectedMarkAsResolvedCheck from '../containers/connected_mark_as_resolved_check'
import ConnectedNewComment from '../containers/connected_new_comment'

class RightSidebar extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className='sitemap-induction-sidebar'>
        <div className='general-comments'>
          <h2 className="comment-type-heading">
            Induction
          </h2>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
