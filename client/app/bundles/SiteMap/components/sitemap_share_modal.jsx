import React, { PropTypes } from 'react';
import ConnectedInviteUserBox from '../containers/connected_invite_user_box'

class SitemapShareModal extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    sitemapId: PropTypes.number.isRequired,
    publicShareUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this);
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

  render() {
    var _this = this;
    return (
      <div className='react-modal modal fade sitemap-share-modal' id='sitemap-share-modal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  <img src='/assets/close-modal.svg' className='close-modal' />
                </span>
              </button>
              <h4 className="modal-title">Share Your Sitemap</h4>
              <ul>
                <li className={ 'animated-tab' + (_this.state.urlView ? ' active' : '') } onClick={ function(e) { _this.setState({urlView: true }) } }>
                  <span className="icon-url"></span> URL
                </li>
                <li className={ 'animated-tab' +  (_this.state.urlView == false ? ' active' : '') } onClick={ function(e) { _this.setState({urlView: false }) } }>
                  <span className="icon-email"></span> Email
                </li>
                <li className="animated-bar-share"></li>
              </ul>
            </div>
            <div className={ 'modal-body' + (!_this.state.urlView ? ' hide' : '') }>
              {
                this.state.urlView &&
                <div>
                  <p className="m-b-2">Here's your sharing link.</p>  <span className='hide'>'</span>
                  <p className="m-b-20">Anyone with the link can view the sitemap.</p>
                  <div className="public-url clearfix">
                    <span id='sitemap-public-share-url'>
                      <span className="truncate">{ this.props.publicShareUrl }</span>
                    </span>
                    <button className='btn copy-link-button' onClick={this.copyUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
                  </div>
                  <a className="demo-share" href={this.props.publicShareUrl} target='_blank'>Here's what they'll see.</a>
                </div>
              }
            </div>
            <div className={ 'for-email' + (_this.state.urlView ? ' hide' : '') }>
              {
                !this.state.urlView &&
                <div>
                  <p>Enter the emails of the people you want to invite to view the sitemap. We'll send them a beautiful email with the link. They'll also be able to add comments. To invite co-workers who can edit things, go to the sitemap editor.</p>
                  <ConnectedInviteUserBox />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SitemapShareModal;
