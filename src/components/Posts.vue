<template>
    <div class="posts">
        <v-toolbar dense class="toolbar" color="primary" style="height: auto;">
            <v-row class="align-center">
                <v-col class="col-6">
                    <v-select
                        :items="items"
                        label="Фильтр"
                        v-model="filter"
                        :dark="true"
                    ></v-select>
                </v-col>
                <v-col class="col-6">
                    <v-checkbox
                        v-model="sort"
                        label="Сортировать по title"
                        :dark="true"
                    ></v-checkbox>
                </v-col>
            </v-row>
        </v-toolbar>
        <v-list :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'">
            <v-list-item
                v-for="(post, index) in filteredPosts"
                :key="post.id"
                class="pb-2 post"
                @click="$router.push('/post/' + post.id)"
            >
                <v-list-item-content>
                    <v-list-item-title class="pb-3">{{index + 1}}. {{post.title}}</v-list-item-title>
                    <p class="pb-3">{{post.body}}</p>
                    <div class="d-flex justify-center pb-3"><v-btn color="error" @click="removePost(post.id)">Удалить</v-btn></div>
                    <hr>
                </v-list-item-content>
            </v-list-item>
      </v-list>
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: [
                {
                    text: "Все",
                    value: "all"
                },
                {
                    text: "С длинным описанием (длина текста > 150)",
                    value: "long"
                },
                {
                    text: "С коротким описанием (длина текста <= 150)",
                    value: "short"
                }],
            filter: null,
            sort: false
        }
    },
    computed: {
        allPosts() {
            return this.$store.getters.allPosts;
        },
        filteredPosts() {
            let posts = this.allPosts.map(post => post);
            posts = this.sort ? posts.sort((valueA, valueB) => {
                let res = valueA.title == valueB.title ? 0 : valueA.title > valueB.title ? 1 : -1;
                return res;
            }) : posts;
            
            switch(this.filter) {
                case "all": {
                    return posts;
                }
                case "long": {
                    return posts.filter(post => post.body.length > 150);
                }
                case "short": {
                    return posts.filter(post => post.body.length <= 150);
                }
                default: {
                    return posts;
                }
            }
        }
    },
    methods: {
        removePost(id) {
            this.$store.commit("removePost", id);
        }
    }
}
</script>

<style lang="scss" scoped>
.posts {
    width: 100%;
}
.post {
    cursor: pointer;
    transition: background .3s;
    &:hover {
        background: lightgray;
    }
}
.toolbar {
    padding-top: 15px;
}
</style>

<style>
.posts .v-input__slot {
    margin-bottom: 0;
}
</style>