import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Image from 'components/profile/horizontal-slider/Image';
import LeftArrow from 'assets/left-arrow.png';
import RightArrow from 'assets/right-arrow.png';

export default class HorzontalSlider extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    data: [],
    style: {},
  };

  constructor() {
    super();
    this.state = {
      first: 0,
      middle: 2,
      last: 4,
    };
  }

  leftArrowClick = () => {
    const { first } = this.state;
    const newFirst = first-2 < 0 ? 0 : first-2;
    const tesNode = ReactDOM.findDOMNode(this.refs[`node${newFirst}`]);
    tesNode.scrollIntoView({ behavior: "smooth" })
    this.setState({ 
      first: newFirst,
      middle: newFirst + 2,
      last: newFirst + 4,
    });
  };

  rightArrowClick = () => {
    const { data } = this.props;
    const { last } = this.state;
    const newLast = last + 2 > data.length-1 ? data.length-1 : last + 2;
    const tesNode = ReactDOM.findDOMNode(this.refs[`node${newLast}`]);
    tesNode.scrollIntoView({ behavior: "smooth" });
    const newFirst = newLast-4 < 0 ? 0 : newLast-4;
    this.setState({ 
      first: newFirst,
      middle: newFirst+2,
      last: newLast,
    });
  };

  renderLeftArrow = () => {
    return (
      <div 
        style={{ height: 50, width: 25, position: "absolute", left: 0, top: 80 }}
        onClick={this.leftArrowClick}
      >
        <img src={LeftArrow} style={{ width: "100%", height: "100%" }} alt="Left Arrow" />
      </div>
    );
  };

  renderRightArrow = () => {
    return (
      <div
        style={{ height: 50, width: 25, position: "absolute", right: 0, top: 80 }}
        onClick={this.rightArrowClick}
      >
        <img src={RightArrow} style={{ width: "100%", height: "100%" }} alt="Right Arrow" />
      </div>
    );
  }
  
  render() {
    const { data, style } = this.props;

    return (
      <div style={{ width: "100%", overflow: "hidden", ...style }}>
        {this.renderLeftArrow()}
        <ul style={{ 
          height: 210,
          overflowX: "scroll",
          overflowY: "hidden",
          listStyle: "none",
          margin: 0,
          padding: 5,
          textAlign: "left",
          whiteSpace: "nowrap",
        }}>
          {
            data.map((item, index) => <Image ref={`node${index}`} src={item} number={index} style={{ marginRight: 10 }}/>)
          }
        </ul>
        {this.renderRightArrow()}
      </div>
    );
  }
}