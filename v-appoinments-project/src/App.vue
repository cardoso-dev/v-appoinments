<template>
  <PersonAppoinments
    personName="Dentist Jhon Doe"
    :appoinments="{
      'Jun-09':
        {
          '09:00 am': {
            'patient': 'Laura Martinez',
            'notes': 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate '
          },
          '10:00 am': {
            'patient': 'Kendra Rodriguez',
            'notes': 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo'
          },
          '04:00 pm': {
            'patient': 'Monica Smith',
            'notes': 'hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat'
          }
        },
      'Jun-10':
        {
          '08:00 am': {
            'patient': 'Abril White',
            'notes': 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate '
          },
          '10:30 am': {
            'patient': 'Williams Frederick',
            'notes': 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo'
          }
        }
    }"
    />
</template>

<script>
import PersonAppoinments from './components/PersonAppoinments.vue'

export default {
  name: 'App',
  components: {
    PersonAppoinments
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
