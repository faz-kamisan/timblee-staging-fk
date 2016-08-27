import React, { PropTypes } from 'react';
class Header extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onNameChange: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    var name = event.target.value
    $.ajax({
      url: '/sitemaps/' + this.props.id,
      method: 'put',
      dataType: 'JSON',
      data: { sitemap: { name: name } },
      error: (result, b, c, d) => {
        document.setFlash(result.responseText)
      }
    });
    this.props.onNameChange(name);
  }
  render() {
    return (
      <div>
        <input value = {this.props.name} onChange={this.handleNameChange} />
      </div>
    );
  }
}

export default Header;
