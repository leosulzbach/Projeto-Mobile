
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/Theme';

export default function CustomButton({label, onPress, backgroundColor, textColor, width, style}){
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={style}>
            <Text style={[theme.textButton, { color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    )
}