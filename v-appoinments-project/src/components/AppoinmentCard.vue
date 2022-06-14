Component card to show a single appoinment with data:
  - hour (string)
  - patient (string)
  - notes (string)
  - state  (string)

<template>
    <div class="appoinment-card">
        <div class="app-title">
            <p class="hour"><i class="fa fa-clock"></i> {{hour}}</p>
            <select v-if="isChangingState" class="state" v-model="dstate" @click="updateState">
              <option style="color:green;" value="done"> Done </option>
              <option style="color:red;" value="cancelled"> Cancelled </option>
              <option style="color:orange;" value="scheduled"> Scheduled </option>
              <option style="color:blue;" value="running"> Running </option>
            </select>
            <p class="state" @click="isChangingState = !isChangingState" v-else>
              <i class="fa fa-check-square" v-if="dstate=='done'" style="color:green;" :title="dstate"></i>
              <i class="fa fa-exclamation-triangle" v-else-if="dstate=='cancelled'" style="color:red;" :title="dstate"></i>
              <i class="fa fa-hourglass-half" v-else-if="dstate=='scheduled'" style="color:orange;" :title="dstate"></i>
              <i class="fa fa-comment" v-else-if="dstate=='running'" style="color:blue;" :title="dstate"></i>
            </p>
            <p class="patient" v-if="isNameNotesEditing"><i class="fa fa-user-circle"></i>
              <input name="patient" type="text" v-model="dpatient" />
            </p>
            <p class="patient" v-else><i class="fa fa-user-circle"></i> {{dpatient}}</p>
            <i class="fa fa-save" v-if="isNameNotesEditing"
               title="Save changes"
               @click="updateNameNotes"></i>
            <i class="fa fa-edit" v-else
               title="Edit name or notes"
               @click="isNameNotesEditing = !isNameNotesEditing"></i>
        </div>
        <p class="notes" v-if="isNameNotesEditing"><i class="fa fa-file"></i><textarea v-model="dnotes"></textarea> </p>
        <p class="notes" v-else><span><i class="fa fa-file"></i></span> {{dnotes}}</p>
    </div>
</template>

<script>
export default {
    name: "AppoinmentCard",
    props: {
        date: String,
        hour: String,
        patient: String,
        notes: String,
        state: String
    },
    data() {
      return {
        isNameNotesEditing: false,
        isChangingState: false,
        dpatient: this.patient,
        dnotes: this.notes,
        dstate: this.state
      }
    },
    methods: {
      updateNameNotes() {
        this.isNameNotesEditing = false;
        this.$emit("update-appoinment", [this.date, this.hour, this.dpatient, this.dnotes]);
      },
      updateState() {
        this.isChangingState = false;
        this.$emit("update-appoinment-state", [this.date, this.hour, this.dstate]);
      }
    }
}
</script>

<style scoped>
.appoinment-card {
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
.state {
  padding: 0.4rem 1rem;
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
textarea {
  width: 91%;
  margin: 1rem 2%;
}
</style>