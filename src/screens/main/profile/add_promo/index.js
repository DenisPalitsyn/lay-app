import React, { useContext, useState } from 'react';
import {
  StyleSheet, View, ScrollView, SafeAreaView, Platform,
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker as SelectPicker } from '@react-native-community/picker';
import { LocalisationContext } from '../../../../localisation/context';

export default function AddPromo() {
  const {
    addADateRequest,
    textFieldLabels,
    textFieldPlaceholders,
    requestsTableTitles,
    whenToMeet,
    whyLocation,
    location,
    publish,
  } = useContext(LocalisationContext);

  const [selectedValue, setSelectedValue] = useState();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrap}>
        <Text style={styles.title}>
          {addADateRequest}
        </Text>
        <TextInput
          style={styles.mb}
          mode="outlined"
          label={textFieldLabels.tagline}
          placeholder={textFieldPlaceholders.dateRequestTitle}
        />
        <TextInput
          style={styles.mb}
          mode="outlined"
          multiline
          numberOfLines={4}
          label={textFieldLabels.description}
          placeholder={textFieldPlaceholders.dateRequestDescription}
        />
        <Text style={styles.text}>{requestsTableTitles.preferredDateText}</Text>
        <Text style={[styles.text, styles.mb]}>{whenToMeet}</Text>
        <Button
          style={styles.mb}
          onPress={showDatepicker}
        >
          <Text style={styles.text}>Select date</Text>
        </Button>
        <Button
          style={styles.mb}
          onPress={showTimepicker}
        >
          <Text style={styles.text}>Select time</Text>
        </Button>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={[styles.text, styles.mb]}>{whyLocation}</Text>
        <View style={[styles.picker, styles.mb]}>
          <SelectPicker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <SelectPicker.Item label={location[0].title} value={location[0].value} />
            <SelectPicker.Item label={location[1].title} value={location[1].value} />
            <SelectPicker.Item label={location[2].title} value={location[2].value} />
            <SelectPicker.Item label={location[3].title} value={location[3].value} />
          </SelectPicker>
        </View>
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.publish}
        >
          {publish}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mb: {
    marginBottom: 20,
  },
  text: {
    color: '#80848B',
    textAlign: 'left',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#80848B',
    borderStyle: 'solid',
    borderRadius: 4,
  },
  publish: {
    marginBottom: 30,
  },
});
