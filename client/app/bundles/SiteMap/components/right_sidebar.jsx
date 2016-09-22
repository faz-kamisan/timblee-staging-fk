import React, { PropTypes } from 'react';
import { traverse } from '../helpers/tree_helper'
import ConnectedComment from '../containers/connected_comment'
import ConnectedMarkAsResolvedCheck from '../containers/connected_mark_as_resolved_check'
import ConnectedNewComment from '../containers/connected_new_comment'

class RightSidebar extends React.Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    sitemapId: PropTypes.number.isRequired,
    business : PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { currentTab: 'active' };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(e, tabName) {
    this.setState({ currentTab: tabName })
  }

  componentDidMount() {
    $('.comment-input textarea').watermark('Add a comment...<br/>You can mention people by typing @.', {fallback: false});
  }
  render() {
    const CommentTabs = ['active', 'resolved', 'archived']
    var _this = this;
    var renderedComments = this.props.comments.map(function(comment, index) {
      return <li key={index}><ConnectedComment id={comment.id} message={comment.message} commenter={comment.commenter} createdAt={comment.created_at} editable={true} commentableId={_this.props.sitemapId} commentableType='Sitemap' /></li>
    })
    var pageWithComments = []
    this.props.sections.forEach(function(section, index) {
      traverse(section.pageTree, function(page) {
        if(page.comments.length > 0) {
          pageWithComments.push({ name: page.name, comments: page.comments, id: page.id, sectionId: section.id, uid: page.uid, state: page.state });
        }
      })
    })
    var renderedPageWithComments = pageWithComments.filter(function(page) { return(page.state == _this.state.currentTab) }).map(function(page, index) {
      var renderedPageComments = page.comments.map(function(comment, index) {
        return <li key={index}><ConnectedComment id={comment.id} message={comment.message} commenter={comment.commenter} createdAt={comment.created_at} editable={(page.state == 'active')} commentableId={page.id} commentableType='Page' sectionId={page.sectionId} /></li>
      })
      return(
        <li key={index}>
          <div className="page-comment-details">
            <span className="page-id">ID: {page.uid}</span>
            <div className="clearfix">
              <span className="page-name truncate pull-left">{page.name}</span>
              <ConnectedMarkAsResolvedCheck page={page} />
            </div>
          </div>
          <ul className="comment-group">
            {renderedPageComments}
          </ul>
          { (_this.state.currentTab == 'active') &&
            <ConnectedNewComment commentableId={page.id} commentableType='Page' sectionId={page.sectionId} />
          }
        </li>
      )
    })

    var renderedCommentTabs = CommentTabs.map(function(commentTab, index) {
      return (<li key={index} className={ 'comment-tab' + (_this.state.currentTab == commentTab ? ' active' : '') } onClick={function(e) { _this.handleTabClick(e, commentTab) } }>{commentTab}</li>)
    })

    return (
      <div className='sitemap-right-sidebar'>
        <div className='sitemap-comment-tabs comment-header'>
          <ul className="comment-list clearfix">
            {renderedCommentTabs}
            <li className="animated-bar-react"></li>
          </ul>
        </div>
        <div className="comment-inner-body">
          <p className="comment-text">
            {(() => {
              switch (this.state.currentTab) {
              case "active"   : return "Anyone who has the share link can see active comments. Only " + this.props.business.name + " team members can see resolved and deleted comments.";
              case "resolved" : return "Resolved conversations are only visible to logged in " + this.props.business.name + " team members.";
              case "archived" : return "If a page with comments is deleted, the conversation is moved here. This is to ensure there is a record of all conversations. Archived conversations are only visible to logged in " + this.props.business.name + " team members.";
              default         : return "";
            }
            })()}
          </p>
          { (this.state.currentTab == 'active') &&
            <div className='general-comments'>
              <h2 className="comment-type-heading">
                General comments
              </h2>
              <ul className="comment-group">
                {renderedComments}
              </ul>
              <ConnectedNewComment commentableId={this.props.sitemapId} commentableType='Sitemap' />
            </div>
          }
          <ul>
            {renderedPageWithComments}
          </ul>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
