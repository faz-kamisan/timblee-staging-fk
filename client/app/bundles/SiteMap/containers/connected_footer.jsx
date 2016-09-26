import { connect } from 'react-redux'
import { addNewFooterPage, updateFooterPageId, setSaving } from '../actions'
import DroppableFooter from '../components/footer'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, leftSidebarExpanded: state.leftSidebarExpanded, footerPages: state.footerPages }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageTypeDrop: (pageType, timeStamp) => {
      dispatch(addNewFooterPage(pageType, timeStamp));

    },
    onPageIdUpdate: (id, newId) => {
      dispatch(updateFooterPageId(id, newId));
    },
    setSaving: (saving) => {
      dispatch(setSaving(saving));
    }
  }
}

const ConnectedFooter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DroppableFooter)

export default ConnectedFooter
