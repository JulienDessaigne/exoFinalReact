import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GetCharacter from './GetCaracter'
import React, { useState } from 'react';


const Stack = createStackNavigator();

let nameInput = ''
let serverInput = ''
function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("./images/Icon_FullColor.png")}
      />
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Name"
          onChangeText={(text) => nameInput = text}
          style={{ borderWidth: 1, width: 200, borderColor: 'gray', padding: 10, color: "white" }}
        />
        <TextInput
          placeholder="Server"
          onChangeText={(text) => serverInput = text}
          style={{ borderWidth: 1,width: 200,  borderColor: 'gray', padding: 10, marginTop: 10, color: "white", marginBottom: 10 }}
        />
        <Button title="Rechercher" onPress={() => navigation.navigate('Search')} />
      </View>
      <TouchableOpacity style={[styles.button, styles.boxShadow, styles.color_first_Character]} onPress={() => navigation.navigate('Ashôkà')}>
        <Text style={styles.buttonText}>Ashôkà</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.boxShadow, styles.color_second_Character]} onPress={() => navigation.navigate('Haneïa')}>
        <Text style={styles.buttonText}>Haneïa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.boxShadow, styles.color_third_Character]} onPress={() => navigation.navigate('Atranima')}>
        <Text style={styles.buttonText}>Atranima</Text>
      </TouchableOpacity>
    </View>
  );
}
function FirstCharacter() {
  return (
    <GetCharacter characterName="Ashôkà" server="Dalaran"></GetCharacter>
  );
}
function SecondCharacter() {
  return (
    <GetCharacter characterName="Haneïa" server="Dalaran"></GetCharacter>
  );
}
function ThirdCharacter() {
  return (
    <GetCharacter characterName="Atranima" server="Dalaran"></GetCharacter>
  );
}

function SearchCharacter() {
  return (
    <GetCharacter characterName={nameInput} server={serverInput}></GetCharacter>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RaiderIo" component={MenuScreen} />
        <Stack.Screen name="Ashôkà" component={FirstCharacter} />
        <Stack.Screen name="Haneïa" component={SecondCharacter} />
        <Stack.Screen name="Atranima" component={ThirdCharacter} />
        <Stack.Screen name="Search" component={SearchCharacter} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16325c',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10
  },
  button: {
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#fff',
    width: 200,
    margin: 10
  },
  color_first_Character: {
    backgroundColor: "#00ff96",
  },
  color_second_Character: {
    backgroundColor: "#abd473",
  },
  color_third_Character: {
    backgroundColor: "#9482c9",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  boxShadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 3
  }
});
