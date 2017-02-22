import { connect } from 'react-redux'
import { setName, changeUpdatedAt, updateState, setSaving, showSitemapShareModal } from '../actions'
import Header from '../components/header'

const mapStateToProps = (state) => {
  return { name: state.name, id: state.id, state: state.state, business: state.business, saving: state.saving, newSitemap: state.newSitemap, currentUser: state.currentUser, publicShareUrl: state.publicShareUrl, sharedUsers: state.sharedUsers, sections: state.sections }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(setName(name));
    },
    onStateChange: (state) => {
      dispatch(updateState(state));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    },
    showSitemapShareModal: () => {
      dispatch(showSitemapShareModal(true))
    }
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader
