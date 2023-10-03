<template>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title">Data User</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <!-- <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button> -->
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <tableView></tableView>
        </div>
      </div>
    </div>
    <!-- /.card-body -->
    <div class="card-footer"></div>
  </div>
</template>

<script>
import tableView from "./Table.vue";
export default {
  components: {
    tableView,
  },
};
</script>

<style></style>
