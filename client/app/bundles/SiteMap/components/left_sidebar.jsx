import React, { PropTypes } from 'react';
import DraggablePageType from './page_type'

class LeftSidebar extends React.Component {
  static propTypes = {
    pageTypes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      expand: false
    }
    this.toogleExpand = this.toogleExpand.bind(this)
  }

  toogleExpand() {
    this.setState({expand: !this.state.expand});
  }

  render() {
    var pageTypeComponents = this.props.pageTypes.map(function(pageType, index) {
      return <li key={index}><DraggablePageType name={pageType.name} iconName={pageType.icon_name} id={pageType.id} /></li>
    })
    return (
      <div className={'sitemap-left-sidebar' + (this.state.expand ? '' : ' expand-false')}>
        {
          this.state.expand ?
          <div>
            <div className="close-left-bar">
              <span className="cursor" onClick={this.toogleExpand}>
                <span className="caret-left">
                  <i className="icon-caret"></i>
                </span>
                Hide Sidebar
              </span>
            </div>
            <form className="search-page-type">
              <input type="search" placeholder="Page Type" />
              <i className="icon-search"></i>
            </form>
            <ul className="page-type-list clearfix">
              {pageTypeComponents}
            </ul>
          </div> 
          :
          <div className="expand-btn" onClick={this.toogleExpand}>
            <span>Expand</span>
          </div>
        }
      </div>
    );
  }
}

export default LeftSidebar;
