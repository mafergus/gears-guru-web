import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SimpleMap from 'components/map/SimpleMap';
import Checkbox from '@material-ui/core/Checkbox';

import MapMarker from 'components/map/MapMarker';
import { AL_QUOZ_LOCATION } from 'util/constants';
import { flatten } from 'util/helpers';
 
class Sidebar extends React.Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    garages: PropTypes.array.isRequired,
    class: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    class: '',
    style: {}
  };

  handleChange = category => {
    const { currentVal } = this.state[category.uid];
    let newState = {};
    newState[category.uid] = !
    this.setState({ });

  }

  render() {
    const { categories, garages } = this.props;
    const catty = Object.entries(categories).map(entry => {
    const [ uid, obj ] = entry;
      return { uid, ...obj};
    });
    const locations = garages.map(garage => ({ uid: garage.uid, ...garage.geometry.location }));

    return (
      <div style={{ width: "33%", padding: 15 }}>
       
        <SimpleMap
          style={{ width: "100%", height: 200 }}
          center={{ lat: AL_QUOZ_LOCATION[0], lng: AL_QUOZ_LOCATION[1] }}
          options={{ scrollwheel: false }}
        >
          {locations.map(item => <MapMarker key={item.garageUid} lat={parseFloat(item.lat)} lng={parseFloat(item.lng)}/>)}
        </SimpleMap>

        <h3>Categories</h3>
        {catty.map(category => {
          return (
            <div>
              <Checkbox
                checked={true}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
                style={{ padding: 6 }}
              />
              {category.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(state => ({ categories: flatten(state.categories) }))(Sidebar);
