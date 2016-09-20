import { connect } from 'react-redux'
import { changeCollapse, updatePageName, setSaving, setPageToDelete } from '../actions'
import PageTile from '../components/page_tile'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCollapsedChanged: (id, sectionId) => {
      dispatch(changeCollapse(id, sectionId));
    },
    onNameChange: (id, sectionId, name) => {
      dispatch(updatePageName(id, sectionId, name));
    },
    setPageToDelete: (page) => {
      dispatch(setPageToDelete(page))
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedPageTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTile)

export default ConnectedPageTile
