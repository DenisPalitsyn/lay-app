import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  p: {
    marginBottom: 20,
    textAlign: 'center'
  },
  photoWrap: {
    height: 250
  },
  photoContainer: {
    flex: 1,
    alignSelf: 'center',
    width: 250,
    marginBottom: 20
  },
  photoActions: {
    flexDirection: 'column'
  },
  action: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  jcCenter: {
    justifyContent: 'center'
  }
});

export default styles;
