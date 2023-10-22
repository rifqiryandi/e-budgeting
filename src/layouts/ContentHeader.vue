<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0 cstm-label">{{ NamePage }}</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/dashboard" class="cstm-label">Home</router-link>
            </li>
            <li class="breadcrumb-item cstm-label" style="padding-top: 5px;">
              {{ NamePage }}</li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->
</template>

<script>
export default {
  props: {
    NamePage: String,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,400&display=swap');

.cstm-label {
  color: #006699;
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
