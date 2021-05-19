<template>
  <div class="container">
    <h2>{{ category }}<button>+</button></h2>

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
      >
        <div class="circleCheck" @click="$emit('toggle-check', todo.id, todo.column)">
          <i
            :class="[todo.column == 'DONE' ? 'far fa-check-circle' : 'far fa-circle']"
          ></i>
        </div>
        <div class="todoText">
          <h3>
            {{ todo.title }}
            <i @click="$emit('delete-todo', todo.id)" class="fas fa-times cross"></i>
          </h3>
          <p>{{ todo.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "todoList",
  props: {
    todos: Array,
    category: String,
  },
};
</script>
<style scoped>
i{
  cursor: pointer;
}

.cross{
  color: var(--color-red);
}

.fas {
  cursor: pointer;
}

.container {
  width: 40vw;
  padding: 0 20px 20px 20px;
  border-radius: 10px;
  background: var(--color-rosa);
  box-shadow:  1px 5px 5px #ccc;
}

.todo {
  background: var(--color-white);
}

.wip {
  background: #65c89b;
  color: #fff;
}

.done {
  background: #ff735d;
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

.todoText{
  width: 100%
}

.container h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.circleCheck{
  display: flex;
  align-items: center;
  margin-right: 8px;
}

h3,
p {
  margin: 3px 2px 3px 2px;
}
</style>
