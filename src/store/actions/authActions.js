import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const signInWithEmailAndPassword = (email, password) => async (dispatch) => {
  dispatch({ type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS' });

  // const state = getState();
  // const lang = state.app.lang;

  await auth().signInWithEmailAndPassword(email, password)
    .then((resp) => {
      dispatch({ type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS' });

      return resp.user;
    })
    .then((user) => {
      console.log('User signed in!', user);
      // const {uid, email, metadata} = user;

      //
      // const {creationTime, lastSignInTime} = metadata;

      // mixpanel.identify(uid);
      // mixpanel.people.set({
      // "$email": email,
      // "$lang": lang, '$creationTime': creationTime, '$lastSignInTime': lastSignInTime
      // });
      // mixpanel.people.increment("logInCompleted", 1);
    })
    .catch((error) => {
      dispatch(
        {
          type: 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_ERROR',
          data: { error: error.message, code: error.code },
        },
      );
      throw new Error(error);
    });
};
//
// export const checkEmailVerified = () => async (dispatch) => {
//     const user = firebase.auth().currentUser;
//
//     if (user) {
//         if (user.emailVerified) {
//             dispatch({type: 'EMAIL_IS_VERIFIED'});
//         }
//         dispatch(isModeratorCheck());
//     }
// };

export const signInWithGoogle = async () => {
  const { idToken } = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
};

// export const signUpWithEmailAndPassword = (email, password) => async (dispatch, getState) => {
//     const db = firebase.firestore();
//
//     dispatch({type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS'});
//
//     const state = getState();
//     const initialProfileData = state.profile.data;
//     // const lang = state.app.lang;
//
//     await firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((resp) => {
//             dispatch({type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS'});
//             dispatch({type: 'SEND_EMAIL_VERIFICATION_IN_PROGRESS'});
//
//             return resp.user;
//         })
//         .then(async (user) => {
//             const {uid, metadata} = user;
//
//             const {creationTime} = metadata;
//
//             // mixpanel.identify(uid);
//             // mixpanel.people.set({
//             "$email": email,
//             "$lang": lang,
//             '$creationTime': creationTime, '$lastSignInTime': lastSignInTime});
//
//             const userProfile = db.collection('users').doc(`${uid}`);
//             await userProfile.set({...initialProfileData, creationTime: creationTime})
//                 .catch(function (error) {
//                     console.error('Error uploaded document: ', error);
//                 });
//         })
//         .catch(function (error) {
//             dispatch({type: 'SEND_EMAIL_VERIFICATION_ERROR'});
//             dispatch({
//             type: 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_ERROR',
//             data: {error: error.message, code: error.code}});
//             throw new Error();
//         })
// };
//
export const logout = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT_IN_PROGRESS' });

  await auth().signOut().then(() => {
    console.log('User is signed out!');
  });
};
//
// export const isModeratorCheck = () => async (dispatch) => {
//     await firebase.auth().currentUser.getIdTokenResult().then((token) => {
//         const isModerator = token?.claims?.moderator;
//         dispatch({type: 'IS_MODERATOR_CHECK', data: {isModerator}});
//     });
// };
