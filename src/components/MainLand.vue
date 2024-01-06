<template>
  <MapContainer style="width:600px;height: 80vh" ref="mapContainer"></MapContainer>
  <el-button @click="fetchData">加载数据</el-button>
  <div>第{{ dataindex }}条数据</div>
  <el-button @click="confirm('like')">相似</el-button>
  <el-button @click="confirm('unlike')">不相似</el-button>
  <el-button @click="saveRecords">下载数据</el-button>
</template>

<script>
import MapContainer from './MapContainer'
import axios from 'axios'
import { ref, toRaw } from "vue";
export default {
  name: "MainLand",
  components: { MapContainer },
  setup() {
    const linedatas = ref()
    const dataindex = ref(0)
    const records = ref([])
    const mapContainer = ref(null)
    async function fetchData() {
      const response = await axios.get('testlines.txt');
      linedatas.value = response.data.split('\n').map(line => {
        const linecouple = JSON.parse(line)
        return linecouple
      });
      nextdata()
    }
    const nextdata = () => {
      mapContainer.value.clearmap()
      if (dataindex.value >= linedatas.value.length) {
        dataindex.value = 0
      }
      const jsonA = {
        "type": "LineString",
        "coordinates": toRaw(linedatas.value[dataindex.value]['lineA'])
      }
      const jsonB = {
        "type": "LineString",
        "coordinates": toRaw(linedatas.value[dataindex.value]['lineB'])
      }
      mapContainer.value.loadGeojson(jsonB)
      mapContainer.value.loadGeojson(jsonA)
    }
    const confirm = (status) => {
      const outjson = {
        "lineA": linedatas.value[dataindex.value]['lineA'],
        "lineB": linedatas.value[dataindex.value]['lineB'],
        "type": status
      }
      records.value.push(outjson)
      dataindex.value += 1
      nextdata()
    }
    const saveRecords = () => {
      const data = JSON.stringify(toRaw(records.value), null, 2);
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'records.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
    return {
      dataindex,
      mapContainer,
      fetchData, confirm,
      saveRecords
    }
  }
}
</script>

<style scoped></style>