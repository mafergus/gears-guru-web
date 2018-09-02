import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Presentation from 'components/landing/presentation/JumboSection';
import { withBrowser } from 'util/withBrowser';

function compare(a,b) {
  return (a.make < b.make) ? -1 : ((a.make > b.make) ? 1 : 0);
}

function mapStateToProps(state, props) {
  return {
    allMakes: state.cars,
  };
}

class JumboSection extends React.Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      models: [],
      selectedMake: "",
      selectedModel: "",
    };
  }

  handleChangeMake = uid => {
    const { allMakes } = this.props;
    this.setState({ models: allMakes[uid].models, selectedMake: uid });
  }

  handleChangeModel = uid => {
    this.setState({ selectedModel: uid });
  }

  onSubmit = () => {};

  render() {
    const { allMakes, browser } = this.props;
    const { models, selectedMake, selectedModel } = this.state;
    const makesArr = Object.values(allMakes).sort(compare);

    return (
      <Presentation
        allMakes={makesArr}
        models={models}
        browser={browser}
        selectedMake={selectedMake}
        selectedModel={selectedModel}
        handleChangeMake={this.handleChangeMake}
        handleChangeModel={this.handleChangeModel}
        onSubmit={() => {}}
      />
    );
  }
}

export default connect(mapStateToProps)(withBrowser(JumboSection));