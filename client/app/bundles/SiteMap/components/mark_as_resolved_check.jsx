import React, { PropTypes } from 'react';
import { MentionsInput, Mention } from 'react-mentions'

class MarkAsResolvedCheck extends React.Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    updatePageState : PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.updatePageState = this.updatePageState.bind(this);
  }

  updatePageState(state) {
    var _this = this
    this.props.updatePageState(this.props.page.id, this.props.page.footer, (this.props.page.sectionId || this.props.page.section_id), state);
    $.ajax({
      url: '/pages/' + this.props.page.id,
      method: 'put',
      dataType: 'JSON',
      data: { page: { state: state } },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
        this.props.setSaving(true)
        setTimeout(function() {
          _this.props.setSaving(false)
        }, 2000)
      }
    });
  }

  render() {
    var _this = this;
    if(this.props.publicShare) {
      return <div />
    } else {
      if(this.props.page.state == 'active') {
        return (
          <label className="pull-right" htmlFor="mark-resolve">
            Mark as resolved
            <input type="checkbox" checked={false} id="mark-resolve" onChange={function(e) { _this.updatePageState('resolved') }} />
          </label>
        )
      } else {
        return (
          <label className="pull-right" htmlFor="mark-unresolve">
            Unresolve
            <input type="checkbox" checked='checked' id="mark-unresolve" onChange={function(e) { _this.updatePageState('active') }} />
          </label>
        )
      }
    }
  }
}

export default MarkAsResolvedCheck;
