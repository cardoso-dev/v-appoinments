<template>
  <div class="person">
    <h1>{{ personName }}</h1>
    <div class="searcher">
      <p>Search by date:</p> <DatePicker format="DD/MM/YYYY" @date-applied="this.$parent.searchByDate" />
      <button type="button"
        class="fa fa-calendar-plus" @click="showCreateForm = !showCreateForm"
        title="Create appoinment">
      </button>
    </div>
    <div v-if="!Object.keys(appoinments).length">No appoinments in period: {{period}} </div>
    <AppoinmentCreate v-show="showCreateForm" v-bind="$attrs" ref="formCreate" />
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
import AppoinmentCreate from './AppoinmentCreate.vue';
import DatePicker from 'vue-time-date-range-picker/dist/vdprDatePicker';
import 'vue-time-date-range-picker/dist/vdprDatePicker.min.css';

export default {
  name: 'PersonAppoinments',
  components: {
    AppoinmentDate,
    AppoinmentCreate,
    DatePicker
  },
  props: {
    personName: String,
    appoinments: Object,
    period: String
  },
  data() {
    return {
      showCreateForm: false,
    }
  },
  methods: {
    afterCreatedAppoinment() {
      this.showCreateForm = false;
      this.$refs.formCreate.cleanForm();
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
.searcher {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.searcher * {
  padding: 0.15rem 1rem;
}
</style>
