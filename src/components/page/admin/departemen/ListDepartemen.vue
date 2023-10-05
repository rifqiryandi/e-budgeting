<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <button
        class="btn d-flex"
        style="
          border-radius: 16px;
          background: #006699;
          color: #ffff;
          height: 48px;
          padding-top: 11px;
          padding-bottom: 11px;
        "
        data-bs-toggle="modal"
        data-bs-target="#inputModal"
      >
        <span class="material-symbols-outlined"> add </span>
        Tambah Departemen
      </button>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getDataUser"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            :loading="loading"
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
            <Column field="nama" header="Nama" sortable style="width: 20%">
              <template #body="{ data }">
                <div style="font-weight: 600">
                  {{ data.nama }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotalaktif"
              header="Total Aktif"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-aktif" @click="getDataSpesifik(data, 1)">
                  {{ data.jumlahtotalaktif }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotalnonakatif"
              header="Total Non-Aktif"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-nonaktif" @click="getDataSpesifik(data, 0)">
                  {{ data.jumlahtotalnonakatif }}
                </div>
              </template>
            </Column>
            <Column
              field="jumlahtotal"
              header="Total Kantor"
              sortable
              style="width: 20%"
            >
              <template #body="{ data }">
                <div class="label-total" @click="getDataSpesifik(data)">
                  {{ data.jumlahtotal }}
                </div>
              </template>
            </Column>
            <Column header="Aksi" sortable style="width: 20%">
              <template #body="{ data }">
                <div class="label-total" @click="getDataSpesifik(data)">
                  <button
                    class="btn btn-sm"
                    title="DETAIL"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                  >
                    <span class="material-symbols-outlined"> visibility </span>
                  </button>
                  <!-- {{ data }} -->
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="inputModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div
          class="modal-header"
          style="background-color: #ff6600; color: #ffff"
        >
          <h5 class="modal-title" id="exampleModalLabel">Tambah User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            BATAL
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color: #006699; border: 0"
            data-bs-dismiss="modal"
            @click="inputData()"
          >
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Update Modal -->
  <div
    class="modal fade"
    id="updateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div
          class="modal-header"
          style="background-color: #ff6600; color: #ffff"
        >
          <h5 class="modal-title" id="exampleModalLabel">Data User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            BATAL
          </button>
          <button
            type="button"
            class="btn btn-primary"
            style="background-color: #003b2e; border: 0"
            data-bs-dismiss="modal"
            @click="updateData()"
          >
            SIMPAN
          </button>
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
  name: "Departemen",
  data() {},
  components: {
    DataTable,
    Column,
    InputText,
  },
  mounted() {},
};
</script>
<style lang=""></style>
