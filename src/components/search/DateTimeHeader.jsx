import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import qs from 'qs';
import { Button } from 'gg-common';
import { DateSelect, TimeSelect } from 'components/ui/selects';
import { primary, dividerColor } from 'gg-common/colors';

import SearchBgImage from 'assets/search-header-bg.jpg';

const STYLE = {
  container: {
    width: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 0px",
    backgroundImage: `url(${SearchBgImage})`,
    backgroundSize: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: primary[500],
    opacity: 0.5,
  },
  innerContainer: {
    width: "67%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
  },
  ts: {
    borderLeft: `1px solid ${dividerColor}`
  },
  button: {
    height: 45,
    width: "100%"
  },
}

export default class DateTimeHeader extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  render() {
    const values = qs.parse(this.props.location.search);

    return (
      <div style={STYLE.container}>
        <div style={STYLE.overlay} />
        <Grid container style={STYLE.innerContainer}>
          <DateSelect
            width={300}
            onChange={() => {}}
            value={new Date(values.date)}
          />
          <TimeSelect
            style={STYLE.ts}
            width={300}
            onChange={() => {}}
            value={new Date(values.time)}
          />
          <Grid
            xs={10}
            md={2}
            item
          >
            <Button
              style={STYLE.button}
              variant="square"
              onClick={() => {}}
            >SEARCH</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
