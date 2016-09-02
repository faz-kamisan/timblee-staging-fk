import React, { PropTypes } from 'react';

class PageType extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
  };
  render() {
    return (
      <div className={"page-type-outer " + this.props.iconName}>
        <div className="page-type-box">
          <aside className="page-type-details">
            <span className="dummy-number">xx</span>
            <h5>{this.props.name}</h5>
            <span className="dummy-id">
              <span className="dummy-state"></span> ID: xxx
            </span>
          </aside>
          <aside className="page-type-icon"></aside>
        </div>
        { !(this.props.isDragPrview) && <h4>{this.props.name}</h4> }
      </div>
    );
  }
}

export default PageType;
