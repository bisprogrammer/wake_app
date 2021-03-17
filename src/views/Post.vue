<template>
    <div class="post">
        <h2>Post</h2>
        <v-row v-if="post">
            <v-col
            cols="12"
            >
            
                <v-text-field v-model="post.title" label="Заголовок"></v-text-field>
            </v-col>
            <v-col
            cols="12"
            >
                <v-textarea v-model="post.body" label="Текст"></v-textarea>
            </v-col>
            <v-col
            cols="12"
            >
                <v-btn @click="updatePost" :disabled="!valid">Обновить</v-btn>
            </v-col>
        </v-row>
        <p v-else>Пост не найден</p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            post: null,
        }
    },
    computed: {
        valid() {
            return this.post.title && this.post.body;
        }
    },
    methods: {
        updatePost() {
            this.$store.commit("updatePost", this.post);
            this.$router.push("/");
        }
    },
    created() {
        const posts = this.$store.getters.allPosts;
        this.post = posts.find(post => post.id == this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
.post {
    padding: 15px;
}
</style>