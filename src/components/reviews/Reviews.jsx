import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import autoBind from "react-autobind";
import ReviewsContainer from "components/reviews/ReviewsContainer";
import ReviewsItem from "components/reviews/ReviewsItem";
import { addReviewMessage, addReviewMessageReply } from "util/api";

function mapStateToProps(state, props) {
  const rawReviews = state.reviews[props.reviewsId] || [];
  const reviews = [];
  rawReviews.forEach((item, key) => { 
    reviews.push({ id: key, ...item });
  });
  const users = {};
  reviews.forEach(item => { users[item.userId] = state.users.get(item.userId); });
  return {
    authedUser: state.authedUser,
    reviews,
    users,
  };
}

export class Reviews extends React.Component {

  static propTypes = {
    authedUser: PropTypes.object,
    reviewsId: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
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
    const { authedUser, reviewsId } = this.props;
    addReviewMessage(reviewsId, authedUser.uid, text, new Date());
  }

  sendReply(reviewItemId, text) {
    const { authedUser, reviewsId } = this.props;
    addReviewMessageReply(reviewsId, reviewItemId, authedUser.uid, text, new Date());
  }

  render() {
    const { reviews, authedUser, users } = this.props;
    return <ReviewsContainer
      authedUserPhoto={authedUser.photo}
      onSendMessage={this.sendMessage}
      hideMessageBar={!authedUser.hasOwnProperty("uid")}
    >
      {reviews.map(item => {
        const user = users[item.userId];
        return <ReviewsItem
          key={item.id}
          authedUserPhoto={authedUser.photo}
          reviewsItem={item}
          username={user.name}
          image={user.photo}
          onReply={this.sendReply}
        />;
      })}
    </ReviewsContainer>;
  }
}

export default connect(mapStateToProps)(Reviews);