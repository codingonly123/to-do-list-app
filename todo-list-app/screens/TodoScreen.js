import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native-web";
import { IconButton } from "react-native-paper";
import Fallback from "./components/Fallback";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
      >
        <Text
          style={{ color: "white", fontSize: 20, fontWeight: "800", flex: 1 }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };
  return (
    <View style={{ marginHorizontal: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <Pressable
          style={{
            backgroundColor: "black",
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </Pressable>
      ) : (
        <Pressable
          style={{
            backgroundColor: "black",
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </Pressable>
      )}

      <FlatList data={todoList} renderItem={renderTodos} />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
