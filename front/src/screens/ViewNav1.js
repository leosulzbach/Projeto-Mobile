import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';

const ViewNav1 = (props) => {
  return (
    <Animatable.View
      animation="fadeIn"
      style={styles.container}>

      <CustomButton
        onPress={() => props.navigation.navigate("Usuários")}
        label="Usuários"
        style={styles.button} />
      <CustomButton
        onPress={() => props.navigation.navigate("Tarefas")}
        label="Tarefas"
        style={styles.button} />

    </Animatable.View>
  );
}

export default ViewNav1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#262624",
    maxHeight: 55,
    maxWidth: 350,
    minHeight: 55,
    minWidth: 350,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});