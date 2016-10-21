import { connect } from 'react-redux'
import { setSaving, setSelectedSection, setIntroSlideNumber, changeUpdatedAt } from '../actions'
import IntroductionScreenTwo from '../components/introduction_screen_two'

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

const ConnectedIntroductionScreenTwo = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroductionScreenTwo)

export default ConnectedIntroductionScreenTwo
