import { connect } from 'react-redux'
import { updatePageState, updateFooterPageState, changeUpdatedAt, setSaving } from '../actions'
import MarkAsResolvedCheck from '../components/mark_as_resolved_check'

const mapStateToProps = (state) => {
  return { publicShare: state.publicShare }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageState: (pageId, footer, sectionId, state) => {
      if(footer) {
        dispatch(updateFooterPageState(pageId, state))
      } else {
        dispatch(updatePageState(pageId, sectionId, state))
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedMarkAsResolvedCheck = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkAsResolvedCheck)

export default ConnectedMarkAsResolvedCheck
