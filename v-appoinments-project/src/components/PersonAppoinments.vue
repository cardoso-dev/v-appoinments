<template>
  <div class="person">
    <h1>{{ personName }}</h1>
    <div v-for="(appItems, key) in appoinments" v-bind:key="key">
      <h3 class="day-head" @click="showDay(key)"><i class="fa fa-calendar"></i> {{key}}</h3>
      <div class="appoinment-data" v-for="(appoinment, keyA) in appItems" v-bind:key="keyA" v-show="showThisAppoinment(key)">
        <div class="app-title">
          <p class="hour"><i class="fa fa-clock"></i> {{keyA}}</p>
          <p class="patient"><i class="fa fa-user-circle"></i> {{appoinment.patient}}</p>
        </div>
        <p class="notes"><span><i class="fa fa-file"></i></span> {{appoinment.notes}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonAppoinments',
  props: {
    personName: String,
    appoinments: Object,
  },
  data() {
    return {
      showingDay: "--"
    }
  },
  methods: {
    showDay(activeDay){
      if (this.showingDay == activeDay) {
        this.showingDay = '--';
      } else{
        this.showingDay = activeDay;
      }
    },
    showThisAppoinment(myDate){
      return myDate == this.showingDay;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person {
  max-width: 85%;
  margin: 1rem auto;
}
.day-head {
  margin: 40px 0 0;
  text-align: left;
  cursor: pointer;
  padding: 0.35rem 2rem;
}
.day-head:hover {
  padding-left: 1rem;
  border: solid 1px rgb(239, 239, 239);
  box-shadow: 0.27rem 0.15rem rgb(209, 209, 209);
}
.appoinment-data {
  max-width: 89%;
  margin:0.75rem auto;
  padding: 1.25rem 0.65rem;
  border: solid 1px rgb(230, 230, 230);
  box-shadow: 0.55rem 0.3rem rgb(189, 189, 189);
}
.app-title {
  border-bottom: solid 1px rgb(235, 235, 235);
  display: flex;
}
.hour {
  background-color: rgb(242, 242, 242);
  border: solid 1px rgb(242, 242, 242);
  border-radius: 0.8rem;
  padding: 0.35rem 1rem;
}
.patient {
  margin-left: 6.25rem;
  flex: 1;
  font-weight: bold;
}
.notes {
  text-align: left;
  padding: 2% 2% 3% 6%;
}
.notes span {
  float: left;
  margin: 0.15rem 2rem 1rem 0;
}
</style>
