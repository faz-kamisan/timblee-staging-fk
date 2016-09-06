import React, { PropTypes } from 'react';

const stateMapping = {'In Progress': 'in_progress', 'Review': 'in_review', 'Approved': 'approved', 'On Hold': 'on_hold'}

class State extends React.Component {
  static propTypes = {
    state: PropTypes.string.isRequired,
    onStateChange: PropTypes.func.isRequired,
    setSaving: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  handleStateChange(event) {
    this.props.setSaving(true)
    $.ajax({
      url: '/sitemaps/' + this.props.id,
      method: 'put',
      dataType: 'JSON',
      data: { sitemap: { state: stateMapping[this.props.state] } },
      error: (result) => {
        document.setFlash(result.responseText)
      },
      complete: (result) => {
        this.props.setSaving(false)
      }
    });
    this.props.onStateChange(this.props.state);
  }
  render() {
    return (
      <div className='sitemap-state' onClick={this.handleStateChange}>
        <span className={"state-indicator " + this.props.state}></span>
        {this.props.state}
      </div>
    );
  }
}

export default State;
