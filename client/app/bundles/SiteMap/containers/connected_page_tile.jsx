import { connect } from 'react-redux'
import { changeCollapse, updatePageName, updateFooterPageName, updatePagePersitence, changeActiveSectionId, updateFooterPagePersitence, changeUpdatedAt, setSaving, setSelectedPage, addNewPage, setMaxPageUid, updateId, setShowGuestInfoForm } from '../actions'
import PageTile from '../components/page_tile'

const mapStateToProps = (state) => {
  return {trial: state.trial, publicShare: state.publicShare , pageType: (state.pageTypes.filter(function(pageType) { return(pageType.name == 'General 1') })[0]), maxPageUid: state.maxPageUid, sitemapId: state.id, currentUser: state.currentUser, currentGuest: state.currentGuest, activeSectionId: state.activeSectionId }
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
    onPageTypeDrop: (sectionId, pageType, parentId, position, timeStamp, maxPageUid) => {
      dispatch(addNewPage(sectionId, pageType, parentId, position, timeStamp, maxPageUid + 1));
      dispatch(setMaxPageUid(maxPageUid + 1))
    },
    onPageIdUpdate: (id, sectionId, newId) => {
      dispatch(updateId(id, sectionId, newId));
    },
    setSelectedPage: (page) => {
      dispatch(setSelectedPage(page))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    },
    setShowGuestInfoForm: (showGuestInfoForm) => {
      dispatch(setShowGuestInfoForm(showGuestInfoForm));
    }
  }
}

const ConnectedPageTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTile)

export default ConnectedPageTile
