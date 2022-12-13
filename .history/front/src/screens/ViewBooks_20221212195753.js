import { useContext, useEffect, useState, useRef } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
const base64 = require('base-64');
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../styles/Theme';
import { AppContext } from '../context/AppContext';
import { FontAwesome5 } from '@expo/vector-icons';
import FloatingButton from '../components/FloatingButton';
import { Modalize } from 'react-native-modalize';
import Itembook from '../components/Itembook';
import ItemSex from '../components/ItemSex';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default Viewbooks = ({ navigation }) => {

    const initialbook = {
        "title": "",
        "author": "",
        "publication_year": "0",
        "pages": 0,
        "value": 0
    }

    
    const [loading, setLoading] = useState(false);
    const [books, setbooks] = useState([]);
    const [book, setbook] = useState(initialbook);

    const modalRef = useRef(null);

    
    useEffect(() => {
        listbooks();
    }, [])

    function onOpenModal() {
        modalRef.current?.open();
    }

    function alterbook(book) {
        onOpenModal()
        setbook(book)
    }

    function newbook() {
        onOpenModal()
        setbook(initialbook)
    }

    async function savebook() {
        try {

            if(book.age <= 0){
                Alert.alert('Informe a idade');
                return;
            }

            const payload = {
                title: book.title,
                author: book.author,
                publication_year: book.publication_year,
                pages: book.pages,
                value: book.value
            }

          

            const response = await axios({
                method: book.id > 0 ? 'put' : 'post',
                url: book.id > 0 ? `/books/${book.id}` : `/books`,
                data: payload
            })

            if (response.status == 200) {

                modalRef.current?.close();

                listbooks();

            } else {
                Alert.alert('Ops', 'Erro ao salvar livro');
            }

        } catch (error) {
            Alert.alert('Ops', error.message);
        }
    }

    async function listbooks() {

        setLoading(true);

        const response = await axios.get('/books');

        /*const response = await fetch('http://177.44.248.30:3333/books', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(bookname + ":" + password)
            }
        });
        const json = await response.json();*/

        /*const options = {
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(bookname + ":" + password)
            }
        }*/

        if(response.status == 200){
            const json = response.data;
            setbooks(json);
        }else{
            Alert.alert('Ops, deu ruim 😥', json.message);
        }

        setLoading(false);

    }

    return (
        <SafeAreaView style={theme.safeArea}>
            <View style={theme.container}>
                {/* <SkeletonPlaceholder
                speed={600}>
                <SkeletonPlaceholder.Item
                    width={200}
                    height={45} />
            </SkeletonPlaceholder> */}
                <FlatList
                    data={books}
                    onRefresh={() => listbooks()}
                    refreshing={loading}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Itembook item={item} alterbook={() => alterbook(item)} />
                    )}
                />

                <FloatingButton
                    icon="plus"
                    color="#333"
                    onPress={() => newbook()}
                />


                <Modalize
                    ref={modalRef}
                    snapPoint={400}
                    modalHeight={height * 0.8}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}>
                        <View style={styles.modal}>
                            <Text style={[theme.subTitle, {
                                textAlign: 'center'
                            }]}>{book.id > 0 ? "Alterar Livro" : "Novo Livro"}</Text>

                            <Text style={theme.label}>Título</Text>
                            <TextInput
                                keyboardType='defaults'
                                autoCapitalize='words'
                                value={book.title}
                                onChangeText={(title) => { setbook({ ...book, title: title }) }}
                                style={styles.modalInput}
                                placeholder="Título" />

                            <Text style={theme.label}>Autor</Text>
                            <TextInput
                                keyboardType='defaults'
                                autoCapitalize='words'
                                value={book.author}
                                onChangeText={(author) => { setbook({ ...book, author: author }) }}
                                style={styles.modalInput}
                                placeholder="Autor" />

                            <Text style={theme.label}>{book.id === 0 ? "Senha" : " "}</Text>
                            <TextInput
                                keyboardType='defaults'
                                autoCapitalize='words'
                                value={book.id === 0 ? book.password : ''}
                                onChangeText={(password) => { setbook({ ...book, password: password })}}
                                style={book.id === 0 ? styles.modalInput : {height: 0}}
                                placeholder="Senha" />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={theme.label}>Idade</Text>
                                    <TextInput
                                        keyboardType='number-pad'
                                        value={book.age.toString()}
                                        onChangeText={(age) => { setbook({ ...book, age: age }) }}
                                        style={[styles.modalInput, { width: '40%' }]}
                                        placeholder="Idade" />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={theme.label}>Sexo</Text>
                                    <ScrollView horizontal={true}>
                                        <ItemSex
                                            setbook={setbook}
                                            book={book}
                                            icon="female"
                                            sex="F" />
                                        <ItemSex
                                            setbook={setbook}
                                            book={book}
                                            icon="male"
                                            sex="M" />
                                    </ScrollView>
                                </View>
                            </View>

                            <CustomButton
                                label="Salvar"
                                onPress={(savebook)}
                                textColor="#fff"
                                width="100%"
                                backgroundColor="#9400d3" />
                        </View>
                    </KeyboardAvoidingView>
                </Modalize>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        padding: 12,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#555',
        height: 42,
        borderRadius: 8,
        width: '100%',
        marginBottom: 16,
        paddingLeft: 8,
        fontFamily: "RobotoSlab_400Regular"
    },
});