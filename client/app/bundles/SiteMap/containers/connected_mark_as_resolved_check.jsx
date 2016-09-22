import { connect } from 'react-redux'
import { updatePageState, setSaving } from '../actions'
import MarkAsResolvedCheck from '../components/mark_as_resolved_check'

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageState: (pageId, sectionId, state) => {
      dispatch(updatePageState(pageId, sectionId, state))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedMarkAsResolvedCheck = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkAsResolvedCheck)

export default ConnectedMarkAsResolvedCheck
