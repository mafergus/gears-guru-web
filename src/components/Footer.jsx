import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { PostFooter, Section, Title, Link, Footer } from 'gg-common/footer';
import { primary } from 'gg-common/colors';

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
          <Link to="https://angel.co/gears-guru/jobs" target="_blank">Careers</Link>
        </Section>

        <Section>
          <Title>For Mechanics</Title>
          <Link>Partner with Us</Link>
          <Link>Download App</Link>
          <Link>Mechanic Home</Link>
        </Section>

        <Section style={{ marginTop }}>
          <Title>Terms</Title>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </Section>

        <Section style={{ marginTop }}>
          <Title>Social</Title>
          <Link to="https://angel.co/gears-guru" target="_blank">Angel List</Link>
          <Link to="https://web.facebook.com/The.Gears.Guru/" target="_blank">Facebook</Link>
          <Link>LinkedIn</Link>
          <Link to="https://twitter.com/gears_guru" target="_blank">Twitter</Link>
          <Link to="https://www.instagram.com/gears.guru.official/" target="_blank">Instagram</Link>
        </Section>
      </Footer>
      <PostFooter />
    </Grid>
  );
}

export default connect(mapStateToProps)(GGFooter);