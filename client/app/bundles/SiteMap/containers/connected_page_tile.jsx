import { connect } from 'react-redux'
import { changeCollapse, updatePageName, updateFooterPageName, updatePagePersitence, changeActiveSectionId, updateFooterPagePersitence, changeUpdatedAt, setSaving, setSelectedPage } from '../actions'
import PageTile from '../components/page_tile'

const mapStateToProps = (state) => {
  return {publicShare: state.publicShare}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedChanged: (id, sectionId) => {
      dispatch(changeCollapse(id, sectionId));
    },
    onNameChange: (id, footer, sectionId, name) => {
      if(footer) {
        dispatch(updateFooterPageName(id, name));
      } else {
        dispatch(updatePageName(id, sectionId, name));
      }
    },
    updatePagePersitence: (id, footer, sectionId) => {
      if(footer) {
        dispatch(updateFooterPagePersitence(id));
      } else {
        dispatch(updatePagePersitence(id, sectionId));
      }
    },
    changeActiveSectionId: (sectionId) => {
      dispatch(changeActiveSectionId(sectionId));
    },
    setSelectedPage: (page) => {
      dispatch(setSelectedPage(page))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedPageTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTile)

export default ConnectedPageTile
