import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import {useState} from 'react'




export default function App() {
  const [todos, setTodos] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [todotitle, setTodotitle] = useState([]);
  const [tododesc, setTododesc] = useState([]);
  const [todoId, setTodoId] = useState(0);

  function createtodo1(){
    setTrigger(true)
  }

  function createtodo(){
    const newTodo = {title: todotitle, desc: tododesc, id: todoId};
    setTodos([...todos, newTodo])
    setTrigger(false)
    setTodotitle('')
    setTododesc('')
    setTodoId(todoId + 1)
  } 
  
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setTodoId(todoId - 1)
  };
  
  function deletealltodo(){
    setTodos([])
    setTodoId(0)
  }
  

  return (
    <View style={{flex:1}}>
      <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Matt's Amazing To Do App</Text>
            <Text>Your Current Todos: {todoId}</Text>
            <Pressable style={styles.clearallbtn} onPress={deletealltodo}>
              <Text style={styles.cleartext}>Clear All</Text>
            </Pressable>
            <Modal visible={trigger} animationType="slide" onRequestClose={()=> setTrigger(false)}>
              <View style ={styles.createpopup}>
                <Text> Create New Todo</Text>
                <TextInput style={styles.input} placeholder='Task Title' onChangeText={setTodotitle} value={todotitle} />
                <TextInput style={styles.input} placeholder='Task Description' onChangeText={setTododesc} value={tododesc}/>
                <Text style={styles.extra}>
                  <Button title='Create Todo' onPress={createtodo} style={styles.modalbtn}/>
                  <Button style ={styles.modalbtn} titleStyle= {styles.extra}color= 'red' title='Close' onPress={() => setTrigger(false)}/>
                </Text>
              </View>
            </Modal>
            {todos.map((todo) => (
              <View key={todo.id} style={styles.todocontainer}>
                <Text style={styles.todotitle}>{todo.title}</Text>
                <Text>{todo.desc}</Text>
                <Pressable onPress={()=> handleDeleteTodo(todo.id)} style={styles.deletetodobtn}>
                  <Text color='pink' style={styles.createtodotext}> Delete Todo</Text>
                </Pressable>
              </View>
            ))}
          </View>
          </ScrollView>
          <View style={styles.createtodo}>
              <Pressable onPress={createtodo1}>
                <Text color='black' style={styles.createtodotext}> Create Todo</Text>
              </Pressable>
          </View>
       
      </View>

    
  );
}

const styles = StyleSheet.create({
  modalbtn:{
    marginLeft: 10,
  },
  deletetodobtn:{
    backgroundColor:'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    marginTop: 10
  },
  todotitle:{
    fontWeight: 'bold',
    fontSize: 14,
  },
  createtodotext: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf:'center'
  },
  createtodo: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor:'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  cleartext:{
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  clearallbtn:{
    position: 'absolute',
    right: 15,
    top: 55,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  todocontainer:{
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30
  },
  extra: {
    margin: 10
  },
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  createBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: 60,
    paddingBottom: 20,
  },
  createpopup:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    padding: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,
    width: 200,
  }
});
