import { connect } from 'react-redux'
import { updatePageState, updateFooterPageState, changeUpdatedAt, setSaving, setSelectedPage } from '../actions'
import { getNodeById } from '../helpers/tree_helper'
import MarkAsResolvedCheck from '../components/mark_as_resolved_check'

const mapStateToProps = (state) => {
  return { publicShare: state.publicShare, sections: state.sections, selectedPage: state.selectedPage }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePageState: (pageId, footer, sectionId, state, sections, selectedPage) => {
      if(footer) {
        dispatch(updateFooterPageState(pageId, state))
      } else {
        dispatch(updatePageState(pageId, sectionId, state))
        dispatch(setSelectedPage(getNodeById(sections.filter(function(section) {return(section.default)})[0].pageTree, selectedPage.id)))
      }
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
      dispatch(changeUpdatedAt());
    }
  }
}

const ConnectedMarkAsResolvedCheck = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkAsResolvedCheck)

export default ConnectedMarkAsResolvedCheck
