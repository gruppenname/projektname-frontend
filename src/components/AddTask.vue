<template>
  <transition name="addTaskForm" appear>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Todo</label>
        <input
          type="text"
          v-model="title"
          name="title"
          placeholder="Add Todo"
        />
      </div>
      <div class="form-control">
        <label>Description</label>
        <input
          type="text"
          v-model="content"
          name="content"
          placeholder="Add description"
        />
      </div>
      <div class="form-control">
        <label>Category</label>
        <input
          type="text"
          v-model="category"
          name="category"
          placeholder="Add category"
        />
      </div>

      <input type="submit" value="Save Todo" class="btn btn-block" />
    </form>
  </transition>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      content: "",
      category: "",
    };
  },
  props: {
    showAddTask: Boolean,
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      //   if (!this.title) {
      //     alert("Please add a task");
      //     return;
      //   }
      const newTodo = {
        title: this.title,
        content: this.content,
        column: "TODO",
        category: this.category,
      };
      console.log(newTodo);
      this.$emit("add-todo", newTodo);
      this.title = "";
      this.content = "";
      this.category = "";
      this.showAddTask = false
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
  position: fixed;
  top: 25%;
  left: 25%;
  background-color: #65C89B;
  transform: translate(-25%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid #999
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 95%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
