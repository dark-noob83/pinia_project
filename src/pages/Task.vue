<template>
  <div>
    <div v-if="loading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="container mt-5">
      <CreateTask />
      <hr />
      <FilterTask />
      <div class="row g-3">
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <div class="card" :class="{ 'bg-light': task.completed }">
            <div
              class="card-body d-flex justify-content-between align-items-center"
            >
              <div>
                <del v-if="task.completed">{{ task.title }}</del>
                <div v-else>{{ task.title }}</div>
              </div>

              <div class="d-flex align-items-center">
                <UpdateTask :task="task" />

                <DeleteTask :id="task.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useTaskStore } from "../store/task";
import FilterTask from "../components/tasks/Filter.vue";
import CreateTask from "../components/tasks/Create.vue";
import UpdateTask from "../components/tasks/Update.vue";
import DeleteTask from "../components/tasks/Delete.vue";

export default {
  components: {
    FilterTask,
    CreateTask,
    UpdateTask,
    DeleteTask,
  },

  setup() {
    const store = useTaskStore();
    const tasks = computed(() => store.allTasks);
    const loading = ref(false);

    async function fetchTasks() {
      loading.value = true;
      await store.fetchTasks();
      loading.value = false;
    }
    fetchTasks();

    return {
      tasks,
      loading,
    };
  },
};
</script>
