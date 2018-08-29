import React from 'react';
import Grid from '@material-ui/core/Grid';

import { primary } from 'util/colors';

const BP = {
  sm: 11,
  md: 10,
  lg: 8,
};

export default function Footer({ style, browser }) {
  const STYLE = {
    footer: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: primary[500],
      paddingTop: 40,
    },
    footerContainer: {
      display: "flex",
      paddingBottom: 50,
    },
    footerInnerContainer: {
      display: "flex",
      justifyContent: "left",
    },
    postFooter: {
      width: "100%",
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: primary[700],
      text: {
        color: primary[300],
      },
    },
  };
  
  const PostFooter = ({ style }) => {
    return (
      <Grid container style={style}>
        <Grid
          item
          sm={BP.sm}
          md={BP.md}
          lg={BP.lg}
        >
          <PostFooter.Title>Gears Guru © 2018. Made for the UAE, with love in Silicon Valley</PostFooter.Title>
        </Grid>
      </Grid>
    );
  };

  PostFooter.Title = ({ style, children }) => {
    return <p style={{ ...STYLE.postFooter.text, ...style }}>{children}</p>;
  }

  const Footer = ({ style, children }) => {
    return (
      <Grid
        item
        sm={BP.sm}
        md={BP.md}
        lg={BP.lg}
        style={{ ...style, ...STYLE.footerContainer }}
      >
        <Grid container style={STYLE.footerInnerContainer}>
          {children}
        </Grid>
      </Grid> 
    );

  }

  const Section = ({ style, children }) => {
    return (
      <Grid
        item
        xs={6}
        md={3}
        lg={2}
        style={style}
      >
        {children}
      </Grid>
    );
  };

  Section.Title = ({ style, children }) => {
    return <h4 style={{ fontWeight: 400, marginBottom: 20, color: "white", ...style }}>{children}</h4>;
  };

  Section.Link = ({ children, to }) => {
    return (
      <div style={{ marginTop: 5, marginBottom: 5 }}>
        <a className="sm" style={{ fontWeight: 300, color: "white" }} href={to}>{children}</a>
      </div>
    );
  };

  const marginTop = browser.lessThan.large ? 50 : 0;

  return (
    <Grid container style={{ ...style, ...STYLE.footer }}>
      <Footer>
        <Section>
          <Section.Title>Gears Guru</Section.Title>
          <Section.Link>About Us</Section.Link>
          <Section.Link>Press</Section.Link>
          <Section.Link>Blog</Section.Link>
          <Section.Link>Careers</Section.Link>
        </Section>

        <Section>
          <Section.Title>For Mechanics</Section.Title>
          <Section.Link>Partner with Us</Section.Link>
          <Section.Link>Download App</Section.Link>
          <Section.Link>Mechanic Home</Section.Link>
        </Section>

        <Section style={{ marginTop }}>
          <Section.Title>Terms</Section.Title>
          <Section.Link>Privacy Policy</Section.Link>
          <Section.Link>Terms of Use</Section.Link>
        </Section>

        <Section style={{ marginTop }}>
          <Section.Title>Social</Section.Title>
          <Section.Link>Angel List</Section.Link>
          <Section.Link>Facebook</Section.Link>
          <Section.Link>LinkedIn</Section.Link>
          <Section.Link>Twitter</Section.Link>
          <Section.Link>Instagram</Section.Link>
        </Section>
      </Footer>
      <PostFooter style={STYLE.postFooter} />
    </Grid>
  );
}