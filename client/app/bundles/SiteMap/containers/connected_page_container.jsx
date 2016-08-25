import { connect } from 'react-redux'
import { updatePagePosition } from '../actions'
import PageContainer from '../components/page_container'

const mapStateToProps = (state) => {
  return { pageTree: state.pageTree, sitemapId: state.id }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDrop: (id, newParentId) => {
      dispatch(updatePagePosition(id, newParentId));
    }
  }
}

const ConnectedPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer)

export default ConnectedPageContainer
