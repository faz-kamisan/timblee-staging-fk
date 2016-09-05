import { connect } from 'react-redux'
import { setName, updateState } from '../actions'
import Header from '../components/header'

const mapStateToProps = (state) => {
  return { name: state.name, id: state.id, state: state.state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(setName(name));
    },
    onStateChange: (state) => {
      dispatch(updateState(state));
    }
  }
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader
