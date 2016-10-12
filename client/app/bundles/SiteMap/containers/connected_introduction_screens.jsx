import { connect } from 'react-redux'
import { setSaving, setSelectedSection, setIntroSlideNumber, changeUpdatedAt } from '../actions'
import IntroductionScreens from '../components/introduction_screens'

const mapStateToProps = (state) => {
  return { introSlideNumber: state.introSlideNumber }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIntroSlideNumber: (introSlideNumber) => {
      dispatch(setIntroSlideNumber(introSlideNumber))
    }
  }
}

const ConnectedIntroductionScreens = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroductionScreens)

export default ConnectedIntroductionScreens
