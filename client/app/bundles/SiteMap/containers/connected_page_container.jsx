import { connect } from 'react-redux'
import { updatePagePosition, addNewPage } from '../actions'
import DraggablePageContainer from '../components/page_container'

const mapStateToProps = (state) => {
  return { pageTree: state.pageTree, sitemapId: state.id }
}

const ConnectedPageContainer = connect(
  mapStateToProps
)(DraggablePageContainer)

export default ConnectedPageContainer
