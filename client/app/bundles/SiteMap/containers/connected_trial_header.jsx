import { connect } from 'react-redux'
import { setName, changeUpdatedAt, updateState, setSaving, showSitemapShareModal } from '../actions'
import TrialHeader from '../components/trial_header'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, createdAt: state.createdAt }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedTrialHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrialHeader)

export default ConnectedTrialHeader
