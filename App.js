import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      todos: []
    }

  }

  componentDidMount() {
    this.setState({
      todos: [
        {key: '1', text: 'Learn React', completed: false},
        {key: '2', text: 'Learn React Native', completed: false},
        {key: '3', text: 'Learn Node.js', completed: false},
      ]
    })
  }

  handleChangeText = (text) => {
    this.setState({
      inputValue: text
    })
  }

  handleTodoPress = (key) => {
    this.setState({
      todos: this.state.todos.map(todo => 
        (todo.key === key) 
        ? { ...todo, completed: !todo.completed}
        : todo
      )
    })
  }

  handleSubmit = () => {
    if (this.state.inputValue !== '') {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            key: (this.state.todos.length + 1).toString(),
            text: this.state.inputValue,
            completed: false
          }
        ],
        inputValue: ''
      })
    } else {
      // alert('You must enter text to add a todo.')
    }
  }

  renderTodo = (todo) => {
      return todo.completed ?
        <Text
          style={styles.completedTodoItem}
          key={todo.key}
          onPress={() => this.handleTodoPress(todo.key)}
        >
          {todo.text}
        </Text>
      :
        <Text
          style={styles.todoItem}
          key={todo.key}
          onPress={() => this.handleTodoPress(todo.key)}
        >
          {todo.text}
        </Text>

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>React Native Todos</Text>
        {/* {this.state.todos.map((todo) => {return this.renderTodo(todo)})} */}

        <FlatList
          data={this.state.todos}
          renderItem={({item}) => {
              return item.completed ? 
              <Text 
                onPress={() => this.handleTodoPress(item.key)} 
                style={styles.completedTodoItem}>
                  {item.text}
              </Text>
              :
              <Text 
                onPress={() => this.handleTodoPress(item.key)} 
                style={styles.todoItem}>
                  {item.text}
              </Text>
          }}
        />

        <TextInput
          style={styles.input}
          value={this.state.inputValue}
          onChangeText={this.handleChangeText}
          placeholder="Start typing todo text here"
        />
        <Button
          title="Add Todo"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  appTitle: {
    color: 'blue',
    fontSize: 30,
    padding: 10,
    fontFamily: 'Cochin',
    fontWeight: 'bold'
  },
  todoItem: {
    margin: 10,
    fontSize: 20,
    fontFamily: 'Cochin'
  },
  completedTodoItem : {
    margin: 10,
    fontSize: 20,
    fontFamily: 'Cochin',
    textDecorationLine: 'line-through'
  },
  input: {
    fontFamily: 'Cochin',
    margin: 10,
    fontSize: 20
  }
});
