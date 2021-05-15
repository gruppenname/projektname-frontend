<template>
  <div id="app">
    <h1>To Do List</h1>
    <button @click="toggleAddTodo">Add Todo</button>
    <div v-if="showAddTask">
      <div class="overlay" v-if="showAddTask" @click="toggleAddTodo"></div>
      <AddTask @add-todo="addTodo" />
    </div>
    <!-- for each category a new container to split them -->
    <div class="allCategories">
      <div class="oneCategorie" :key="category" v-for="category in categories">
        <TodoList
          :todos="todos"
          @delete-todo="deleteTodo"
          @toggle-check="toogleCheck"
          :category="category"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";
export default {
  name: "App",
  data() {
    return {
      baseURL: "http://localhost:8080",
      todos: [],
      categories: [],
      showAddTask: false,
    };
  },
  methods: {
    addTodo(todo) {
      axios
        .post(this.baseURL + "/todos", {
          title: todo.title,
          content: todo.content,
          column: todo.column,
          category: todo.category,
        })
        .then(({ data }) => {
          console.log(data);
          this.reloadData();
          this.showAddTask = false
        });
    },
    reloadData() {
      axios.get(this.baseURL + "/todos").then(({ data }) => {
        this.todos = data.todos;
        this.filterCategories(this.todos);
      });
    },
    deleteTodo(id) {
      // axios delete methode
      axios.delete(this.baseURL + "/todos/" + id).then(({ data }) => {
        console.log(data);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    },
    filterCategories(todosList) {
      let arrayCategories = [];
      todosList.forEach((todo) => {
        arrayCategories.push(todo.category);
      });
      this.categories = [...new Set(arrayCategories)];
    },
    toogleCheck(id, column) {
      console.log(id, column);
      let state = "";
      if (column === "DONE") {
        state = "TODO";
      } else if (column === "TODO") {
        state = "DONE";
      }
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, column: state } : todo
      );
    },
    toggleAddTodo() {
      this.showAddTask = !this.showAddTask;
    },
  },
  components: {
    TodoList,
    AddTask,
  },
  created() {
    axios.get(this.baseURL + "/todos").then(({ data }) => {
      this.todos = data.todos;
      this.filterCategories(this.todos);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 30px 0 30px;
}

:root{
  --color-green: #65C89B
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.allCategories {
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: row; */
}

.oneCategorie {
  display: flex;
  flex-direction: row;
  margin: 10px;
}
</style>
