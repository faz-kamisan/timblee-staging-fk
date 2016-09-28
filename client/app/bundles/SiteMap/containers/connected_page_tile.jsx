import { connect } from 'react-redux'
import { changeCollapse, updatePageName, updatePagePersitence, changeUpdatedAt, setSaving, setSelectedPage } from '../actions'
import PageTile from '../components/page_tile'

const mapStateToProps = (state) => {
  return {publicShare: state.publicShare}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedChanged: (id, sectionId) => {
      dispatch(changeCollapse(id, sectionId));
    },
    onNameChange: (id, sectionId, name) => {
      dispatch(updatePageName(id, sectionId, name));
    },
    updatePagePersitence: (id, sectionId) => {
      dispatch(updatePagePersitence(id, sectionId));
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
