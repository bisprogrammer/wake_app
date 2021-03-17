<template>
  <v-app>
      <v-card
        class="d-flex justify-center align-center flex-column mb-6"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
        flat
        tile
      >
        <h2 class="text-center">Добавление нового поста</h2>
        <PostForm class="mb-8" />

        <h2 class="text-center mb-3">Список постов</h2>
        <Loader v-if="loading" />
        <Posts />
      </v-card>

      <v-dialog
        v-model="dialog"
        width="500"
      >
  
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Ошибка
          </v-card-title>
  
          <v-card-text>
            Произошла ошибка при получении данных
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import Loader from '../components/Loader';
import Posts from '../components/Posts';
import PostForm from '../components/PostForm';

export default {
  name: 'App',

  components: {
    Loader,
    Posts,
    PostForm,
  },

  data: () => ({
    loading: true,
    dialog: false,
    posts: []
  }),
  async mounted() {
    if (!localStorage.getItem("posts")) {
        const res = await this.$store.dispatch("getPosts");
        if (!res.ok) {
            this.dialog = true;
        }
    }
    this.loading = false;
  }
};
</script>
