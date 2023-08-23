/*  this file is used to connect to the firebase database
    the database is structured as follows:
    db = {
        bars: [bar object1,2,3],   // all bars
        allReviews: [review object 1,2,3],    //all reviews
        users:[user object1,2,3],   //all users
    };

    bar object identified by randomly generated ID by firestore = {
        name,
        address,
        reviwesForBar: [review obj ID], array of string that contains the review ID
    }

    review object identified by randomly generated ID by firestore= {
        upvotes,
        downvotes,
        message,
        postedBy: user name as string,
        bar: bar name as string,
    }

    user object identified by randomly generated ID by firestore = {
        name,  
        email,
        reviewsForUser: [review object ID], array of string that contains the review ID
        savedBars: [bar object ID], array of string that contains the bar ID
    }
*/

import { QueryBuilder } from "@material-ui/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyC-ZqoS2imk7Dhzjr0JBm6o5jp8uXsH5ZE",
  authDomain: "milestone3-winning-team.firebaseapp.com",
  projectId: "milestone3-winning-team",
  storageBucket: "milestone3-winning-team.appspot.com",
  messagingSenderId: "55840998385",
  appId: "1:55840998385:web:d3fff9e2ad20b8e427fa50",
};

firebase.initializeApp(config);
const db = firebase.firestore();

// create new user account, need to check for duplicates
export const createUser = async (user) => {
  // check if the user already exists
  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", user.email)
      .get();
    if (querySnapshot.size > 0) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
  // if not, add to db
  await db.collection("users").add({
    name: user.name,
    email: user.email,
    reviewsForUser: [],
    savedBars: [],
  });
};

export const getUserIdByEmail = async (email) => {
  const querySnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  let userId;
  querySnapshot.forEach((doc) => {
    userId = doc.id;
  });
  return userId;
};

// create a review by a user for a bar
export const createReview = async (review) => {
  await db.collection("allReviews").add({
    upvotes: 0,
    downvotes: 0,
    message: review.message,
    postedBy: review.postedBy,
    bar: review.bar,
  });
};

// save favorite bar given user and bar object
export const saveBar = async (userId, bar) => {
  await db
    .collection("bars")
    .doc(bar.id)
    .update({ savedBy: firebase.firestore.FieldValue.arrayUnion(userId) });
};

// get saved bars for a given user, returns a list of bar idss
export const getSavedBars = async (userId) => {
  const querySnapshot = await db
    .collection("bars")
    .where("savedBy", "array-contains", userId)
    .get();
  let results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

// get a specific bar by its id
export const getBar = async (id) => {
  const querySnapshot = await db
    .collection("bars")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
    });
  return querySnapshot;
};

//  upvote and downvote a review -> wait if i update the review obj does it update everything? cuz i'm using reference everywhere
export const upVote = async (review) => {
  await db
    .collection("allReviews")
    .doc(review.id)
    .update({
      upvotes: firebase.firestore.FieldValue.increment(1),
    });
  const querySnapshot = await db
    .collection("allReviews")
    .doc(review.id)
    .collection("upvotes")
    .get();
  return querySnapshot;
};

export const downVote = async (review) => {
  await db
    .collection("allReviews")
    .doc(review.id)
    .update({
      downvotes: firebase.firestore.FieldValue.increment(1),
    });
  const querySnapshot = await db
    .collection("allReviews")
    .doc(review.id)
    .collection("downvotes")
    .get();
  return querySnapshot;
};

// get all reviews for a given bar
export const getAllReviewsForBar = async (barName) => {
  const querySnapshot = await db
    .collection("allReviews")
    .where("bar", "==", barName)
    .get();
  let results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

// get all reviews for a given user
export const getAllReviewsForUser = async (user) => {
  const querySnapshot = await db
    .collection("allReviews")
    .where("postedBy", "==", user.displayName)
    .get();
  let results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

// get all bars
export const getAllBars = async () => {
  const querySnapshot = await db.collection("bars").get();
  let results = [];
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return results;
};

// given a review object, delete it from allReviews, ueser's reviewsForUser, and bar's reviewsForBar
export const deleteReview = async (review) => {
  try {
    // Q: can we do multiple await here?
    await db.collection("allReviews").doc(review.id).delete();
    await db
      .collection("users")
      .doc(review.postedBy.id)
      .update({
        reviewsForUser: firebase.firestore.FieldValue.arrayRemove(review),
      });
    await db
      .collection("bars")
      .doc(review.bar.id)
      .update({
        reviewsForBar: firebase.firestore.FieldValue.arrayRemove(review),
      });
  } catch (err) {
    console.log(err);
  }
};

// delete a saved bar
export const deleteBar = async (user, bar) => {
  try {
    await db
      .collection("users")
      .doc(user.id)
      .update({
        savedBars: firebase.firestore.FieldValue.arrayRemove(bar),
      });
  } catch (err) {
    console.log(err);
  }
};
