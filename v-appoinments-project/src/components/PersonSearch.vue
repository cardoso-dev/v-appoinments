<template>
  <div id="person-searcher">
    <input type="text" @keyup="searchOptions" v-model="searchingToken" />
    <ul v-show="hasResults">
        <li v-for="name in optionNames" :key="name" @click="loadByName(name)">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "PersonSearch",
    data() {
        return {
            hasResults: false,
            searchingToken: '',
            optionNames: this.foundsByName
        }
    },
    methods: {
        searchOptions(event) {
            if (event.key === 'Escape') {
                this.searchingToken = '';
            } else if (this.searchingToken.length>=2){
                this.$emit("search-by-name", this.searchingToken);
            }
        },
        loadByName(name) {
            this.$emit("load-by-name", name);
            this.hasResults = false;
        }
    },
    inject: ['foundsByName'],
    watch: {
        foundsByName: {
            handler(newvalue) {
                this.hasResults = newvalue.value.length>0;
            },
            deep: true
        }
    }
}
</script>

<style>
#person-searcher {
    position: relative;
}
#person-searcher ul {
    position: absolute;
    margin: 0;
    padding: 0.32rem;
    list-style: none;
    max-height: 50vh;
    width: 80%;
    overflow: auto;
    text-align: left;
    border: solid 1px rgb(85, 85, 85);
    background-color: white;
    z-index: 10;
}
#person-searcher ul li:hover {
    background-color: rgb(242, 242, 242);
    cursor: pointer;
    font-weight: bold;
}
</style>