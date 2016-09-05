import React, { PropTypes } from 'react';
import State from './state'
class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    saving: PropTypes.bool.isRequired,
    setSaving: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    var name = event.target.value
    this.props.setSaving(true)
    $.ajax({
      url: '/sitemaps/' + this.props.id,
      method: 'put',
      dataType: 'JSON',
      data: { sitemap: { name: name } },
      error: (result, b, c, d) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
        this.props.setSaving(false)
      }
    });
    this.props.onNameChange(name);
  }
  render() {
    var _this = this;
    var renderStates = ['In Progress', 'Review', 'Approved', 'On Hold'].map(function(state, index) {
      return(
        <li key={index}>
          <State state={state} id={_this.props.id} onStateChange={_this.props.onStateChange} setSaving={_this.props.setSaving} />
        </li>
      )
    })
    return (
      <div className="" style={{ 'padding-left': '50px' }}>
        <input value = {this.props.name} onChange={this.handleNameChange} />
        <span>
          <h5>State</h5>
          {this.props.state}
        </span>
        <ul>
          {renderStates}
        </ul>
        <span>
         {this.props.saving ? 'saving' : 'saved'}
        </span>
      </div>
    );
  }
}

export default Header;
