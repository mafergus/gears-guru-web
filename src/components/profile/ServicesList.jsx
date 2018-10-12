import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
        key={service.name}
        avatar={
          <img 
            src={service.icon}
            style={GLYPH_STYLE}
            alt="" 
          />
        }
        label={service.name}
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