import { connect } from 'react-redux'
import { setName } from '../actions'
import PageContainer from '../components/page_container'

const mapStateToProps = (state) => {
  return { pageTree: state.page_tree }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer)

export default ConnectedPageContainer
