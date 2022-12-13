import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../styles/Theme';

// import { Container } from './styles';

const ItemBook = ({ item, alterBook }) => {
    return (
        <TouchableOpacity
            onPress={alterBook}
            activeOpacity={0.6}
            style={[styles.card, theme.shadows]} key={item.id}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{marginLeft: 30}}>
                    <Text style={styles.titleCard}>Titulo: {item.title}</Text>
                    <Text style={styles.subtitleCard}>Autor: {item.author}</Text>
                </View>
                <View style={{marginLeft: 30}}>
                    <Text style={styles.value}>R${item.value}</Text>
                </View>
            </View>
            <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 16,
        padding: 8,
        height: 55,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleCard: {
        color: '#000',
        fontSize: 16,
        fontFamily: "RobotoSlab_700Bold",
    },
    subtitleCard: {
        color: '#555',
        fontSize: 13,
        fontFamily: "RobotoSlab_300Light",
    },
    value: {
        fontSize: 20,
        borderLeftWidth: 1,
        padding: 5,
        paddingLeft: 20,
        borderColor: '#fff'

    }
});

export default ItemBook;