import { connect } from 'react-redux'
import { setShowGuestInfoForm, setCurrentGuest } from '../actions'
import SitemapShareModal from '../components/sitemap_share_modal'

const mapStateToProps = (state) => {
  return { showModal: state.showSitemapShareModal, publicShareUrl: state.publicShareUrl, sitemapId: state.id, sharedUsers: state.sharedUsers }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (name, email) => {
      // dispatch(setShowGuestInfoForm(false));
      // dispatch(setCurrentGuest(name, email));
    }
  }
}

const ConnectedSitemapShareModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SitemapShareModal)

export default ConnectedSitemapShareModal
