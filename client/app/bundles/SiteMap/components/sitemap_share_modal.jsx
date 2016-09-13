import React, { PropTypes } from 'react';
import InviteUserBox from './invite_user_box'

class SitemapShareModal extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    sitemapId: PropTypes.number.isRequired,
    publicShareUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this);
    this.restoreModal = this.restoreModal.bind(this);
    this.state = {copied: false, urlView: true}
  }

  copyUrl(e) {
    this.setState({copied: true})
    var myelement = document.getElementById('sitemap-public-share-url'),
        range = document.createRange();
    range.selectNode(myelement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  restoreModal(e) {
    var _this = this;
    setTimeout(function() {
      _this.setState({copied: false, urlView: true})
    }, 1000)
  }

  render() {
    var _this = this;
    return (
      <div className='react-modal modal fade sitemap-share-modal' id='sitemap-share-modal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.restoreModal}>
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal' />
                </span>
              </button>
              <h4 className="modal-title">Share Your Sitemap</h4>
              <ul>
                <li onClick={ function(e) { _this.setState({urlView: true }) } }>URL</li>
                <li onClick={ function(e) { _this.setState({urlView: false }) } }>Email</li>
              </ul>
            </div>
            <div className="modal-body">
              {
                this.state.urlView &&
                <div>
                  <p>Here's your sharing link.</p>  <span className='hide'>'</span>
                  <p>Anyone with the link can view the sitemap.</p>
                  <span id='sitemap-public-share-url'>{ this.props.publicShareUrl }</span>
                  <button className='btn copy-link-button' onClick={this.copyUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
                  <a href={this.props.publicShareUrl} target='_blank'>Here's what they'll see.</a>
                </div>
              }
              {
                !this.state.urlView &&
                <InviteUserBox sitemapId={this.props.sitemapId} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SitemapShareModal;
