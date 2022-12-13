import React, {useState} from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const ViewQuiz = () => {
  const [count, setCount] = useState(0)

  const erros = 0;

  const perguntas = [
    {
     "titulo": "quanto é 2 + 2",
     "altA": "2",
     "altB": "22",
     "altC": "4",
     "altCorreta": "4",
    }
  ]
  return <View />;
}

export default ViewQuiz;