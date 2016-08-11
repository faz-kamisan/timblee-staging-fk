// HelloWorldWidget is an arbitrary name for any "dumb" component. We do not recommend suffixing
// all your dump component names with Widget.

import React, { PropTypes } from 'react';
import Draggable from 'react-draggable';
// Simple example of a React "dumb" component
export default class SiteMap extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: "data" and "actions".
    // updateName: PropTypes.func.isRequired,
    // name: PropTypes.string.isRequired,
  };

  // React will automatically provide us with the event `e`
  // handleChange(e) {
  //   const name = e.target.value;
  //   this.props.updateName(name);
  // }
  constructor(props) {
    super(props);
    this.state = { cx: 0, cy: 0 };
    this.handleDrag = this.handleDrag.bind(this);
  }
  handleDrag(a,b,c,d) {
    this.setState({cx: a.clientX, cy: a.clientY})
  }
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <Draggable onDrag={this.handleDrag}>
              <div className='bg-red with-border draggable-container' id='container-1'>
                <Draggable onDrag={this.handleDrag}>
                  <div className='inner-container with-border bg-green'>
                    <span>1) left</span>
                  </div>
                </Draggable>
                <Draggable onDrag={this.handleDrag}>
                  <div className='inner-container with-border bg-green'>
                    <span>2) left</span>
                  </div>
                </Draggable>
                <div className='container-cover bg-blue with-border middle-2 hidden'>
                  <div className='middle-container draggable-container'>
                    <div className='inner-container with-border bg-green'>
                      <span>3) left</span>
                    </div>
                    <div className='inner-container with-border bg-green'>
                      <span>4) left</span>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div className='col-md-3'>
            <Draggable onStop={function(a,b,c,d,e,f) {
              console.log('moved right container');
            }}>
              <div  className='bg-red with-border draggable-container' id='container-2'>
                <div className='inner-container with-border bg-green'>
                  <span>1) right</span>
                </div>
                <div className='inner-container with-border bg-green'>
                  <span>2) right</span>
                </div>
                <div className='container-cover bg-blue with-border middle-2 hidden'>
                  <div className='middle-container draggable-container'>
                    <div className='inner-container with-border bg-green'>
                      <span>3) right</span>
                    </div>
                    <div className='inner-container with-border bg-green'>
                      <span>4) right</span>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-3'>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3'>
            <Draggable onStop={function(a,b,c,d,e,f) {
              console.log('moved bottom container');
            }}>
              <div className='bg-red with-border draggable-container' id='container-3'>
                <div className='inner-container with-border bg-green'>
                  <span>1) down</span>
                </div>
                <div className='inner-container with-border bg-green'>
                  <span>2) down</span>
                </div>
                <div className='container-cover bg-blue with-border middle-2 hidden'>
                  <div className='middle-container draggable-container'>
                    <div className='inner-container with-border bg-green'>
                      <span>3) down</span>
                    </div>
                    <div className='inner-container with-border bg-green'>
                      <span>4) down</span>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-3'>
          </div>
          <div className='col-md-3'>
          </div>
        </div>
        <div className='row'>
          <h3> X: {this.state.cx}  Y: {this.state.cy}</h3>
        </div>
      </div>
    );
  }
}