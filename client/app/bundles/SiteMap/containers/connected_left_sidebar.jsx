import { connect } from 'react-redux'
import LeftSideBar from '../components/left_sidebar'

const mapStateToProps = (state) => {
  return { pageTypes: state.pageTypes }
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
