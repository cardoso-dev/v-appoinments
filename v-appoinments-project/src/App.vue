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
import fileSourceJson from './data/data.json';

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
      foundNames: [],
      dataJson: {}
    }
  },
  methods: {
    searchByDate(s, e) {
      let key;
      let applyData = {};
      for (let includingDay=s.getUTCDate(); includingDay<=e.getUTCDate(); includingDay++) {
        key = s.toLocaleString('en-us', { month: 'short' }) + "-" + includingDay.toString().padStart(2, '0');
        if (this.dataJson[key]) {
          applyData[key] = this.dataJson[key];
        }
      }
      this.dataAppoiments = applyData;
      this.period = s.toLocaleString('en-us', { month: 'short' }) + "-" +
        s.getUTCDate().toString().padStart(2, '0') + " : " +
        e.toLocaleString('en-us', { month: 'short' }) + "-" +
        e.getUTCDate().toString().padStart(2, '0');
    },
    createNewAppoinment(data) {
      if (this.dataJson[data[0]]) {
        this.dataJson[data[0]][data[1]] = {
          "patient": data[2],
          "notes": data[3],
          "state": "scheduled"
        }
      } else {
        this.dataJson[data[0]] = {
          [data[1]]: {
            "patient": data[2],
            "notes": data[3],
            "state": "scheduled"
          }
        }
      }
      localStorage.setItem('v_appoinments', JSON.stringify(this.dataJson));
      this.$refs.personListAppoinments.afterCreatedAppoinment();
    },
    updateAppoinment(data) {
      this.dataJson[data[0]][data[1]]["patient"] = data[2];
      this.dataJson[data[0]][data[1]]["notes"] = data[3];
      localStorage.setItem('v_appoinments', JSON.stringify(this.dataJson));
    },
    updateAppoinmentState(data) {
      this.dataJson[data[0]][data[1]]["state"] = data[2];
      localStorage.setItem('v_appoinments', JSON.stringify(this.dataJson));
    },
    eraseAppoinment(data) {
      delete this.dataJson[data[0]][data[1]];
      localStorage.setItem('v_appoinments', JSON.stringify(this.dataJson));
    },
    searchByName(name){
      let options = [];
      let day;
      let hour;

      for (day in this.dataJson){
        for (hour in this.dataJson[day]){
          if(this.dataJson[day][hour]['patient'].toLowerCase().includes(name.toLowerCase())){
            if (options.indexOf(this.dataJson[day][hour]['patient']) === -1) {
              options.push(this.dataJson[day][hour]['patient']);
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

      for (day in this.dataJson){
        for (hour in this.dataJson[day]){
          if(this.dataJson[day][hour]['patient'].toLowerCase() == name.toLowerCase()) {
            if (!applyData[day]) {
              applyData[day] = {};
            }
            applyData[day][hour] = this.dataJson[day][hour];
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
    let localStData = localStorage.getItem('v_appoinments');
    if (localStData) {
      this.dataJson = JSON.parse(localStData)
    } else {
      this.dataJson = fileSourceJson;
      localStorage.setItem('v_appoinments', JSON.stringify(this.dataJson));
    }
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
