Component card to show a single appoinment with data:
  - hour (string)
  - patient (string)
  - notes (string)
  - state  (string)

<template>
    <div class="appoinment-card">
        <div class="app-title">
            <p class="hour"><i class="fa fa-clock"></i> {{hour}}</p>
            <p class="state">
            <i class="fa fa-check-square" v-if="state=='done'" style="color:green;" :title="state"></i>
            <i class="fa fa-exclamation-triangle" v-else-if="state=='cancelled'" style="color:red;" :title="state"></i>
            <i class="fa fa-hourglass-half" v-else-if="state=='scheduled'" style="color:orange;" :title="state"></i>
            <i class="fa fa-comment" v-else-if="state=='running'" style="color:blue;" :title="state"></i>
            </p>
            <p class="patient"><i class="fa fa-user-circle"></i> {{patient}}</p>
        </div>
        <p class="notes"><span><i class="fa fa-file"></i></span> {{notes}}</p>
    </div>
</template>

<script>
export default {
    name: "AppoinmentCard",
    props: {
        hour: String,
        patient: String,
        notes: String,
        state: String
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
</style>