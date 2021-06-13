<template>
  <div class="container">
    <h2>{{ category }}</h2>

    <div :key="todo.id" v-for="todo in todos">
      <div
        v-if="category == todo.category"
        :class="[
          todo.column == 'WIP'
            ? 'wip'
            : todo.column == 'TODO'
            ? 'todo'
            : 'done',
          'todoDefault',
        ]"
        @dblclick="test"
        @mouseenter="showPen = todo.id"
        @mouseleave="showPen = ''"
      >
        <div
          v-if="!updateMode"
          class="circleCheck"
          @click="
            $emit(
              'toggle-check',
              todo.id,
              todo.column == 'DONE' ? 'TODO' : 'DONE'
            )
          "
        >
          <i
            :class="[
              todo.column == 'DONE' ? 'far fa-check-circle' : 'far fa-circle',
            ]"
          ></i>
        </div>
        <div class="todoText" v-if="updateMode !== todo.id">
          <h3>
            {{ todo.title }}
            <div>
              <i
                v-show="showPen == todo.id"
                class="fas fa-pen"
                @click="toggleUpdate(todo)"
              ></i>
              <i
                @click="$emit('delete-todo', todo.id)"
                class="fas fa-times cross"
              ></i>
            </div>
          </h3>
          <p>{{ todo.content }}</p>
        </div>
        <div class="update" v-else>
          <div>
            <input class="headerInput" type="text" v-model="inputTitle" />
            <input type="text" v-model="inputContent" />
          </div>
          <i class="fas fa-check" @click="updateTodo(todo)"></i>
          <i @click="toggleUpdate(todo)" class="fas fa-times cross"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'todoList',
  data() {
    return {
      showPen: false,
      updateMode: '',
      inputTitle: '',
      inputContent: '',
    };
  },
  props: {
    todos: Array,
    category: String,
    showAddTask: Boolean,
  },
  methods: {
    test(id) {
      console.log(id);
    },
    toggleUpdate(todo) {
      this.updateMode == todo.id
        ? (this.updateMode = '')
        : (this.updateMode = todo.id);
      this.inputTitle = todo.title;
      this.inputContent = todo.content;
    },
    updateTodo(todo) {
      let changed = false;
      if (todo.title != this.inputTitle || todo.content != this.inputContent) {
        changed = true;
      }
      if (!changed) {
        alert('Keine Änderungen gefunden');
        return;
      }
      let changedTodo = {
        id: todo.id,
        key: todo.key,
        title: this.inputTitle,
        content: this.inputContent,
        column: todo.column,
        category: todo.category,
      };
      this.$emit('update-todo', changedTodo);
      this.updateMode == todo.id
        ? (this.updateMode = '')
        : (this.updateMode = todo.id);
    },
  },
};
</script>
<style scoped>
i {
  cursor: pointer;
}

.fa-check {
  color: #65c89b;
}
.update i {
  margin-left: 7px;
}

.update input {
  display: block;
  width: 90%;
  font-size: 16px;
  padding: 2px 5px;
  margin: 5px 0;
  flex: 1;
}

.headerInput {
  font-weight: bold;
  font-size: 18px !important;
}

.update div {
  width: 100%;
}

.update {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.cross {
  color: var(--color-red);
}

.fas {
  cursor: pointer;
}

.fa-pen {
  margin-right: 10px;
  font-size: 15px;
}

.container {
  width: 40vw;
  padding: 0 20px 20px 20px;
  border-radius: 10px;
  background: var(--color-rosa);
  box-shadow: 1px 5px 5px #ccc;
}

.todo {
  background: var(--color-white);
}

.wip {
  background: #65c89b;
  color: #fff;
}

.done {
  background: #b3e6cf;
}

.todoDefault {
  padding: 0px;
  margin: 5px 0;
  padding: 10px 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}

.todoText h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todoText {
  width: 100%;
}

.container h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.circleCheck {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

h3,
p {
  margin: 3px 2px 3px 2px;
}
</style>
