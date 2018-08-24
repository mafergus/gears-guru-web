import React from 'react';

import { text, darkGray, gray }  from 'util/colors';
import screenshot from 'assets/screenshot.png';

const TITLE = "Enjoy convenient car repair and maintenance at your home or office. It's as easy as 1-2-3."
const TEXT1 = "GET A QUOTE Tell us what your car needs or ask for a diagnostic. Receive a free, fast, fair & transparent price quote. 2 BOOK APPOINTMENT Provide your home or office location. Tell us when to meet you there. 3 GET YOUR CAR FIXED That’s it. No more waiting in repair shops - our mechanics come to you";
const styles = {
  container: {
    width: "100%",
    height: 650,
    padding: 20,
    backgroundColor: "#FAFBFC"
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: "1.6em",
    color: text.darkGray,
    marginTop: 50,
    marginBottom: 50
  },
  image: {
    width: "50%",
    height: 400,
    objectFit: "contain",
  },
  section: {
    container: {
      marginTop: 35,
      marginBottom: 35
    },
    title: {
      color: darkGray,
      fontWeight: 400,
      marginBottom: 10
    },
    text: { 
      width: 500,
      color: gray,
      fontWeight: 300
    },
  }
};

export default function ScreenshotSection(browser) {

  const renderText = (title, text) => {
    return (
      <div style={styles.section.container}>
        <h4 style={styles.section.title}>{title}</h4>
        <h4 style={styles.section.text}>{text}</h4>
      </div>
    );
  };

  return (
    <div style={styles.container}>

      <h3 style={styles.title}>Life's too short to spend it at the repair shop</h3>

      <div style={{ display: "flex" }}>
        <img style={styles.image} src={screenshot} />
        <div style={{ width: "50%", padding: 20 }}>
          <h4 style={{ color: text.gray, fontWeight: 300 }}>{TITLE}</h4>
          <br />
          {renderText("GET A QUOTE", "Tell us what your car needs or ask for a diagnostic. Receive a free, fast, fair & transparent price quote.")}
          {renderText("BOOK APPOINTMENT", "Provide your home or office location. Tell us when to meet you there.")}
          {renderText("GET YOUR CAR FIXED", "That’s it. No more waiting in repair shops - our mechanics come to you")}
        </div>
      </div>

    </div>
  );
}