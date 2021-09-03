import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Tabs } from './tabs';
import {
  getAuthUserDateRequests,
  getDateOffers,
  // getGalleryPhotos,
  getProfileData,
} from '../../../store/actions/profileActions';
import { getUserPhoto } from '../../../store/actions/usersActions';
import { MainPhoto } from './main_photo';
import { ProfileCard } from './profile_card';
import { UserContext } from '../../../utils/context';
import { profileData } from '../../../constants/profile';

export default function Profile({ navigation }) {
  const {
    profileUid,
    isUser,
  } = useContext(UserContext);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  // const [photosGallery, setPhotosGallery] = useState(initialPhotosGallery);
  const [requests, setRequests] = useState(null);
  const [offersData, setOffersData] = useState(null);

  const userProfile = user || profileData;

  const {
    gender,
    // role,
    id: userId,
  } = userProfile;
  //
  // const deletedUser = role === 'deleted';
  //
  const profileIsCorrect = userId === profileUid;
  const mainPhotoIsLoaded = mainPhotoUrl !== null && profileIsCorrect;
  // const photosGalleryIsLoaded = photosGallery !== null && profileIsCorrect;
  const requestsIsLoaded = requests !== null && profileIsCorrect;
  const offersDataIsLoaded = offersData !== null && profileIsCorrect;

  useEffect(() => {
    let Mounted = true;
    const fetchData = async () => dispatch(getProfileData(profileUid));
    fetchData()
      .then((userInfo) => {
        if (Mounted) setUser(userInfo);
        return Mounted ? dispatch(getUserPhoto(profileUid, 'L')) : null;
      })
      .then((url) => {
        if (Mounted) setMainPhotoUrl(url);
        return Mounted ? dispatch(getAuthUserDateRequests(profileUid)) : null;
      })
      .then((userRequests) => {
        if (Mounted) setRequests(userRequests);
        return Mounted ? dispatch(getDateOffers(profileUid)) : null;
      })
      .then((userOffers) => {
        if (Mounted) setOffersData(userOffers);
      })
      .catch((e) => console.log(e.message));
    return () => { Mounted = false; };
  }, [profileUid]);

  return (
    <SafeAreaView style={styles.container}>
      <MainPhoto
        mainPhotoIsLoaded={mainPhotoIsLoaded}
        gender={gender}
        mainPhotoUrl={mainPhotoUrl || ''}
      />
      <ProfileCard
        profileIsLoaded={profileIsCorrect}
        userProfile={userProfile}
        isUser={isUser}
        navigation={navigation}
      />
      <Tabs
        requests={requests}
        offers={offersData}
        profileIsLoaded={profileIsCorrect}
        requestsIsLoaded={requestsIsLoaded}
        offersDataIsLoaded={offersDataIsLoaded}
        isUser={isUser}
        profile={userProfile}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
