import { connect } from 'react-redux'
import { addSharedUsers } from '../actions'
import InviteUserBox from '../components/invite_user_box'

const mapStateToProps = (state) => {
  return { sitemapId: state.id, sharedUsers: state.sharedUsers }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShare: (emails) => {
      dispatch(addSharedUsers(emails));
    }
  }
}

const ConnectedInviteUserBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteUserBox)

export default ConnectedInviteUserBox
