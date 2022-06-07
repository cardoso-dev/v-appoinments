<template>
  <PersonAppoinments
    personName="Dentist Jhon Doe"
    :appoinments=dataAppoiments
    />
</template>

<script>
import PersonAppoinments from './components/PersonAppoinments.vue';
import dataJson from './data/data.json';

export default {
  name: 'App',
  components: {
    PersonAppoinments
  },
  data(){
    return {
      dataAppoiments: dataJson
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
