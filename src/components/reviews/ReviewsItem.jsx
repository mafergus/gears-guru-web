import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import autoBind from "react-autobind";
import TextField from '@material-ui/core/TextField';
import Item from "components/reviews/Item";

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

class ReviewsItem extends React.Component {

  static propTypes = {
    authedUserPhoto: PropTypes.string.isRequired,
    reviewItem: PropTypes.object.isRequired,
    onReply: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    autoBind(this);

    this.state = {
      isReplyOpen: false,
      reply: "",
    };
  }

  onKeyPress(event) {
    const { onReply, reviewItem } = this.props;
    if (event.charCode === 13 && this.state.reply.length > 2) { // enter key pressed
      onReply(reviewItem.id, this.state.reply);
      this.setState({ 
        reply: "",
        isReplyOpen: false,
      });
    } 
  }

  renderReplyBox() {
    const { authedUserPhoto } = this.props;
    return (
      <div
        className="border"
        style={{ display: "flex", alignItems: "center", height: 50, marginBottom: 15, marginLeft: 70 }}
      >
        <img
          alt="You" 
          style={{ height: 30, width: 30, margin: "0px 7px 0px 12px", borderRadius: "50%" }}
          src={authedUserPhoto}
        />
        {/*<TextField 
          hintText="Reply"
          hintStyle={{ fontSize: "0.9em" }}
          inputStyle={{ color: erfaraBlack }}
          underlineShow={false}
        />*/}
        <TextField
          style={{ flexGrow: "1", margin: "0px 15px" }}
          placeholder="Reply"
          label="Reply"
          onChange={(event, value) => { this.setState({ reply: value }); }}
          value={this.state.reply}
          autoFocus
        />
      </div>
    );
  }

  renderReplies(replies) {
    const { users } = this.props;
    const replyItems = Object.entries(replies).map(item => { 
      const user = users.get(item[1].userId);
      return <Item
        key={item[0]}
        style={{ padding: "1em 0em" }}
        imageStyle={{ height: 30, width: 30}}
        username={user.name}
        image={user.photo}
        message={item[1].message}
        timestamp={item[1].timestamp}
      />;
    });
    return <div style={{ padding: "0.5em 0em 0.5em 70px", fontSize: "0.9em" }}>
      {replyItems}
    </div>;
  }

  render() {
    const { reviewItem, username, image } = this.props;
    return <div style={{ padding: "15px 0px 15px 0px", width: "100%" }}>
      <Item
        message={reviewItem.message}
        username={username}
        image={image}
        timestamp={reviewItem.timestamp}
      />
      {reviewItem.replies && this.renderReplies(reviewItem.replies)}
      <div style={{ padding: "1em 0em 1em 80px", fontSize: "0.9em" }}>
        <span
          className="reply-box"
          onTouchTap={() => this.setState({ isReplyOpen: !this.state.isReplyOpen })}
        >
          Reply
        </span>
      </div>
      {this.state.isReplyOpen && this.renderReplyBox()}
      <hr />
    </div>;
  }
}

export default connect(mapStateToProps)(ReviewsItem);
