<template>
  <div id="app">
    <h1>
      To Do List
      <div class="errorMessage" v-if="error.active">
        {{ error.message }}
      </div>
    </h1>
    <button id="addButton" @click="toggleAddTodo">Aufgabe hinzufügen</button>
    <button @click="throwingError">Ich werfe einen Fehler</button>
    <!-- for each category a new container to split them -->
    <div class="allCategories">
      <div class="oneCategorie" :key="category" v-for="category in categories">
        <TodoList
          :todos="todos"
          @delete-todo="deleteTodo"
          @toggle-check="toggleCheck"
          @toggle-add-todo="toggleAddTodo"
          @update-todo="updateTodo"
          :category="category"
          :showAddTask="showAddTask"
        />
        <div v-if="showAddTask">
          <div class="overlay" v-if="showAddTask" @click="toggleAddTodo"></div>
          <AddTask
            @add-todo="addTodo"
            :categoryOfList="category"
            :categories="categories"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './variables.css';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTask from './components/AddTask';
export default {
  name: 'App',
  data() {
    return {
      baseURL: 'https://gruppenname.demo.datexis.com',
      todos: [],
      categories: [],
      showAddTask: false,
      error: {
        active: false,
        message: '',
      },
    };
  },
  methods: {
    throwingError() {
      this.error = {
        active: true,
        message: 'Ein Fehler ist aufgetreten',
      };
      throw new Error('I am an error, please fix me.');
    },
    addTodo(todo) {
      this.error.active = false;
      axios
        .post(this.baseURL + '/todos', {
          title: todo.title,
          content: todo.content,
          column: todo.column,
          category: todo.category,
        })
        .then(() => {
          this.reloadData();
          this.showAddTask = false;
        })
        .catch(() => {
          this.error = {
            active: true,
            message: 'Aufgabe konnte nicht hinzugefügt werden.',
          };
        });
    },

    toggleCheck(id, column) {
      this.error.active = false;

      axios
        .put(this.baseURL + '/todos/' + id, {
          column,
        })
        .then(() => {
          this.reloadData();
        })
        .catch(() => {
          this.error = {
            active: true,
            message: 'Status konnte nicht geändert werden.',
          };
        });
    },
    updateTodo(todo) {
      this.error.active = false;

      axios
        .put(this.baseURL + '/todos/' + todo.id, {
          title: todo.title,
          content: todo.content,
          column: todo.column,
          category: todo.category,
        })
        .then(() => {
          this.reloadData();
        })
        .catch(() => {
          this.error = {
            active: true,
            message: 'Aufgabe konnte nicht geändert werden.',
          };
        });
    },
    reloadData() {
      this.error.active = false;

      axios
        .get(this.baseURL + '/todos')
        .then(({ data }) => {
          this.todos = data.todos;
          this.filterCategories(this.todos);
        })
        .catch(() => {
          this.error = {
            active: true,
            message: 'Daten konnten nicht geladen werden.',
          };
        });
    },
    deleteTodo(id) {
      if (confirm('Willst du diese Aufgabe wirklich löschen?'))
        axios.delete(this.baseURL + '/todos/' + id).then(() => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          this.reloadData();
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
      let state = '';
      if (column === 'DONE') {
        state = 'TODO';
      } else if (column === 'TODO') {
        state = 'DONE';
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
    axios.get(this.baseURL + '/todos').then(({ data }) => {
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

#addButton{
  margin-right: 10px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h1 div {
  background-color: var(--color-red);
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
}

body {
  background: var(--color-grey);
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
  gap: 20px;
  margin-top: 20px;
}

.oneCategorie {
  display: flex;
  flex-direction: row;
}

button,
.button {
  border-radius: 25px;
  padding: 12px 25px;
  background: var(--color-blue);
  border: 0px;
  color: var(--color-darkopal);
}

button:hover,
.button:hover {
  background-color: #a4aab3;
  cursor: pointer;
}

label {
  margin-left: 5px;
}

::placeholder {
  font-size: 14px;
}

.button {
  margin-left: 5px;
}
</style>
