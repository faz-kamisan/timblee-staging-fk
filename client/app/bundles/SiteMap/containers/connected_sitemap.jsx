import { connect } from 'react-redux'

import Sitemap from '../components/sitemap'

const mapStateToProps = (state) => {
  return { publicShare: state.publicShare, trial: state.trial, sitemapId: state.id, currentUser: state.currentUser, leftSidebarExpanded: state.leftSidebarExpanded }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedSitemap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sitemap)

export default ConnectedSitemap
