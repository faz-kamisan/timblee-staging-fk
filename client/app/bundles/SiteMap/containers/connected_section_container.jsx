import { connect } from 'react-redux'
import { setSaving, setSelectedSection, incrementIntroSlideNumber, changeActiveSectionId, changeUpdatedAt } from '../actions'
import SectionContainer from '../components/section_container'

const mapStateToProps = (state) => {
  return { sections: state.sections, sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, publicShare: state.publicShare, trial: state.trial, introSlideNumber: state.introSlideNumber, activeSectionId: state.activeSectionId, activeSectionLength: state.sections.filter(function(section) {return(section.state == 'active')}).length }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedSection: (section) => {
      dispatch(setSelectedSection(section));
    },
    showNextSlide: () => {
      dispatch(incrementIntroSlideNumber())
    },
    changeActiveSectionId: (sectionId) => {
      dispatch(changeActiveSectionId(sectionId));
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
