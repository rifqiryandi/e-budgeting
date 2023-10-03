<template lang="">
  <div>
    <DataTable
      :data="data"
      :columns="columns"
      class="display table table-striped table-bordered"
      :option="{ responsive: true, autoWidth: true }"
    >  
    </DataTable>
  </div>
</template>
<script>
// import TutorialDataService from "../services/TutorialDataService";

import DataTable from "datatables.net-vue3";
import DataTableLib from "datatables.net-bs5";
import DataTablesCore from "datatables.net";
import "datatables.net-responsive-bs5";
DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);

export default {
  name: "tes-comp",
  components: {
    DataTable,
  },
  data() {
    return {
      data: null,
      columns: [
        {
          title:"NO",
          data:null,
          render:function(data,type,row,meta) {
            return `${meta.row+1}`
          }
        },
        {
          title:"Nama",
          data:'name'
        }
      ],
    };
  },
  methods: {
    // retrieveTutorials() {
    //   TutorialDataService.getAll()
    //     .then((response) => {
    //       this.data = response.data.data;
    //       console.log(response.data.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    // this.retrieveTutorials();
  },
};
</script>
<style>
  @import '../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css';
</style>
