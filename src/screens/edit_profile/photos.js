import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { ScrollView, View } from 'react-native';
import {
  ActivityIndicator, Button, Text, RadioButton, Card,
} from 'react-native-paper';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { LocalisationContext } from '../../localisation/context';
import styles from '../../assets/styles/edit_profile';
import { Alert } from '../../components/UI/alert';
import { getGalleryPhotos } from '../../store/actions/profileActions';

export const Photos = React.memo(() => {
  const {
    whyAddPhoto,
    save,
    photoAlert,
    mainProfilePhoto,
    privacyLevel,
    deleteText,
  } = useContext(LocalisationContext);

  const dispatch = useDispatch();

  const {
    onSubmit,
    submitting,
    getValues,
    setValue,
    handleSubmit,
    // register,
    control,
  } = useFormContext();

  const profile = getValues();
  const { id, photos: photosState, mainPhoto: mainPhotoState } = profile;
  const mainPhoto = useWatch({
    control,
    name: 'mainPhoto',
    defaultValue: mainPhotoState,
  });
  const photos = useWatch({
    control,
    name: 'photos',
    defaultValue: photosState,
  });

  const initialPhotos = useSelector((s) => {
    const { profile } = s;
    const stateGalleryPhotos = profile.photos[id];
    if (stateGalleryPhotos) {
      return stateGalleryPhotos.l;
    }
    return undefined;
  });

  const [galleryPhotos, setGalleryPhotos] = useState(initialPhotos);
  const galleryPhotosIsLoaded = galleryPhotos !== undefined;

  const setValidMainPhoto = useCallback((newPhotosState) => {
    const photos = newPhotosState || photosState;
    const validIndex = photos.findIndex((p) => !p.isPrivate);
    setValue('mainPhoto', validIndex);
  }, [photosState]);

  const privacyLevelHandler = (i, newValue) => {
    const newPhotos = [...photos];
    newPhotos[i].isPrivate = newValue;
    setValue('photos', newPhotos);
    if ((mainPhoto === i) && newValue) setValidMainPhoto(newPhotos);
  };

  const deletePhotoHandler = (photoIndex) => {
    const newPhotos = [...photos].filter((_, i) => i !== photoIndex);
    const newGalleryPhotos = [...galleryPhotos].filter((_, i) => i !== photoIndex);
    setValue('photos', newPhotos);
    setGalleryPhotos(newGalleryPhotos);
  };

  useEffect(() => {
    let Mounted = true;
    if (!galleryPhotosIsLoaded && Mounted) {
      const fetchData = async () => dispatch(getGalleryPhotos(id, 'L'));
      fetchData().then((galleryPhotos) => Mounted && setGalleryPhotos(galleryPhotos));
    }
    return () => { Mounted = false; };
  }, []);

  useEffect(() => {
    if (mainPhoto === -1) setValidMainPhoto();
  }, [setValidMainPhoto]);

  const getWhyAddPhotoText = () => {
    const newWhyAddPhoto = whyAddPhoto;

    let param;
    switch (profile.lang) {
      case 'ru':
        param = profile.gender === 'Woman' ? 'девушек' : 'мужчин';
        break;
      case 'lv':
        param = profile.gender === 'Woman' ? 'meiteņu' : 'vīrieši';
        break;
      default:
        param = profile.gender === 'Woman' ? 'girls' : 'men';
    }

    return newWhyAddPhoto.replace('$gender', param);
  };

  const renderPhotos = () => {
    if (!galleryPhotosIsLoaded) {
      return <ActivityIndicator />;
    }
    return galleryPhotos.map((item, i) => (
      <Card
        key={`photo${i}`}
        style={styles.photoContainer}
      >
        <Card.Cover style={styles.photoWrap} source={{ uri: item || '' }} />
        <Card.Actions style={styles.photoActions}>
          {!photos[i].isPrivate
              && (
              <View style={styles.action}>
                <Text>{mainProfilePhoto}</Text>
                <RadioButton
                  value={i}
                  status={mainPhoto === i ? 'checked' : 'unchecked'}
                  onPress={() => setValue('mainPhoto', i)}
                />
              </View>
              )}
          <View style={styles.action}>
            <Text>{privacyLevel}</Text>
            <CheckBox
              style={{ marginRight: 1.5 }}
              value={photos[i].isPrivate}
              onValueChange={(newValue) => privacyLevelHandler(i, newValue)}
            />
          </View>
          <View style={[styles.action, styles.jcCenter]}>
            <Button
              uppercase={false}
              onPress={() => deletePhotoHandler(i)}
            >
              {deleteText}
            </Button>
          </View>
        </Card.Actions>
      </Card>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Alert style={styles.p}>{photoAlert}</Alert>
        <Text style={styles.p}>{getWhyAddPhotoText()}</Text>
        {renderPhotos()}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={submitting}
        >
          {save}
        </Button>
        {/* <Button */}
        {/*  mode="contained" */}
        {/*  onPress={async () => { */}
        {/*    // try { */}
        {/*    //   const func = firebase.functions().httpsCallable('listAuthDataTestEuropeWest1'); */}
        {/*    //   await func().then((res) => { */}
        {/*    //     console.log('res', res); */}
        {/*    //   }); */}
        {/*    //   console.log('data', data); */}
        {/*    // } catch (e) { */}
        {/*    //   console.log('e', e.message); */}
        {/*    // } */}
        {/*  }} */}
        {/* > */}
        {/*  Click */}
        {/* </Button> */}
      </View>
    </ScrollView>
  );
});
