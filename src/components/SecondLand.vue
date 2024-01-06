<template>
    <MapContainer style="width:600px;height: 80vh" ref="mapContainer"></MapContainer>
    <el-button @click="fetchData">加载数据</el-button>
    <div >第{{ dataindex }}条数据{{status}}</div>
    <el-button @click="nextone()">下一条</el-button>
</template>
  
  <script>
  import MapContainer from './MapContainer'
  import axios from 'axios'
  import { ref,toRaw} from "vue";
  export default {
    name: "SecondLand",
    components: { MapContainer },
    setup() {
      const linedatas = ref()
      const dataindex = ref(0)
      const status=ref()
      const mapContainer = ref(null)
      async function fetchData() {
        const response = await axios.get('records.txt');
        linedatas.value = response.data
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
        status.value=linedatas.value[dataindex.value]['type']
      }
      const nextone=()=>{
        dataindex.value += 1
        nextdata()
      }
      return {dataindex,
        mapContainer,
        fetchData,nextone,status
      }
    }
  }
  </script>
  
  <style scoped></style>