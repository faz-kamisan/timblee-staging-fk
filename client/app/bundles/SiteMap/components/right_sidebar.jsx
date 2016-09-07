import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import Comment from './comment'
import ConnectedNewComment from '../containers/connected_new_comment'

class RightSidebar extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    sitemapId: PropTypes.number.isRequired
  };

  componentDidMount() {
    $('.comment-input').watermark('Add a comment...<br/>You can mention people by typing @.', {fallback: false});
  }
  render() {
    const CommentTabs = ['active', 'resolved', 'archived']
    var renderedComments = this.props.comments.map(function(comment, index) {
      return <li key={index}><Comment message={comment.message} commenter={comment.commenter} /></li>
    })
    var pageWithComments = []
    this.props.sections.forEach(function(section, index) {
      traverse(section.pageTree, function(page) {
        if(page.comments.length > 0) {
          pageWithComments.push({ name: page.name, comments: page.comments, id: page.id, sectionId: section.id });
        }
      })
    })
    var renderedPageWithComments = pageWithComments.map(function(page, index) {
      var renderedPageComments = page.comments.map(function(comment, index) {
        return <li key={index}><Comment message={comment.message} commenter={comment.commenter} /></li>
      })
      return(
        <li key={index}>
          <h3>{page.name}</h3>
          <ul>
            {renderedPageComments}
            <ConnectedNewComment commentableId={page.id} commentableType='Page' sectionId={page.sectionId} />
          </ul>
        </li>
      )
    })

    var renderedCommentTabs = CommentTabs.map(function(commentTab, index) {
      return (<li key={index}>{commentTab}</li>)
    })

    return (
      <div className='sitemap-right-sidebar'>
        <div className='sitemap-comment-tabs'>
          <ul>
            {renderedCommentTabs}
          </ul>
        </div>
        <h2>
          General Comments
        </h2>
        <ul>
          {renderedComments}
          <ConnectedNewComment commentableId={this.props.sitemapId} commentableType='Sitemap' />
        </ul>
        <h2>
          Page Comments
        </h2>
        <ul>
          {renderedPageWithComments}
        </ul>

      </div>
    );
  }
}

export default RightSidebar;
