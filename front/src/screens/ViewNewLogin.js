import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { theme } from '../styles/Theme';
import Checkbox from 'expo-checkbox';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';
import { AppContext } from '../context/AppContext';
import LoginScreen from "react-native-login-screen";

// import { Container } from './styles';

const ViewNewLogin = ({ navigation }) => {

    const fieldUser = "myapp_usuario";
    const fieldPassword = "myapp_senha";
    const [loading, setLoading] = useState(false);

    const { username, password, saveUser } = useContext(AppContext);
    console.log('VARS=>', username, password);

    /*const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        saveUser: false,
    });*/

    const usuario = {
        username: '',
        password: ''
    };

    function login(user, pass) {

        setLoading(true);

        async function testLogin() {
            const response = await fetch('http://177.44.248.47:3000/auth', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' +
                        base64.encode(user + ":" + pass)
                }
            });
            const json = await response.json();
            console.log(json);
            setLoading(false);
            if (json =! null) {

                //DADOS OK => navegar adiante
                saveUser(user, pass);
                //navigation.navigate("ViewUsers");
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Menu" }]
                })

            } else {
                Alert.alert('Que pena 😥', json.message);
            }
        }

        testLogin();

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[theme.login, styles.container]}>
            {loading == true ? <ActivityIndicator size='large' color='#fff' />
                :
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#0e0e0c"}}>
                    <LoginScreen
                        style={[theme.login, { marginTop: 8 }]}
                        logoImageSource={require("../assets/logo-crie-ti.png")}
                        onLoginPress={() => login(usuario.username, usuario.password)}
                        onSignupPress={() => { }}
                        onEmailChange={(user) => { usuario.username = user }}
                        textInputProps={{ keyboardType: "email-address" }} 
                        disableSocialButtons={true}
                        onPasswordChange={(password) => { usuario.password = password }}>
                    </LoginScreen>
                </ScrollView>
            }
        </KeyboardAvoidingView>
    );
}

export default ViewNewLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});