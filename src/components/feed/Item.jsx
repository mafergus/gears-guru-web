import React from "react";
import PropTypes from 'prop-types';
import { textDark } from "util/colors";
import Moment from "moment";
import { USER_PLACEHOLDER } from "util/constants";

const IMG_STYLE = {
  height: 50,
  width: 50,
  margin: "0 10px 10px 10px",
  marginRight: "20px",
  borderRadius: "50%",
  verticalAlign: "top",
};

export default function Item({ style, imageStyle, message, username, image, timestamp }) {
  const moment = new Moment(timestamp);
  return <div style={{ display: "flex", ...style }}>
    <div style={{ height: "100%" }}>
      <img alt="User" style={{ ...IMG_STYLE, ...imageStyle }} src={image} />
    </div>
    <div style={{ height: "100%", flexGrow: "1" }}>
      <div style={{ marginBottom: "0.6em" }}>
        <span style={{ fontSize: "0.9em", fontFamily: "Roboto-Medium" }}>{username}</span>
        <span style={{ float: "right", color: textDark.tertiary, fontWeight: "500", fontSize: "0.75em" }}>{moment.fromNow()}</span>
      </div>
      <span>{message}</span>
    </div>
  </div>;
}

Item.propTypes = {
  timestamp: PropTypes.string.isRequired,
  imageStyle: PropTypes.object,
  message: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string,
  style: PropTypes.object,
};

Item.defaultProps = {
  style: {},
  imageStyle: {},
  message: "Deleted Content",
  username: "Deleted User",
  image: USER_PLACEHOLDER,
};