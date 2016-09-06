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
        <li key={index} className={ (_this.props.state == state) ? 'active' : '' }>
          <i className="icon-save-circle"></i>
          <State state={state} id={_this.props.id} onStateChange={_this.props.onStateChange} setSaving={_this.props.setSaving} />
        </li>
      )
    })
    return (
      <div className="react-header">
        <div className="row">
          <div className="col-xs-6">
            <div className="row">
              <div className="col-xs-9">
                <span className="logo-dark relative"></span>
                <input value = {this.props.name} onChange={this.handleNameChange} className="site-map-name hide" />
                <h3 className="site-map-name">{this.props.name}</h3>
              </div>
              <div className="col-xs-3 state-status text-center">
                <h5>
                  <span className={this.props.state}>
                    {this.props.state}
                    <i className="icon-caret"></i> 
                  </span>
                  <ul className="state-drop-down">
                    {renderStates}
                  </ul>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-xs-6">

          </div>
        </div> 
        <div className="toggle-header">
          <i className="icon-caret"></i>
          <div>show</div>
        </div>
      </div>
    );
  }
}

export default Header;
