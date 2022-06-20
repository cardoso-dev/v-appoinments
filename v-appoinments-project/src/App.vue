<template>
  <PersonAppoinments
    personName="Dentist Jhon Doe"
    :appoinments=dataAppoiments
    :period=period
    @create-new-appoinment="createNewAppoinment"
    @update-appoinment="updateAppoinment"
    @update-appoinment-state="updateAppoinmentState"
    @erase-appoinment="eraseAppoinment"
    @search-by-name="searchByName"
    @load-by-name="loadByName"
    ref="personListAppoinments"
    />
</template>

<script>
import { computed } from '@vue/reactivity';
import PersonAppoinments from './components/PersonAppoinments.vue';
import dataJson from './data/data.json';

export default {
  name: 'App',
  components: {
    PersonAppoinments
  },
  data(){
    let today = new Date();
    return {
      dataAppoiments: false,
      period: today.toLocaleString('en-us', { month: 'short' }) + "-" +
        today.getUTCDate().toString().padStart(2, '0'),
      foundNames: []
    }
  },
  methods: {
    searchByDate(s, e) {
      let key;
      let applyData = {};
      for (let includingDay=s.getUTCDate(); includingDay<=e.getUTCDate(); includingDay++) {
        key = s.toLocaleString('en-us', { month: 'short' }) + "-" + includingDay.toString().padStart(2, '0');
        if (dataJson[key]) {
          applyData[key] = dataJson[key];
        }
      }
      this.dataAppoiments = applyData;
      this.period = s.toLocaleString('en-us', { month: 'short' }) + "-" +
        s.getUTCDate().toString().padStart(2, '0') + " : " +
        e.toLocaleString('en-us', { month: 'short' }) + "-" +
        e.getUTCDate().toString().padStart(2, '0');
    },
    createNewAppoinment(data) {
      if (dataJson[data[0]]) {
        dataJson[data[0]][data[1]] = {
          "patient": data[2],
          "notes": data[3],
          "state": "scheduled"
        }
      } else {
        dataJson[data[0]] = {
          [data[1]]: {
            "patient": data[2],
            "notes": data[3],
            "state": "scheduled"
          }
        }
      }
      this.$refs.personListAppoinments.afterCreatedAppoinment();
    },
    updateAppoinment(data) {
      dataJson[data[0]][data[1]]["patient"] = data[2];
      dataJson[data[0]][data[1]]["notes"] = data[3];
    },
    updateAppoinmentState(data) {
      dataJson[data[0]][data[1]]["state"] = data[2];
    },
    eraseAppoinment(data) {
      delete dataJson[data[0]][data[1]];
    },
    searchByName(name){
      let options = [];
      let day;
      let hour;

      for (day in dataJson){
        for (hour in dataJson[day]){
          if(dataJson[day][hour]['patient'].toLowerCase().includes(name.toLowerCase())){
            if (options.indexOf(dataJson[day][hour]['patient']) === -1) {
              options.push(dataJson[day][hour]['patient']);
            }
          }
        }
      }
      this.foundNames = options;
    },
    loadByName(name){
      let applyData = {};
      let day;
      let hour;

      for (day in dataJson){
        for (hour in dataJson[day]){
          if(dataJson[day][hour]['patient'].toLowerCase() == name.toLowerCase()) {
            if (!applyData[day]) {
              applyData[day] = {};
            }
            applyData[day][hour] = dataJson[day][hour];
          }
        }
      }
      this.dataAppoiments = applyData;
    }
  },
  provide() {
    return {
      foundsByName: computed(() => this.foundNames)
    }
  },
  beforeMount() {
    this.searchByDate(new Date(), new Date());
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
