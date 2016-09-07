import { connect } from 'react-redux'
import LeftSideBar from '../components/left_sidebar'

const mapStateToProps = (state) => {
  return { pageTypes: state.pageTypes, sections: state.sections, updatedAt: state.updated_at }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedLeftSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSideBar)

export default ConnectedLeftSideBar
