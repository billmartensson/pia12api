import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [isloading, setIsloading] = useState(true);

  const [searchtext, setSearchtext] = useState("söka söka");

  const [mytext, setMytext] = useState("");
  const [mynumber, setMynumber] = useState(0);

  const [categories, setCategories] = useState(["Apelsin", "Banan"]);

  function loadjoke() {
    setIsloading(true);
    fetch("https://api.chucknorris.io/jokes/random")
    .then(response => response.json())
    .then(json => {
      console.log(json.value);
      setMytext(json.value);
    })
    .catch(error => {
      console.log("NU BLEV DET FEL!");
    })
    .finally(() => {
      setIsloading(false);
    });
  }

  function loadcategories() {
    setIsloading(true);
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setCategories(json);
    })
    .catch(error => {
      console.log("NU BLEV DET FEL!");
    })
    .finally(() => {
      setIsloading(false);
    });
  }

  function loadJokeForCategory(jokecat) {
    setIsloading(true);
    console.log("NU LADDA FRÅN KATEGORI");
    console.log(jokecat);

    fetch("https://api.chucknorris.io/jokes/random?category=" + jokecat)
    .then(response => response.json())
    .then(json => {
      console.log(json.value);
      setMytext(json.value);
    })
    .catch(error => {
      console.log("NU BLEV DET FEL!");
    })
    .finally(() => {
      setIsloading(false);
    });
  }

  function searchjoke() {
    setIsloading(true);
    fetch("https://api.chucknorris.io/jokes/search?query=" + searchtext)
    .then(response => response.json())
    .then(json => {

      console.log(json.total);

      if(json.total == 0) {
        setMytext("No jokes found!");
      } else {
        var randomjoke = Math.floor(Math.random() * json.total);
        console.log(json.result[randomjoke].value);
        setMytext(json.result[randomjoke].value);
      }

      
    })
    .catch(error => {
      console.log("NU BLEV DET FEL!");
    })
    .finally(() => {
      setIsloading(false);
    });
  }

  useEffect(() => {
    console.log("HURRA USE EFFECT");

    loadcategories();

    console.log("DETTA ÄR I SLUTET");


  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      {isloading ? (
        <ActivityIndicator />
      ) : (
        <Text>LADDAR INTE</Text>
      )}

      

      <Text style={styles.joketext}>{mytext}</Text>

      <TextInput value={searchtext} onChangeText={setSearchtext} />

      <Button title='Search' onPress={() => {
        searchjoke();
      }} />

      <Button title='New random joke' onPress={() => {
        loadjoke();
      }} />

      <FlatList 
      data={categories} 
      renderItem={(item) => (
        <TouchableOpacity onPress={() => {
          loadJokeForCategory(item.item);
        }}>
          <Text>{item.item}</Text>
        </TouchableOpacity>
      
      )} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  joketext: {
    margin: 50,
    backgroundColor: "#00ff00",
    height: 100
  }
});
