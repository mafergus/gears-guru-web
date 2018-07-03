import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import autoBind from "react-autobind";
import Feed from "components/feed/Feed";
import FeedItem from "components/feed/FeedItem";
import { addFeedMessage, addFeedMessageReply } from "util/api";

function mapStateToProps(state, props) {
  const rawFeed = state.feeds[props.feedId] || [];
  const feed = [];
  rawFeed.forEach((item, key) => { 
    feed.push({ id: key, ...item });
  });
  const users = {};
  feed.forEach(item => { users[item.userId] = state.users.get(item.userId); });
  return {
    authedUser: state.authedUser,
    feed,
    users,
  };
}

export class FeedContainer extends React.Component {

  static propTypes = {
    authedUser: PropTypes.object,
    feedId: PropTypes.string.isRequired,
    feed: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
  };

  static defaultProps = {
    authedUser: {
      photo: "https://firebasestorage.googleapis.com/v0/b/erfara-2aa21.appspot.com/o/placeholder.png?alt=media&token=3bc07900-7743-4936-b877-fce51a0e4903"
    }
  };
  
  constructor() {
    super();
    autoBind(this);
  }

  sendMessage(text) {
    const { authedUser, feedId } = this.props;
    addFeedMessage(feedId, authedUser.uid, text, new Date());
  }

  sendReply(feedItemId, text) {
    const { authedUser, feedId } = this.props;
    addFeedMessageReply(feedId, feedItemId, authedUser.uid, text, new Date());
  }

  render() {
    const { feed, authedUser, users } = this.props;
    return <Feed
      authedUserPhoto={authedUser.photo}
      onSendMessage={this.sendMessage}
      hideMessageBar={!authedUser.hasOwnProperty("uid")}
    >
      {feed.map(item => {
        const user = users[item.userId];
        return <FeedItem
          key={item.id}
          authedUserPhoto={authedUser.photo}
          feedItem={item}
          username={user.name}
          image={user.photo}
          onReply={this.sendReply}
        />;
      })}
    </Feed>;
  }
}

export default connect(mapStateToProps)(FeedContainer);