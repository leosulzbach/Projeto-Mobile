import React, {useState} from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const validarResposta = (alternativa) => {
    console.log("Correto????")
  }
  return <SafeAreaView>
    


  </SafeAreaView>;
}

export default ViewQuiz;