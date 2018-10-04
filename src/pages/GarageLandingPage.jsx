import React from 'react';
import { connect } from 'react-redux';

import JumboSection from 'components/garage-landing/presentation/JumboSection';
import RegisterGarageModal from 'components/garage-landing/RegisterGarageModal';

const styles = {
  container: {
    width: "100%",
    zIndex: -1,
    marginTop: -64,
  },
};

class GarageLandingPage extends React.Component {

  state = {
    isModalOpen: false,
  };

  handleClickOpen = () => this.setState({ isModalOpen: true });

  handleClose = () => this.setState({ isModalOpen: false });

  render() {
    const { browser } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div style={styles.container}>
        <JumboSection
          browser={browser}
          onSignupClick={this.handleClickOpen}
        />
        <RegisterGarageModal
          isOpen={isModalOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default connect(state => ({ browser: state.browser }))(GarageLandingPage);