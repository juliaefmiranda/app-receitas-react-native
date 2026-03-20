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
  const [novaReceita, setNovaReceita] = useState("");

  const [listaReceitas, setListaReceitas] = useState([]);

  //Função para adicionar receita (spread operator)
  const adicionarReceita = () => {
    if (novaReceita.trim() === "") return;

    const receitaObjeto = {
      id: String(Date.now()),
      texto: novaReceita,
    };

    //Pega tudo que já tinha lista (...listaReceitas) e joga o novo item no final
    setListaReceitas([...listaReceitas, receitaObjeto]);

    setNovaReceita("");
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
      <View style={styles.main}>
        <Text style={styles.titulo}>Minhas Receitas</Text>

        <View style={styles.blocoInputs}>
          <TextInput
            style={styles.input}
            placeholder="O que vamos cozinhar hoje?"
            value={novaReceita}
            onChangeText={setNovaReceita}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredientes ..."
            value={novaReceita}
            onChangeText={setNovaReceita}
          />
          <TextInput
            style={styles.input}
            placeholder="Modo de Preparo ..."
            value={novaReceita}
            onChangeText={setNovaReceita}
          />
          <TouchableOpacity
            style={styles.botaoAdicionar}
            onPress={adicionarReceita}
          >
            <Text style={styles.textoBotaoAdicionar}>Adicionar receita</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={listaReceitas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemLista}>
              <Text>{item.texto}</Text>
              {}
              <TouchableOpacity
                style={styles.botaoRemover}
                onPress={() => removerReceita(item.id)}
              >
                <Text style={styles.textoBotaoRemover}>Remover receita</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.textoVazio}>
              Nenhuma receita por aqui! Hora de por a mão na massa 🥨
            </Text>
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
    color: '#C5777B',
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
});
