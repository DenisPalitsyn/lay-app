import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Item } from './item';
import { getFilteredUsers } from '../../../store/actions/usersActions';

export default function Search({ navigation }) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState(null);

  const usersIsLoaded = users !== null;

  useEffect(() => {
    let Mounted = true;
    const fetchData = async () => dispatch(getFilteredUsers());
    fetchData().then((users) => Mounted && setUsers(users));
    return () => { Mounted = false; };
  }, []);

  const goUser = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Search
      </Text>
      {usersIsLoaded
        ? (
          <FlatList
            data={users}
            renderItem={(props) => <Item goUser={goUser} {...props} />}
            keyExtractor={(item) => item.id}
          />
        )
        : (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width="100%" height="100%" borderRadius={4} />
          </SkeletonPlaceholder>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
