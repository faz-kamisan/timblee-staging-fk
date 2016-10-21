import { connect } from 'react-redux'
import { setSaving, changeUpdatedAt, addPageComment, addFooterPageComment, updateFooterPageCommentId, addGeneralComment, updatePageCommentId, updateGeneralCommentId, setSelectedPage } from '../actions'
import { getNodeById } from '../helpers/tree_helper'
import NewComment from '../components/new_comment'

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, currentGuest: state.currentGuest, business: state.business, sections: state.sections, selectedPage: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (commentableId, commentableType, footer, message, commenter, sectionId, tempId, sections, selectedPage) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(addFooterPageComment(commentableId, message, commenter, tempId));
        } else {
          dispatch(addPageComment(commentableId, message, commenter, sectionId, tempId));
          dispatch(setSelectedPage(getNodeById(sections.filter(function(section) {return(section.default)})[0].pageTree, selectedPage.id)))
        }
      } else if(commentableType == 'Sitemap') {
        dispatch(addGeneralComment(message, commenter, tempId));
      }
    },
    onCommentIdUpdate: (commentableType, commentableId, footer, oldId, newId, sectionId) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(updateFooterPageCommentId(oldId, newId, commentableId));
        } else {
          dispatch(updatePageCommentId(oldId, newId, sectionId, commentableId));
        }
      } else if(commentableType == 'Sitemap') {
        dispatch(updateGeneralCommentId(oldId, newId));
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedNewComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)

export default ConnectedNewComment
