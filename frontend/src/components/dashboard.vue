<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <BarChart ref="bar"/>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Event Attendee Counts</h2>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Event Date</th>
              <th class="p-4 text-left">Event Attendees</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in queryData" :key="event._id">
              <td class="p-2 text-left">{{ event.eventName }}</td>
              <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
              <td class="p-2 text-left">{{ event.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import { DateTime } from "luxon";
import axios from "axios";
import BarChart from './BarChart.vue'

export default {
  components: {
    BarChart
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
  },
  data() {
    return {
      Dataplatform: "Backend Connection Failed",
      queryData: [],
    };
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/dashboard/`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
      let dates = [];
      let counts = [];
      for (let i = 0; i < resp.data.length; i++) {
        counts.push(resp.data[i].count)
        dates.push(resp.data[i].eventName)
      }
      this.$refs.bar.chartData = {
        labels: dates,
        datasets: [ { label: 'Attendee Counts',
            backgroundColor: '#f87979',data: counts } ]
      }
    });
  }
};
</script>
