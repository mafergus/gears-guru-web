import React from 'react';
import Grid from '@material-ui/core/Grid';

import { BalanceSheet, Places, Shield } from 'util/Glyphs';
import { text } from 'util/colors';

const styles = {
  gridContainer: { 
    width: "100%",
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 45,
    width: 45,
    marginTop: 10,
    marginBottom: 30
  },
  title: {
    marginBottom: 40,
    fontWeight: 500,
    fontSize: "1em",
    color: "#4A5155"
  },
  body: { 
    textAlign: "center",
    color: text.gray,
    fontSize: "1em",
    fontWeight: 300,
    lineHeight: 1.5
  },
}

export default function BoxesSection({ style }) {

  const renderBox = (image, title, text) => {
    const Image = image;

    return (
      <Grid 
        item
        xs={12}
        sm={8}
        md={4}
        lg={3} 
        style={styles.itemContainer}
      >
        <Image style={styles.image} />
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.body}>{text}</p>
      </Grid>
    );
  };

  return (
    <Grid 
      style={{ ...styles.gridContainer, ...style }}
      container
    >
      {renderBox(
        Places,
        "WE MAKE IT EASY",
        "Get a quote and book a service online 24/7. Our mechanics will come to your home or office, even on evenings and weekends."
      )}
      {renderBox(
        BalanceSheet,
        "FAIR AND TRANSPARENT PRICING",
        "We offer fair and transparent pricing and provide estimates upfront for hundreds of services on thousands of cars. Book with confidence."
      )}
      {renderBox(
        Shield,
        "HAPPINESS GUARANTEED",
        "We only work with highly rated mechanics. All services are backed by our 12-month / 12,000-mile warranty."
      )}
    </Grid>
  );
}