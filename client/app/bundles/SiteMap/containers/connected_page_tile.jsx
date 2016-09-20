import { connect } from 'react-redux'
import { changeCollapse, updatePageName, setSaving } from '../actions'
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
