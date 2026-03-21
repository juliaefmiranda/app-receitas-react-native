import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function App() {
  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");

  const [listaReceitas, setListaReceitas] = useState([]);

  //Função para adicionar receita (spread operator)
  const adicionarReceita = () => {
    if (titulo.trim() === "") return;

    const receitaObjeto = {
      id: String(Date.now()),
      titulo,
      ingredientes,
      modoPreparo,
    };

    //Pega tudo que já tinha lista (...listaReceitas) e joga o novo item no final
    setListaReceitas([...listaReceitas, receitaObjeto]);

    setTitulo("");
    setIngredientes("");
    setModoPreparo("");
  };

  //Função para remover receita (filter)
  const removerReceita = (idParaRemover) => {
    const listaFiltrada = listaReceitas.filter(
      (item) => item.id !== idParaRemover,
    );

    setListaReceitas(listaFiltrada);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <Text style={styles.textoLogo}>CODE & COOK</Text>
      </View>
      <View style={styles.containerBanner}>
        <Image source={require("./assets/banner.png")} style={styles.banner} />
      </View>
      <View style={styles.containerFlatList}>
        <FlatList
          data={listaReceitas}
          keyExtractor={(item) => item.id}

          ListHeaderComponent={
            <>
              <View style={styles.main}>
                <Text style={styles.titulo}>Minhas Receitas</Text>

                <View style={styles.blocoInputs}>
                  <TextInput
                    style={styles.inputTitulo}
                    placeholder="O que vamos cozinhar hoje?"
                    placeholderTextColor="#866f70"
                    value={titulo}
                    onChangeText={setTitulo}
                    multiline={true}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Ingredientes ..."
                    placeholderTextColor="#866f70"
                    value={ingredientes}
                    onChangeText={setIngredientes}
                    multiline={true}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Modo de Preparo ..."
                    placeholderTextColor="#866f70"
                    value={modoPreparo}
                    onChangeText={setModoPreparo}
                    multiline={true}
                  />
                  <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarReceita}
                  >
                    <Text style={styles.textoBotaoAdicionar}>Adicionar receita</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.containerCards}>
              <View style={styles.cardReceita}>
                <View style={styles.blocoBranco}>
                  <Text style={styles.tituloReceita}>{item.titulo}</Text>
                </View>
                <View style={styles.blocoBranco}>
                  <Text style={styles.subtitulos}>{item.ingredientes}</Text>
                </View>
                <View style={styles.blocoBranco}>
                  <Text style={styles.subtitulos}>{item.modoPreparo}</Text>
                </View>

                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => removerReceita(item.id)}
                >
                  <Text style={styles.textoBotaoRemover}>Remover receita</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.containerVazio}>
              <Text style={styles.textoVazio}>
                Nenhuma receita por aqui! Hora de por a mão na massa 🥨
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerFlatList: {
    flex: 1,
    justifyContent: "flex-start"
  },
  header: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    width: 40,
    height: 40,
    objectFit: 'contain'
  },
  textoLogo: {
    color: '#D78387',
    fontWeight: '600',
  },
  containerBanner: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    margin: 10,
  },
  banner: {
    width: 330,
    height: 100,
    objectFit: 'cover',
    borderRadius: 15,
  },
  main: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 27,
    color: "#D78387",
    fontWeight: "600",
  },
  blocoInputs: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    backgroundColor: "#D78387",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
  inputTitulo: {
    width: "100%",
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    fontSize: 15,
  },

  botaoAdicionar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffff",
    borderRadius: 15,
    margin: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textoBotaoAdicionar: {
    color: "#D78387",
    fontWeight: "600",
  },
  cardReceita: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#D78387",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
  blocoBranco: {
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  tituloReceita: {
    color: "#866f70",
    fontWeight: "600",
    fontSize: 16,
    flexWrap: "wrap"
  },
  subtitulos: {
    color: "#866f70",
    flexWrap: "wrap"
  },
  botaoRemover: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    backgroundColor: "#D78387",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  textoBotaoRemover: {
    color: "#ffffff",
    fontWeight: "600",
  },
  containerVazio: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textoVazio: {
    textAlign: "center",
    color: "#866f70",
    marginTop: 30,
    fontSize: 14,
    fontWeight: "500"
  },
});
