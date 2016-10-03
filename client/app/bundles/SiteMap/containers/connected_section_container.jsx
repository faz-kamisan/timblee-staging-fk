import { connect } from 'react-redux'
import { setSaving, changeUpdatedAt, removeSection } from '../actions'
import SectionContainer from '../components/section_container'

const mapStateToProps = (state) => {
  return { sections: state.sections, sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, publicShare: state.publicShare, trial: state.trial }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSection: (id) => {
      dispatch(removeSection(id));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedSecionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionContainer)

export default ConnectedSecionContainer
