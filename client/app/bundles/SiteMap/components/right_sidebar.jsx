import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import Comment from './comment'

class RightSidebar extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    pageTree: PropTypes.object.isRequired
  };
  render() {
    var renderedComments = this.props.comments.map(function(comment, index) {
      return <li key={index}><Comment message={comment.message} commenter={comment.commenter} /></li>
    })
    var pageWithComments = []
    traverse(this.props.pageTree, function(page) {
      if(page.comments.length > 0) {
        pageWithComments.push({ name: page.name, comments: page.comments });
      }
    })
    var renderdPageWithComments = pageWithComments.map(function(page, index) {
      var renderedPageComments = page.comments.map(function(comment, index) {
        return <li key={index}><Comment message={comment.message} commenter={comment.commenter} /></li>
      })
      return(
        <li key={index}>
          <h3>{page.name}</h3>
          <ul>
            {renderedPageComments}
          </ul>
        </li>
      )
    })

    return (
      <div className='sitemap-right-sidebar'>
        <h2>
          General Comments
        </h2>
        <ul>
          {renderedComments}
        </ul>
        <h2>
          Page Comments
        </h2>
        <ul>
          {renderdPageWithComments}
        </ul>

      </div>
    );
  }
}

export default RightSidebar;
