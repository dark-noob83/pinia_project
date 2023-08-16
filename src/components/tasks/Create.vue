<template>
  <div class="row">
    <div class="col-md-12 mb-4">
      <h4>Create Tasks :</h4>
      <form @submit.prevent="stroeTask" class="row">
        <div class="col-md-6">
          <input v-model="title" class="form-control" type="text" />
          <div class="form-text text-danger">{{ titleErrorText }}</div>
        </div>
        <div class="col-auto">
          <button class="btn btn-dark">
            Create
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../../store/task";
export default {
  setup() {
    const store = useTaskStore();
    const title = ref("");
    const titleErrorText = ref("");
    const loading = ref(false);

    async function stroeTask() {
      if (title.value == "") {
        titleErrorText.value = "Title is required";
      } else {
        loading.value = true;
        titleErrorText.value = "";
        await store.stroeTask(title.value);
        loading.value = false;
      }
    }

    return {
      stroeTask,
      title,
      titleErrorText,
      loading,
    };
  },
};
</script>

<style>
</style>