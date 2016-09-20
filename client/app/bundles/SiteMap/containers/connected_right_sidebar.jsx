import { connect } from 'react-redux'
import { deleteGeneralComment, setSaving } from '../actions'
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
  return {}
}

const ConnectedRightSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideBar)

export default ConnectedRightSideBar
