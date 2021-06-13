<template>
  <transition name="addTaskForm" appear>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
        <label>Aufgabe</label>
        <input
          autocomplete="off"
          type="text"
          v-model="title"
          name="title"
          placeholder="Aufgabe hinzufügen"
        />
      </div>
      <div class="form-control">
        <label>Beschreibung</label>
        <input
          type="text"
          autocomplete="off"
          v-model="content"
          name="content"
          placeholder="Beschreibung hinzufügen"
        />
      </div>
      <div class="form-control">
        <label
          >Kategorie
          <button
            class="addCategory"
            @click.prevent="toggleInputCategory"
            v-if="
              showInputNewCategory
                ? (buttonText = 'Kategorie auswählen')
                : (buttonText = 'Neue Kategorie hinzufügen')
            "
          >
            {{ buttonText }}
          </button>
        </label>

        <select v-model="category" v-if="!showInputNewCategory">
          <option value="" disabled selected>Auswählen</option>
          <option
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </option>
        </select>

        <div v-if="showInputNewCategory">
          <input
            autocomplete="off"
            v-model="category"
            type="text"
            name="category"
            placeholder="Kategorie hinzufügen"
          />
        </div>
      </div>

      <input type="submit" value="Aufgabe speichern" class="button" />
    </form>
  </transition>
</template>

<script>
export default {
  name: 'AddTask',
  data() {
    return {
      title: '',
      content: '',
      category: '',
      value: '',
      selected: '',
      showInputNewCategory: false,
      buttonText: 'Add new category',
    };
  },
  props: {
    showAddTask: Boolean,
    categories: Array,
    categoryOfList: String,
  },

  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.title) {
        alert('Bitte Titel hinzufügen.');
        return;
      } else if (!this.category) {
        alert('Bitte Kategorie hinzufügen.');
        return;
      }
      const newTodo = {
        title: this.title,
        content: this.content,
        column: 'TODO',
        category: this.category,
      };
      this.$emit('add-todo', newTodo);
      this.title = '';
      this.content = '';
      this.category = '';
      this.showAddTask = false;
    },
    toggleInputCategory() {
      this.showInputNewCategory = !this.showInputNewCategory;
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
  position: fixed;
  top: 35%;
  left: 35%;
  background-color: #65c89b;
  transform: translate(-25%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid #999;
}
.form-control {
  margin: 20px 0;
}

.form-control input {
  width: 95%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control select {
  width: 99%;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}

label {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
