import React from 'react';

import jumboImage from 'assets/hero.jpg';

const styles = {
  heroContainer: { 
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 600,
    width: "100%",
  },
  heroImage: {
    width: "100%",
    height: 600,
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function JumboSection() {
  return (
    <div style={styles.heroContainer}>
      <img src={jumboImage} style={styles.heroImage}/>
      <div style={styles.heroImageOverlay}></div>
      <div style={styles.innerContainer}>
        <h1 style={{ color: "white", fontSize: "2.5em", fontWeight: 400 }}>FIND THE BEST MECHANICS IN DUBAI</h1>
        <h3 style={{ color: "white", fontWeight: 400, marginTop: 25 }}>Fast. Verified. Best Price.</h3>
        <div style={{ display: "flex", marginTop: 130 }}>
          <div style={{ backgroundColor: "white", height: 50, width: 225, marginRight: 7 }}></div>
          <div style={{ backgroundColor: "white", height: 50, width: 225, marginRight: 7 }}></div>
          <div style={{ backgroundColor: "purple", height: 50, width: 175 }}></div>
        </div>
      </div>
    </div>
  );
}