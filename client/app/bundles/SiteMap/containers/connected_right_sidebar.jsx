import { connect } from 'react-redux'
import RightSideBar from '../components/right_sidebar'

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    pageTree: state.pageTree
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedRightSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideBar)

export default ConnectedRightSideBar