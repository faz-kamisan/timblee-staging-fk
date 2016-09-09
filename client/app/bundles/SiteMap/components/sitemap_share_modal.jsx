import React, { PropTypes } from 'react';

class SitemapShareModal extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    publicShareUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this);
    this.state = {copied: false}
  }

  copyUrl(e) {
    this.setState({copied: true})
    var myelement = document.getElementById('sitemap-publi-share-url'),
        range = document.createRange();
    range.selectNode(myelement);
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }

  render() {
    return (
      <div className='react-modal sitemap-share-modal'>
        {
          this.props.showModal &&
          <div>
            <span id='sitemap-publi-share-url'>{ this.props.publicShareUrl }</span>
            <button className='btn copy-link-button' onClick={this.copyUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
            <a href={this.props.publicShareUrl} target='_blank'>Here's what they'll see.</a>
          </div>
        }
      </div>
    )
  }
}

export default SitemapShareModal;
