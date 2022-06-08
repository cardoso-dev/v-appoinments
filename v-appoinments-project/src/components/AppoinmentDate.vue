Component to show a list of appoinment cards belonging to a single day
  - date (string)
  - appoinments (object)

<template>
    <div>
      <h3 class="day-head" @click="showDay(date)"><i class="fa fa-calendar"></i> {{date}}</h3>
      <div class="appoinments-by-day" v-for="(appoinment, hour, index) in appoinments"
            v-bind:key="index" v-show="showThisAppoinment(date)">
        <AppoinmentCard
          :hour=hour
          :patient=appoinment.patient
          :notes=appoinment.notes
          :state=appoinment.state 
        />
      </div>
    </div>
</template>

<script>
import AppoinmentCard from './AppoinmentCard.vue';

export default {
    name: "AppoinmentDate",
    components: {
        AppoinmentCard
    },
    props: {
        date: String,
        appoinments: Object
    },
    data() {
        return {
            showingDay: "--"
        }
    },
    methods: {
        showThisAppoinment(myDate){
            return myDate == this.showingDay;
        },
        showDay(activeDay){
            if (this.showingDay == activeDay) {
                this.showingDay = '--';
            } else{
                this.showingDay = activeDay;
            }
        },
    }
}
</script>

<style scoped>
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
</style>