<template>
    <div class="create-form">
        <h2>Create new appoinment</h2>
        <p v-show="invalidDataMessage" class="invalid-message">There is some invalid data</p>
        <p>Pick date and hour: <VueCtkDateTimePicker
          v-model="chosenDateTime"
          output-format="MMM-DD HH:mm"
          class="form-field" /></p>
        <p>Patient name: <input type="text" name="patient" v-model="patient" class="form-field" /></p>
        <p>Notes: <textarea type="text" name="notes" v-model="notes" class="form-field" /></p>
        <p><button @click="saveNewAppoinment">Save</button></p>
    </div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
    name: "AppoinmentCreate",
    data() {
        return {
            invalidDataMessage: false,
            chosenDateTime: '',
            patient: '',
            notes: ''
        }
    },
    components: {
        VueCtkDateTimePicker
    },
    methods: {
        saveNewAppoinment() {
            let tokens =this.chosenDateTime.split(' ');
            let dateString = tokens[0];
            let timeString = tokens[1];
            if (!dateString || !timeString || !this.patient || !this.notes) {
                this.invalidDataMessage = true;
            } else {
                this.invalidDataMessage = false;
                this.$emit("create-new-appoinment", [dateString, timeString, this.patient, this.notes]);
            }
        },
        cleanForm() {
            this.chosenDateTime = '';
            this.patient = '';
            this.notes = '';
        }
    }
}
</script>

<style>
.create-form {
    border: outset 3px rgb(239, 239, 239);
    padding: 0.3rem 1.3rem;
    margin: 1rem auto;
}
.create-form p {
  display: flex;
  justify-content: space-around;
}
.form-field {
    width: 75%;
}
.invalid-message {
    color: red;
    background-color: rgb(248 213 224);
    padding: 0.45rem 1rem;
}
</style>