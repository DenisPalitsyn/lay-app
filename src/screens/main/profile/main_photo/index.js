import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import NoPhotoMan from '../../../../assets/img/NoPhotoMan';
import NoPhoto from '../../../../assets/img/NoPhoto';

export const MainPhoto = ({ mainPhotoIsLoaded, gender, mainPhotoUrl }) => {
  const renderContent = () => {
    if (!mainPhotoIsLoaded) {
      return (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width="100%" height="100%" borderRadius={4} />
        </SkeletonPlaceholder>
      );
    }
    if (!mainPhotoIsLoaded || !mainPhotoUrl) {
      if (gender === 'Man') {
        return <NoPhotoMan width="100%" height="100%" />;
      }
      return <NoPhoto width="100%" height="100%" />;
    }
    return (
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: mainPhotoUrl }}
      />
    );
  };

  return (
    <View style={styles.photoWrap}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  photoWrap: {
    width: '100%',
    minHeight: 200,
    maxHeight: 280,
  },
});
