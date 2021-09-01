// import {profileData} from "../../constants/profile";
// import {convertDateToTimestamp} from "../../utils/profile";
// import {initPhotoObj} from "../../constants/initialState";
// import {getAllUsers, getUser} from "./usersActions";
// import ImageResizer from 'react-native-image-resizer';
// // import mixpanel from "mixpanel-browser";
// import firebase from "firebase/app";
// // import RNFetchBlob from 'rn-fetch-blob';
//
// export const saveRole = (role) => async (dispatch, getState) => {
//   dispatch({type: 'SAVE_ROLE_IN_PROGRESS'});
//
//   const db = firebase.firestore();
//   const state = getState();
//   const {uid} = state.firebase.auth;
//
//   await db.collection('users').doc(uid).set({
//     role
//   }, {merge: true}).then(function () {
//     dispatch({type: 'SAVE_ROLE_SUCCESS', role});
//   })
//     .catch(function () {
//       dispatch({type: 'SAVE_ROLE_ERROR'});
//     });
// };
//
// export const getProfileData = (uid) => (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const users = getAllUsers(state);
//   const user = users[uid];
//   const isUserExists = user !== undefined;
//
//   if (isUserExists) {
//     return user;
//   } else {
//     return db.collection('users').doc(uid)
//       .get()
//       .then(async (doc) => {
//         if (doc.exists) {
//           const profile = doc.data();
//           dispatch({type: 'GET_PROFILE_DATA_SUCCESS', data: {profile, uid}});
//           return profile;
//         }
//         return profileData;
//       }).catch((err) => {
//         console.log(err);
//         return profileData;
//         // dispatch({type: 'GET_PROFILE_DATA_ERROR'});
//       });
//   }
// };
//
// export const getPhotosUrl = async (
//   firebase,
//   photos,
//   isUser,
//   isModerator = false,
//   size
// ) => {
//   const publicPhotos = [...photos].map(p =>
//     p.isPrivate ? ({
//       path: '',
//       pathS: '',
//       pathM: '',
//       pathL: '',
//       isPrivate: true
//     }) : p
//   );
//
//   const filteredPhotos = (isUser || isModerator) ? photos : publicPhotos;
//   const paths = filteredPhotos.map((photo) => {
//     switch (size) {
//       case 'S':
//         return photo.pathS;
//       case 'M':
//         return photo.pathM;
//       case 'L':
//         return photo.pathL;
//       case 'BIG':
//         return photo.path;
//       default:
//         return photo.path;
//     }
//   });
//
//   const downloadUrls = [];
//
//   for (let path of paths) {
//     if (path) {
//       const url = await firebase.storage().ref().child(path).getDownloadURL();
//       downloadUrls.push(url);
//     } else {
//       downloadUrls.push('');
//     }
//   }
//
//   return downloadUrls;
// }
//
// export const getGalleryPhotos = (uid, size = 'BIG') => async (dispatch, getState) => {
//   const state = getState();
//   const isModerator = state.profile.isModerator;
//   const isUser = firebase.auth().currentUser.uid === uid;
//   const users = getAllUsers(state);
//   const user = users[uid];
//   const photos = user ? user.photos : [];
//   const photosExists = Boolean(photos.length);
//
//   const photoIndex = size.toLowerCase();
//   const stateGalleryPhotos = state.profile.photos[uid] ?
//     {
//       ...initPhotoObj,
//       ...state.profile.photos[uid]
//     } : initPhotoObj;
//   // const galleryPhotos = stateGalleryPhotos[photoIndex];
//
//   // const galleryPhotosIsExists = galleryPhotos !== undefined;
//   // console.log('galleryPhotosIsExists', galleryPhotosIsExists)
//   // if (galleryPhotosIsExists) {
//   //   return galleryPhotos;
//   // }
//   if (photosExists) {
//     const downloadUrls = await getPhotosUrl(firebase, photos, isUser, isModerator, size);
//
//     const downloadUrlsObj = {
//       ...stateGalleryPhotos,
//       [photoIndex]: downloadUrls
//     };
//
//     dispatch({type: 'GET_DOWNLOAD_URLS_SUCCESS', data: {downloadUrls: downloadUrlsObj, uid}});
//     return downloadUrls;
//   }
//   return [];
// }
//
// export const saveProfileData = (formData) => async (dispatch) => {
//   dispatch({type: 'SAVE_PROFILE_DATA_IN_PROGRESS'});
//
//   const storageRef = firebase.storage().ref();
//
//   const db = firebase.firestore();
//   const {uid} = firebase.auth().currentUser;
//
//   const newFormData = {
//     ...formData,
//     dateOfBirth: convertDateToTimestamp(formData['birthday'])
//   };
//
//   const uploadTasks$ = newFormData.photos.map(async (photo, index) => {
//     const subFolderName = photo.isPrivate ? 'private' : 'public';
//     const photoIsExist = !photo.file && (photo.path?.split('/')[1] === subFolderName);
//     let fullPath,
//       fullPathXS,
//       fullPathS,
//       fullPathM,
//       fullPathL;
//
//     if (!photoIsExist) {
//       if (photo.file) {
//         fullPath = `${uid}/${subFolderName}/${photo.file.name}`;
//         fullPathXS = `${uid}/${subFolderName}/XS_shape_${photo.file.name}`;
//         fullPathS = `${uid}/${subFolderName}/S_shape_${photo.file.name}`;
//         fullPathM = `${uid}/${subFolderName}/M_shape_${photo.file.name}`;
//         fullPathL = `${uid}/${subFolderName}/L_shape_${photo.file.name}`;
//       } else {
//         fullPath = `${uid}/${subFolderName}/${photo.path?.split('/')[2]}`;
//         fullPathXS = `${uid}/${subFolderName}/XS_shape_${photo.path?.split('/')[2]}`;
//         fullPathS = `${uid}/${subFolderName}/S_shape_${photo.path?.split('/')[2]}`;
//         fullPathM = `${uid}/${subFolderName}/M_shape_${photo.path?.split('/')[2]}`;
//         fullPathL = `${uid}/${subFolderName}/L_shape_${photo.path?.split('/')[2]}`;
//       }
//     } else {
//       fullPath = photo.path;
//       // fullPathXS = photo.pathXS;
//       fullPathS = photo.pathS;
//       fullPathM = photo.pathM;
//       fullPathL = photo.pathL;
//     }
//
//     if (photoIsExist) {
//       dispatch({type: 'UPDATE_FILE_UPLOAD', data: {index, progress: 100}});
//       return Promise.resolve();
//     }
//
//     const compression = async (size) => {
//       const photoUrl = URL.createObjectURL(photo.file);
//       let maxWidth, maxHeight;
//       switch (size) {
//         case 'XS':
//           maxWidth = 37;
//           maxHeight = 37;
//           break;
//         case 'S':
//           maxWidth = 70;
//           maxHeight = 70;
//           break;
//         case 'M':
//           maxWidth = 116;
//           maxHeight = 116;
//           break;
//         case 'L':
//           maxWidth = 300;
//           maxHeight = 320;
//           break;
//         default:
//           maxWidth = 1920;
//           maxHeight = 1080;
//       }
//       try {
//         return ImageResizer.createResizedImage(photoUrl, maxWidth, maxHeight, 'JPEG', 100, 0, undefined);
//       } catch (e) {
//         console.log(e);
//       }
//     }
//
//     let uploadTask;
//
//     async function moveFirebaseFile(currentPath, destinationPath) {
//       // let oldRef = await firebase.storage().ref().child(currentPath);
//       // firebase.functions().httpsCallable('uploadFirebaseFile')({currentPath: currentPath, destinationPath: destinationPath})
//       //   .then((res) => {
//       //     console.log('res', res);
//           // console.log('currentPath', currentPath);
//           // console.log('destinationPath', destinationPath);
//         // })
//         // .catch((err) => {
//         //   console.log('err', err.message);
//         // });
//       // await oldRef.delete();
//     }
//
//     if (photo.file) {
//       // const fileXS = await compression('XS');
//       // const fileS = await compression('S');
//       // const fileM = await compression('M');
//       // const fileL = await compression('L');
//       const file = await compression();
//
//       console.log('file compression', file);
//
//       // const compressedFileXS = await RNFetchBlob.fetch('GET', fileXS.uri);
//       // const compressedFileS = await RNFetchBlob.fetch('GET', fileS.uri);
//       // const compressedFileM = await RNFetchBlob.fetch('GET', fileM.uri);
//       // const compressedFileL = await RNFetchBlob.fetch('GET', fileL.uri);
//       // const compressedFile = await RNFetchBlob.fetch('GET', file.uri);
//       //
//       // console.log('compressedFileXS', compressedFileXS.base64());
//       // console.log('compressedFileS', compressedFileS.base64());
//       // console.log('compressedFileM', compressedFileM.base64());
//       // console.log('compressedFileL', compressedFileL.base64());
//       // console.log('compressedFile', compressedFile.base64());
//
//       // await storageRef.child(fullPathXS).put(compressedFileXS.base64());
//       // await storageRef.child(fullPathS).put(compressedFileS.base64());
//       // await storageRef.child(fullPathM).put(compressedFileM.base64());
//       // await storageRef.child(fullPathL).put(compressedFileL.base64());
//       // await storageRef.child(fullPath).put(compressedFile.base64());
//       //
//       // uploadTask = storageRef.child(fullPath).put(compressedFile.base64());
//
//       uploadTask.on('state_changed', (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         dispatch({type: 'UPDATE_FILE_UPLOAD', data: {index, progress}});
//         switch (snapshot.state) {
//           case firebase.storage.TaskState.PAUSED: // or 'paused'
//             break;
//           case firebase.storage.TaskState.RUNNING: // or 'running'
//             break;
//         }
//       });
//       return uploadTask;
//     } else {
//       await moveFirebaseFile(photo.path, fullPath);
//       // await moveFirebaseFile(photo.pathXS, fullPathXS);
//       await moveFirebaseFile(photo.pathS, fullPathS);
//       await moveFirebaseFile(photo.pathM, fullPathM);
//       await moveFirebaseFile(photo.pathL, fullPathL);
//       return Promise.resolve();
//     }
//   });
//
//   const uploads = await Promise.all(uploadTasks$);
//   const paths = uploads.map((t) => t?.metadata?.fullPath);
//
//   // const userProfile = db.collection('users').doc(`${uid}`);
//   newFormData.photos.forEach((photo, i) => {
//     const subFolderName = photo.isPrivate ? 'private' : 'public';
//     if (photo.file) {
//       const fullPathXS = `${uid}/${subFolderName}/XS_shape_${photo.file.name}`;
//       const fullPathS = `${uid}/${subFolderName}/S_shape_${photo.file.name}`;
//       const fullPathM = `${uid}/${subFolderName}/M_shape_${photo.file.name}`;
//       const fullPathL = `${uid}/${subFolderName}/L_shape_${photo.file.name}`;
//
//       photo.path = paths[i];
//       photo.pathXS = fullPathXS;
//       photo.pathS = fullPathS;
//       photo.pathM = fullPathM;
//       photo.pathL = fullPathL;
//       delete photo['file'];
//     } else {
//       const photoIsExist = photo.path?.split('/')[1] === subFolderName;
//       if (!photoIsExist) {
//         photo.path = `${uid}/${subFolderName}/${photo.path?.split('/')[2]}`;
//         photo.pathXS = `${uid}/${subFolderName}/XS_shape_${photo.path?.split('/')[2]}`;
//         photo.pathS = `${uid}/${subFolderName}/S_shape_${photo.path?.split('/')[2]}`;
//         photo.pathM = `${uid}/${subFolderName}/M_shape_${photo.path?.split('/')[2]}`;
//         photo.pathL = `${uid}/${subFolderName}/L_shape_${photo.path?.split('/')[2]}`;
//       }
//     }
//   });
//
//   if (newFormData.photos !== formData.photos) {
//     dispatch({type: 'GET_USER_PHOTO_SUCCESS', data: {uid, photo: undefined}});
//   }
//
//   // await userProfile.update({
//   //   ...newFormData,
//   //   profileSubmitted: needToSave,
//   //   hasSeenNotification,
//   //   id: uid
//   // })
//   //   .then(function () {
//   //     if (needToSave) {
//   //       dispatch({type: 'SAVE_PROFILE_DATA_SUCCESS'});
//   //     }
//   //   })
//   //   .catch(function (error) {
//   //     dispatch({type: 'SAVE_PROFILE_DATA_ERROR'});
//   //     console.error('Error updating document: ', error);
//   //   });
// };
//
// export const setEmailForResetPassword = (email, lang) => async (dispatch) => {
//   dispatch({type: 'SET_EMAIL_FOR_RESET_PASSWORD_IN_PROGRESS'});
//
//   await window.resetPassword({email, lang})
//     .then(() => {
//       dispatch({type: 'SET_EMAIL_FOR_RESET_PASSWORD_SUCCESS'});
//     }).catch((error) => {
//       dispatch({type: 'SET_EMAIL_FOR_RESET_PASSWORD_ERROR', error: error.message});
//     });
// };
//
// export const updateProfileStatus = (status) => async (dispatch, getState) => {
//   const state = getState();
//   const {uid} = state.firebase.auth;
//
//   const database = firebase.database();
//   const presence = database.ref(`/status/${uid}`);
//
//   await presence.update({status, timestamp: firebase.database.ServerValue.TIMESTAMP});
// };
//
// export const setDateRequest = (data) => async (dispatch, getState) => {
//   const db = firebase.firestore();
//
//   await db.collection('dating-requests')
//     .add(data)
//     .then((doc) => {
//       dispatch({type: 'SAVE_AUTH_DATE_REQUEST_SUCCESS', data: [{...data, id: doc.id}]});
//       console.log('data', data);
//     })
//     .catch(function (error) {
//       dispatch({type: 'SAVE_DATE_REQUEST_ERROR'});
//       console.error('Error: ', error);
//     });
// };
//
// export const getAuthUserDateRequests = (uid) => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const authRequests = state.profile.authRequests;
//   const authRequestsIsExists = !!authRequests.length;
//
//   if (authRequestsIsExists) {
//     return authRequests;
//   }
//   return await db.collection('dating-requests')
//     .where('userId', '==', uid)
//     .where('status', '!=', 'deleted')
//     .get()
//     .then((data) => {
//       const requests = [];
//       data.forEach((doc) => {
//         requests.push({...doc.data(), id: doc.id});
//       })
//       dispatch({type: 'SAVE_AUTH_DATE_REQUEST_SUCCESS', data: requests});
//       return requests;
//     })
//     .catch((err) => {
//       console.log(err.message)
//     });
// }
//
// export const updateDateRequest = (request) => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const authRequests = state.profile.authRequests;
//
//   const newRequests = [...authRequests].map(r => r.id === request.id ? request : r).filter(r => r.status !== 'deleted');
//
//   dispatch({type: 'UPDATE_DATE_REQUEST_SUCCESS', data: newRequests});
//
//   await db.collection('dating-requests').doc(request.id)
//     .update(request)
//     .catch(function (error) {
//       console.error('Error: ', error);
//       return [];
//     });
//   return newRequests;
// }
//
// export const setDateOffer = (data) => (dispatch) => {
//   const db = firebase.firestore();
//   const offerId = data.messageId;
//
//   const datingOffers = db.collection('dating-offers').doc(offerId);
//
//   datingOffers.set(data, {merge: true})
//     .catch(function (error) {
//       dispatch({type: 'SAVE_DATE_OFFERS_ERROR'});
//       console.error('Error: ', error);
//     });
// };
//
// export const getDateOffers = (uid) => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//
//   return await db.collection('dating-offers')
//     .where('users', 'array-contains', uid)
//     .get()
//     .then(async (data) => {
//       let offers = [];
//
//       data.forEach((doc) => {
//         offers.push(doc.data());
//       })
//
//       if (offers.length) {
//         const acceptedOffers = offers.filter((o) => o.status === 'accepted');
//         const offersUsers = acceptedOffers.map((o) => o.user1 === uid ? o.user2 : o.user1);
//
//         let users = {};
//
//         for (let user of offersUsers) {
//           try {
//             const profile = await dispatch(getUser(user));
//             if (profile) {
//               users[profile.id] = profile;
//             }
//           } catch (e) {
//             console.log(e);
//           }
//         }
//
//         const filteredAcceptedOffers = acceptedOffers.filter(o => {
//           const companionId = o.user1 === uid ? o.user2 : o.user1;
//           return Object.keys(users).includes(companionId) && users[companionId].role !== 'deleted';
//         })
//
//         return {offers: filteredAcceptedOffers, users}
//       } else {
//         return {offers: [], users: {}};
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return {offers: [], users: {}};
//     })
// }
//
// export const onDateOffers = () => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const {uid} = state.firebase.auth;
//
//   try {
//     await db.collection('dating-offers')
//       .where('users', 'array-contains', uid)
//       .onSnapshot(async (data) => {
//         let offers = [];
//
//         data.forEach((doc) => {
//           offers.push(doc.data());
//         })
//
//         if (offers.length) {
//           const acceptedOffers = offers.filter((o) => o.status === 'accepted');
//           const offersUsers = acceptedOffers.map((o) => o.user1 === uid ? o.user2 : o.user1);
//
//           let users = {};
//
//           for (let user of offersUsers) {
//             try {
//               const profile = await dispatch(getUser(user));
//               users[profile.id] = profile;
//             } catch (e) {
//               console.log(e);
//             }
//           }
//
//           dispatch({type: 'GET_DATE_OFFERS_SUCCESS', data: offers})
//           return {offers: acceptedOffers, users}
//         } else {
//           return {offers: [], users: {}};
//         }
//       })
//     // .catch((err: any) => {
//     //   console.log(err);
//     //   // return {offers: [], users: {}};
//     // })
//   } catch (e) {
//     console.log(e);
//   }
// }
//
// export const closeFirstChatsPopup = () => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const {uid} = state.firebase.auth;
//
//   dispatch({type: 'UPDATE_PROFILE_DATA', data: {id: uid, newValue: {sawFirstChatsPopup: true}}});
//   await db.collection('users').doc(uid).set({sawFirstChatsPopup: true}, {merge: true});
// };
//
// export const closeFirstChatPopup = () => async (dispatch, getState) => {
//   const db = firebase.firestore();
//   const state = getState();
//   const {uid} = state.firebase.auth;
//
//   dispatch({type: 'UPDATE_PROFILE_DATA', data: {id: uid, newValue: {sawFirstChatPopup: true}}});
//   await db.collection('users').doc(uid).set({sawFirstChatPopup: true}, {merge: true});
// };
//
// export const updateProfile = (data) => async dispatch => {
//   const db = firebase.firestore();
//   // const state = getState();
//   const {uid} = firebase.auth().currentUser;
//
//   try {
//     await db.collection('users').doc(uid).update(data);
//   } catch (e) {
//     throw new Error(e);
//   }
//
//   dispatch({type: 'UPDATE_PROFILE_DATA', data: {id: uid, newValue: data}});
//
//   // mixPanelUpdate({...profile, ...data});
// }
//
// // const mixPanelUpdate = (profileData) => {
// //     const {
// //         displayName,
// //         dateOfBirth,
// //         birthday,
// //         country,
// //         city,
// //         helloMessage,
// //         gender,
// //         phoneNumber,
// //         lookingFor,
// //         languages,
// //         figure,
// //         height,
// //         ethnicity,
// //         hair,
// //         eyes,
// //         occupation,
// //         interests,
// //         dressStyle,
// //         food,
// //         drinks,
// //         whatYouLikeInSex,
// //         whatYouDontLikeInSex,
// //         areaAvailability,
// //         expectedReward,
// //         iLookLike,
// //         photos,
// //         mainPhoto,
// //         lang,
// //         hasPhotos,
// //         profileSubmitted,
// //         profileVerified,
// //         approved,
// //         status,
// //         lastVisit,
// //         filters,
// //         showPrivatePhotos,
// //         mfa,
// //         hasDatingRequests
// //     } = profileData;
// //
// //     mixpanel.people.set({
// //         "$first_name": displayName,
// //         "$dateOfBirth": dateOfBirth,
// //         "$birthday": birthday,
// //         "$country": country,
// //         "$city": city,
// //         "$helloMessage": helloMessage,
// //         "$gender": gender,
// //         "$phoneNumber": phoneNumber,
// //         "$lookingFor": lookingFor,
// //         "$languages": languages,
// //         "$figure": figure,
// //         "$height": height,
// //         "$ethnicity": ethnicity,
// //         "$hair": hair,
// //         "$eyes": eyes,
// //         "$occupation": occupation,
// //         "$interests": interests,
// //         "$dressStyle": dressStyle,
// //         "$food": food,
// //         "$drinks": drinks,
// //         "$whatYouLikeInSex": whatYouLikeInSex,
// //         "$whatYouDontLikeInSex": whatYouDontLikeInSex,
// //         "$areaAvailability": areaAvailability,
// //         "$expectedReward": expectedReward,
// //         "$iLookLike": iLookLike,
// //         "$photos": photos,
// //         "$mainPhoto": mainPhoto,
// //         "$lang": lang,
// //         "$hasPhotos": hasPhotos,
// //         "$profileSubmitted": profileSubmitted,
// //         "$profileVerified": profileVerified,
// //         "$approved": approved,
// //         "$status": status,
// //         "$lastVisit": lastVisit,
// //         "$filters": filters,
// //         "$showPrivatePhotos": showPrivatePhotos,
// //         "$mfa": mfa,
// //         "hasDatingRequests": hasDatingRequests
// //     });
// // }
