import { connect } from 'react-redux'
import { deletePageComment, deleteFooterPageComment, changeUpdatedAt, deleteGeneralComment, setSaving, setSelectedPage } from '../actions'
import { getNodeById } from '../helpers/tree_helper'
import CommentDeleteModal from '../components/comment_delete_modal'

const mapStateToProps = (state) => {
  return { comment: state.selectedComment, sections: state.sections, selectedPage: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id, commentableId, commentableType, footer, sectionId, sections, selectedPage) => {
      if(commentableType == 'Page') {
        if(footer) {
          dispatch(deleteFooterPageComment(id, commentableId))
        } else {
          dispatch(deletePageComment(id, commentableId, sectionId))
          dispatch(setSelectedPage(getNodeById(sections.filter(function(section) {return(section.default)})[0].pageTree, selectedPage.id)))
        }
      } else {
        dispatch(deleteGeneralComment(id))
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedCommentDeleteModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDeleteModal)

export default ConnectedCommentDeleteModal
