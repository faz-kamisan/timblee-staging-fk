import React, { PropTypes } from 'react';

class State extends React.Component {
  static propTypes = {
    state: PropTypes.string.isRequired,
    onStateChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  handleStateChange(event) {
    $.ajax({
      url: '/sitemaps/' + this.props.id,
      method: 'put',
      dataType: 'JSON',
      data: { sitemap: { state: this.props.state } },
      error: (result) => {
        document.setFlash(result.responseText)
      }
    });
    this.props.onStateChange(this.props.state);
  }
  render() {
    return (
      <div className='sitemap-state' onClick={this.handleStateChange}>
        {this.props.state}
      </div>
    );
  }
}

export default State;
