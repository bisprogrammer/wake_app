import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        posts: JSON.parse(localStorage.getItem("posts") || "[]"),
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        addPost(state, post) {
            state.posts.unshift(post);
            localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        removePost(state, id) {
            state.posts = state.posts.filter(post => post.id !== id);
            localStorage.setItem("posts", JSON.stringify(state.posts));
        },
        updatePost(state, post) {
            const index = state.posts.findIndex(item => item.id == post.id);
            state.posts.splice(index, 1, post);
            localStorage.setItem("posts", JSON.stringify(state.posts));
        }
    },
    actions: {
        async getPosts({commit}) {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (res.ok) {
                const posts = await res.json();
                commit("setPosts", posts);
                localStorage.setItem("posts", JSON.stringify(posts));
            }
            return res;
        }
    },
    getters: {
        allPosts(state) {
            return state.posts;
        },
    }
});

export default store;