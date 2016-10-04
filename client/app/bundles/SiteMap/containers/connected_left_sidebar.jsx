import { connect } from 'react-redux'
import { changeLeftSideBarExpanded } from '../actions'
import LeftSideBar from '../components/left_sidebar'

const mapStateToProps = (state) => {
  return { pageTypes: state.pageTypes, sections: state.sections, updatedAt: state.updated_at, leftSidebarExpanded: state.leftSidebarExpanded, footerPages: state.footerPages, trial: state.trial }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeftSideBarExpanded: (expanded) => {
      dispatch(changeLeftSideBarExpanded(expanded));
    }
  }
}

const ConnectedLeftSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSideBar)

export default ConnectedLeftSideBar
