import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Footer, PostFooter, Section, Title, Link } from 'gg-common';

import { primary } from 'util/colors';

const mapStateToProps = (state, props) => {
  return {
    browser: state.browser,
  };
}

function GGFooter({ browser }) {
  if (!browser) { return null; }

  const STYLE = {
    footer: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: primary[500],
      paddingTop: 40,
    },
  };
  
  const marginTop = browser.lessThan.large ? 50 : 0;

  return (
    <Grid container style={{ ...STYLE.footer }}>
      <Footer>
        <Section>
          <Title>Gears Guru</Title>
          <Link>Contact Us</Link>
          <Link>About Us</Link>
          <Link>Press</Link>
          <Link>Blog</Link>
          <Link>Careers</Link>
        </Section>

        <Section>
          <Title>For Mechanics</Title>
          <Link>Partner with Us</Link>
          <Link>Download App</Link>
          <Link>Mechanic Home</Link>
        </Section>

        <Section style={{ marginTop }}>
          <Title>Terms</Title>
          <Link>Privacy Policy</Link>
          <Link>Terms of Use</Link>
        </Section>

        <Section style={{ marginTop }}>
          <Title>Social</Title>
          <Link>Angel List</Link>
          <Link>Facebook</Link>
          <Link>LinkedIn</Link>
          <Link>Twitter</Link>
          <Link>Instagram</Link>
        </Section>
      </Footer>
      <PostFooter />
    </Grid>
  );
}

export default connect(mapStateToProps)(GGFooter);