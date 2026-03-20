import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

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
  }

  //Função para remover receita (filter)
  const removerReceita = (idParaRemover) => {
    const listaFiltrada = listaReceitas.filter(
      (item) => item.id !== idParaRemover
    );

    setListaReceitas(listaFiltrada);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
