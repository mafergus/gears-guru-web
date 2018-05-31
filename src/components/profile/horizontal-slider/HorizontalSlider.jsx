import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Image from 'components/profile/horizontal-slider/Image';

const INTERVAL = 2;

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
  
  render() {
    const { data, style } = this.props;

    return (
      <div style={{ height: 220, width: "100%", overflow: "hidden", ...style }}>
        <div style={{ height: 70, width: 60, backgroundColor: "blue", position: "absolute", left: 0, top: 0 }} onClick={this.leftArrowClick}>
        </div>
        <ul style={{ 
          height: 200,
          overflowX: "scroll",
          overflowY: "hidden",
          listStyle: "none",
          margin: 0,
          padding: 5,
          textAlign: "left",
          whiteSpace: "nowrap",
        }}>
          {
            data.map((item, index) => <Image ref={`node${index}`} src={item} number={index } style={{ marginRight: 10 }}/>)
          }
        </ul>
        <div style={{ height: 70, width: 60, backgroundColor: "blue", position: "absolute", right: 0, top: 0 }} onClick={this.rightArrowClick}>
        </div>
      </div>
    );
  }
}