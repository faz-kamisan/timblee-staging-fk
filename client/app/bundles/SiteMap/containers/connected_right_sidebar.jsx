import { connect } from 'react-redux'
import { deleteGeneralComment, deletePageComment } from '../actions'
import RightSideBar from '../components/right_sidebar'

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    sitemapId: state.id,
    sections: state.sections,
    business: state.business
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDeleteCommentId: (id, commentableType, pageId, sectionId) => {
      if(commentableType == 'Sitemap') {
        dispatch(deleteGeneralComment(id));
      } else if(commentableType == 'Page') {
        dispatch(deletePageComment(id, pageId, sectionId));
      }
    }
  }
}

const ConnectedRightSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideBar)

export default ConnectedRightSideBar
