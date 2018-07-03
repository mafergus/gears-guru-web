import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { ShippingIcon, Search } from 'util/Glyphs';

import { secondary } from 'util/colors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    color: "white",
    fontSize: "1em",
  },
});

const GLYPH_STYLE = {
  height: 17,
  width: 17,
  color: "white",
  marginLeft: 9,
  marginRight: 1,
};

class ServicesList extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };
  
  handleClick = () => {

  };

  renderChip = service => {
    const { classes } = this.props;
    return (
      <Chip
        avatar={<img src="https://firebasestorage.googleapis.com/v0/b/gears-guru-991bc.appspot.com/o/icons%2Ficon-shipping.svg?alt=media&token=25b5fcc4-8490-43df-84fb-52f4fefe9d0e" style={GLYPH_STYLE} />}
        label={service.name}
        labelStyle={{ color: "white" }}
        textColor="white"
        onClick={this.handleClick}
        style={{ margin: 5, backgroundColor: secondary[500], textColor: "white" }}
        className={classes.chip}
      />
    );
  };

  render() {
    const { categories, style } = this.props;

    return (
      <div style={{ ...style }}>
        {categories.map(item => this.renderChip(item))}
      </div>
    );
  }
}

export default withStyles(styles)(ServicesList);