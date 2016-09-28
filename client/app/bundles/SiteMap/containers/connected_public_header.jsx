import { connect } from 'react-redux'
import { setName, changeUpdatedAt, updateState, setSaving, showSitemapShareModal } from '../actions'
import PublicHeader from '../components/public_header'

const mapStateToProps = (state) => {
  return { name: state.name, id: state.id, state: state.state, business: state.business, saving: state.saving, updatedAt: state.updated_at, sections: state.sections, footerPages: state.footerPages }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ConnectedPublicHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicHeader)

export default ConnectedPublicHeader
