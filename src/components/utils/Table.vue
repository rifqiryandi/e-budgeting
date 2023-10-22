<template>
  <div class="row mt-3">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getAllData"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            :loading="loading"
            @page="tes($event)"
          >
            <template #header>
              <div class="d-flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  <InputText placeholder="Search" />
                </span>
              </div>
            </template>
            <template #empty> No Data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <Column
              field="nama_sub_mata_anggaran"
              header="Nama Sub Mata Anggaran"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama_sub_mata_anggaran }}
                </div>
              </template>
            </Column>
            <Column
              field="nama_departement"
              header="Nama Departemen"
              style="width: 20%"
            >
              <template #body="{ data }">
                <div>
                  {{ data.nama_departement }}
                </div>
              </template>
            </Column>
            <Column field="tahun" header="Tahun" style="width: 20%">
              <template #body="{ data }">
                {{ data.tahun }}
              </template>
            </Column>
            <Column field="" header="Aksi" style="width: 10%">
              <template #body="{ data }">
                <button
                  class="bg-transparent mr-2"
                  title="EDIT"
                  @click="editDepartemen(data)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M206.154-200h49.461l370.387-370.386-49.461-49.462-370.387 370.387V-200Zm548.152-413.77L619.309-747.537l52.154-52.153q17.615-17.615 42.845-17.615t42.845 17.615l48.692 48.691q17.615 17.615 18.23 42.23.615 24.615-17 42.23l-52.769 52.769Zm-43.383 43.999-429.77 429.77H146.156v-134.998l429.769-429.77 134.998 134.998Zm-109.844-25.538-24.538-24.539 49.461 49.462-24.923-24.923Z"
                    />
                  </svg>
                </button>
                <button
                  class="bg-transparent"
                  title="HAPUS"
                  @click="deleteAnggaran(data)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-40v-59.999H360v-35.384h240v35.384h179.999V-720h-40v507.691q0 30.308-21 51.308t-51.308 21H292.309ZM680-720H280v507.691q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h375.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V-720ZM376.155-280h59.999v-360h-59.999v360Zm147.691 0h59.999v-360h-59.999v360ZM280-720v520-520Z"
                    />
                  </svg>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

export default {
  name: "TableComponent",
  props:{
    
  },
  data() {
    return {
      
    }
  },
  components: {
    DataTable,
    Column,
    InputText,
  },
  methods: {
    getPage(evt) {
      // let cstmPageParam = {
      //   page: evt.page + 1,
      //   first: evt.first + 1,
      //   rows: evt.rows,
      //   pageCount: evt.pageCount,
      // };
      console.log(evt);
    },
  },
};
</script>
<style>
.p-datatable-header {
  background-color: #ffff !important;
  border: none !important;
}
.p-datatable-thead tr th {
  background-color: #008073 !important;
  color: #fff !important;
}
</style>
