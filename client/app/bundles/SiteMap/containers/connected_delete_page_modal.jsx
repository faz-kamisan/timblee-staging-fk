import { connect } from 'react-redux'
import { removePage } from '../actions'
import DeletePageModal from '../components/delete_page_modal'

const mapStateToProps = (state) => {
  return { pageTree: state.pageToDelete }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageDelete: (pageTree) => {
      dispatch(removePage(pageTree.id, pageTree.section_id))
    }
  }
}

const ConnectedDeletePageModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePageModal)

export default ConnectedDeletePageModal
