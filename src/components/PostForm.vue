<template>
    <div>
        <v-row>
            <v-col
            cols="12"
            >
            
                <v-text-field v-model="title" label="Заголовок"></v-text-field>
            </v-col>
            <v-col
            cols="12"
            >
                <v-textarea v-model="body" label="Текст"></v-textarea>
            </v-col>
            <v-col
            cols="12"
            >
                <v-btn color="primary" @click="addPost" :disabled="!valid">Добавить</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: "",
            body: "",
        }
    },
    computed: {
        valid() {
            return this.title && this.body;
        }
    },
    methods: {
        addPost() {
            const post = {
                id: Math.random().toString(),
                title: this.title,
                body: this.body
            }
            this.$store.commit("addPost", post);
            this.title = "";
            this.body = "";
        }
    }
}
</script>
