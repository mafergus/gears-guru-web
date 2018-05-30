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
    const { middle } = this.state;
    const item = middle > 2 ? Math.floor(middle - 2, 2) : 2;
    const tesNode = ReactDOM.findDOMNode(this.refs[`node${item}`]);
    debugger;
    tesNode.scrollIntoView();
    this.setState({ middle: item });
  };

  rightArrowClick = () => {
    const { middle } = this.state;
    const item = middle < 11 ? Math.floor(middle + 2, 11) : 11;
    const tesNode = ReactDOM.findDOMNode(this.refs[`node${item}`]);
    debugger;
    tesNode.scrollIntoView();
    this.setState({ middle: item });
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
            data.map((item, index) => <Image ref={`node${index}`} data={item} number={index } style={{ marginRight: 10 }}/>)
          }
        </ul>
        <div style={{ height: 70, width: 60, backgroundColor: "blue", position: "absolute", right: 0, top: 0 }} onClick={this.rightArrowClick}>
        </div>
      </div>
    );
  }
}