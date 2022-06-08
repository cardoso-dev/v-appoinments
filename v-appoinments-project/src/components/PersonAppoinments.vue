<template>
  <div class="person">
    <h1>{{ personName }}</h1>
    <div v-for="(appItems, key) in appoinments" v-bind:key="key">
      <AppoinmentDate 
        :date=key
        :appoinments=appItems 
      />
    </div>
  </div>
</template>

<script>
import AppoinmentDate from './AppoinmentDate.vue';

export default {
  name: 'PersonAppoinments',
  components: {
    AppoinmentDate
  },
  props: {
    personName: String,
    appoinments: Object,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person {
  max-width: 85%;
  margin: 1rem auto;
}
</style>
