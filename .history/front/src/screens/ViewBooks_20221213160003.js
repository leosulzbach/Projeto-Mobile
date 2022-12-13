import { useContext, useEffect, useState, useRef } from "react";
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
} from "react-native";
const base64 = require("base-64");
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../styles/Theme";
import { AppContext } from "../context/AppContext";
import { FontAwesome5 } from "@expo/vector-icons";
import FloatingButton from "../components/FloatingButton";
import { Modalize } from "react-native-modalize";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import ItemBook from "../components/ItemBook";

const { width, height } = Dimensions.get("window");

export default Viewbooks = ({ navigation }) => {
  const initialbook = {
    title: "",
    author: "",
    publication_year: "0",
    pages: 0,
    value: 0,
  };

  const anos = []

  for (let index = 1800; index < 2022; index++) {
    anos.push(index)
  }
 
  const [loading, setLoading] = useState(false);
  const [books, setbooks] = useState([]);
  const [book, setbook] = useState(initialbook);

  const modalRef = useRef(null);

  useEffect(() => {
    listbooks();
  }, []);

  function onOpenModal() {
    modalRef.current?.open();
  }

  function alterBook(book) {
    onOpenModal();
    setbook(book);
  }

  function newbook() {
    onOpenModal();
    setbook(initialbook);
  }

  async function savebook() {
    try {
      if (book.age <= 0) {
        Alert.alert("Informe a idade");
        return;
      }

      const payload = {
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
        pages: book.pages,
        value: book.value,
      };

      const response = await axios({
        method: book.id > 0 ? "put" : "post",
        url: book.id > 0 ? `/books/${book.id}` : `/books`,
        data: payload,
      });

      if (response.status == 200) {
        modalRef.current?.close();

        listbooks();
      } else {
        Alert.alert("Ops", "Erro ao salvar livro");
      }
    } catch (error) {
      Alert.alert("Ops", error.message);
    }
  }

  async function listbooks() {
    setLoading(true);

    const response = await axios.get("/books");

    if (response.status == 200) {
      const json = response.data;
      setbooks(json);
      console.log(books);
    } else {
      Alert.alert("Ops, deu ruim 😥", json.message);
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemBook item={item} alterBook={() => alterBook(item)} />
        )}
        />

        <FloatingButton icon="plus" color="#333" onPress={() => newbook()} />

        <Modalize ref={modalRef} snapPoint={400} modalHeight={height * 0.8}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.modal}>
              <Text
                style={[
                  theme.subTitle,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                {book.id > 0 ? "Alterar Livro" : "Novo Livro"}
              </Text>

              <Text style={theme.label}>Título</Text>
              <TextInput
                keyboardType="defaults"
                autoCapitalize="words"
                value={book.title}
                onChangeText={(title) => {
                  setbook({ ...book, title: title });
                }}
                style={styles.modalInput}
                placeholder="Título"
              />

              <Text style={theme.label}>Autor</Text>
              <TextInput
                keyboardType="defaults"
                autoCapitalize="words"
                value={book.author}
                onChangeText={(author) => {
                  setbook({ ...book, author: author });
                }}
                style={styles.modalInput}
                placeholder="Autor"
              />

              <Text style={theme.label}>Ano de publicação</Text>
              <TextInput
                    keyboardType="number-pad"
                    value={book.publication_year}
                    onChangeText={(publication_year) => {
                      setbook({ ...book, publication_year: publication_year });
                    }}
                    style={styles.modalInput}
                    placeholder="Ano de publicação"
                  />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={theme.label}>Páginas</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={book.pages}
                    onChangeText={(pages) => {
                      setbook({ ...book, pages: pages });
                    }}
                    style={[styles.modalInput, { width: "40%" }]}
                    placeholder="Páginas"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={theme.label}>Valor</Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={book.value}
                    onChangeText={(value) => {
                      setbook({ ...book, value: value });
                    }}
                    style={[styles.modalInput, { width: "40%" }]}
                    placeholder="Valor"
                  />
                </View>
              </View>

              <CustomButton
                label="Salvar"
                onPress={savebook}
                textColor="#fff"
                width="100%"
                backgroundColor="#9400d3"
              />
            </View>
          </KeyboardAvoidingView>
        </Modalize>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#555",
    height: 42,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
    paddingLeft: 8,
    fontFamily: "RobotoSlab_400Regular",
  },
});
