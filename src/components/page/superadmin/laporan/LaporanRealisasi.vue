<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="mb-1">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Kelompok Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Filters.kdkelmatanggaran"
              @change="getMataAnggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Kelompok Mata Anggaran --</option>
              <option
                v-for="(item, index) in getKelompokMataAnggaran"
                :key="index"
                :value="item.kode_kelompok_mata_anggaran"
              >
                {{ item.nama_kelompok_mata_anggaran }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label
              class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Mata Anggaran <span class="text-red-600">*</span>
            </label>
            <select
              v-model="Filters.kdmatanggaran"
              :disabled="rowAllMataAnggaran == null"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">-- Pilih Mata Anggaran --</option>
              <option
                v-for="(item, index) in rowAllMataAnggaran"
                :key="index"
                :value="item.kode_mata_anggaran"
              >
                {{ item.nama_mata_anggaran }}
              </option>
            </select>
          </div>
          <div>
            <button
              class="w-full"
              style="
                border-radius: 6px;
                background: #006699;
                color: #ffff;
                height: 48px;
                padding-top: 11px;
                padding-bottom: 11px;
              "
              @click="getData"
            >
              Tampilkan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <DataTable
            :value="getAllData"
            tableStyle="min-width: 50rem"
            :rowClass="getClassdata"
            :headerClass="getClassHead"
          >
            <ColumnGroup type="header">
              <Row>
                <Column header="Divisi Corporate Secretary" :rowspan="2" style="font-size: 23px !important;"/>
                <Column :header="'Tahun ' + tahun" :colspan="24" />
              </Row>
              <Row>
                <Column
                  header="Total - CSE"
                  :colspan="6"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="753 - CSE"
                  :colspan="6"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="711 - DIR dan SEVP"
                  :colspan="6"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="712 - COMM"
                  :colspan="6"
                  style="background-color: rgb(233, 124, 34) !important"
                />
              </Row>
              <Row>
                <Column :header="tanggalLengkap" />
                <!-- Total -->
                <Column
                  header="Realisasi"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="Anggaran FY"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="Anggaran YTD"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="% FY"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="% YTD"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <Column
                  header="Sisa Anggaran"
                  style="background-color: rgb(140, 24, 198) !important"
                />
                <!-- CSE -->
                <Column
                  header="Realisasi"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="Anggaran FY"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="Anggaran YTD"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="% FY"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="% YTD"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <Column
                  header="Sisa Anggaran"
                  style="background-color: rgb(17, 155, 153) !important"
                />
                <!-- DIR dan SEV -->
                <Column
                  header="Realisasi"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="Anggaran FY"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="Anggaran YTD"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="% FY"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="% YTD"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <Column
                  header="Sisa Anggaran"
                  style="background-color: rgb(34, 137, 233) !important"
                />
                <!-- COMM -->
                <Column
                  header="Realisasi"
                  style="background-color: rgb(233, 124, 34) !important"
                />
                <Column
                  header="Anggaran FY"
                  style="background-color: rgb(233, 124, 34) !important"
                />
                <Column
                  header="Anggaran YTD"
                  style="background-color: rgb(233, 124, 34) !important"
                />
                <Column
                  header="% FY"
                  style="background-color: rgb(233, 124, 34) !important"
                />
                <Column
                  header="% YTD"
                  style="background-color: rgb(233, 124, 34) !important"
                />
                <Column
                  header="Sisa Anggaran"
                  style="background-color: rgb(233, 124, 34) !important"
                />
              </Row>
            </ColumnGroup>

            <Column style="min-width: 620px !important">
              <template #body="{ data }">
                {{
                  data.kode_sub_mata_anggaran != undefined &&
                  data.nama_sub_mata_anggaran != undefined
                    ? data.kode_sub_mata_anggaran +
                      " - " +
                      data.nama_sub_mata_anggaran
                    : data.kode_mata_anggaran != undefined &&
                      data.nama_mata_anggaran != undefined
                    ? data.kode_mata_anggaran + " - " + data.nama_mata_anggaran
                    : data.kode_kelompok_mata_anggaran +
                      " - " +
                      data.nama_kelompok_mata_anggaran
                }}
              </template>
            </Column>
            <!-- Total -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.totalrealisasikelmata != undefined
                    ? data.totalrealisasikelmata != 0
                      ? data.totalrealisasikelmata.toLocaleString("de-DE")
                      : "-"
                    : data.totalrealisasimata != undefined
                    ? data.totalrealisasimata != 0
                      ? data.totalrealisasimata.toLocaleString("de-DE")
                      : "-"
                    : data.totalsubrealisasi != 0
                    ? data.totalsubrealisasi.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.totalanggarankelmata != undefined
                    ? data.totalanggarankelmata != 0
                      ? data.totalanggarankelmata.toLocaleString("de-DE")
                      : "-"
                    : data.totalanggaranmata != undefined
                    ? data.totalanggaranmata != 0
                      ? data.totalanggaranmata.toLocaleString("de-DE")
                      : "-"
                    : data.totalsubanggaran != 0
                    ? data.totalsubanggaran.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.totalkelmtytd != undefined
                    ? data.totalkelmtytd != 0
                      ? data.totalkelmtytd.toLocaleString("de-DE")
                      : "-"
                    : data.totalmataytd != undefined
                    ? data.totalmataytd != 0
                      ? data.totalmataytd.toLocaleString("de-DE")
                      : "-"
                    : data.totalsubanggaranytd != 0
                    ? data.totalsubanggaranytd.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{
                    data.kelpresenteasefy != undefined
                      ? data.kelpresenteasefy
                      : data.presentasematafy != undefined
                      ? data.presentasematafy
                      : data.subpresentase
                  }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.kelpresenteasefy != undefined
                        ? data.kelpresenteasefy >= 0 && data.kelpresenteasefy <= 70
                          ? 'label-ijo'
                          : data.kelpresenteasefy >= 71 &&
                            data.kelpresenteasefy <= 90
                          ? 'label-yellow'
                          : data.kelpresenteasefy >= 91 &&
                            data.kelpresenteasefy <= 100
                          ? 'label-orange'
                          : 'label-red'
                        : data.presentasematafy != undefined
                        ? data.presentasematafy >= 0 && data.presentasematafy <= 70
                          ? 'label-ijo'
                          : data.presentasematafy >= 71 &&
                            data.presentasematafy <= 90
                          ? 'label-yellow'
                          : data.presentasematafy >= 91 &&
                            data.presentasematafy <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.subpresentase >= 0 && data.subpresentase <= 70
                        ? 'label-ijo'
                        : data.subpresentase >= 71 && data.subpresentase <= 90
                        ? 'label-yellow'
                        : data.subpresentase >= 91 && data.subpresentase <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{
                    data.kelpresenteaseytd != undefined
                      ? data.kelpresenteaseytd
                      : data.presentasemataytd != undefined
                      ? data.presentasemataytd
                      : data.subpresentase
                  }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.kelpresenteaseytd != undefined
                        ? data.kelpresenteaseytd >= 0 && data.kelpresenteaseytd <= 70
                          ? 'label-ijo'
                          : data.kelpresenteaseytd >= 71 &&
                            data.kelpresenteaseytd <= 90
                          ? 'label-yellow'
                          : data.kelpresenteaseytd >= 91 &&
                            data.kelpresenteaseytd <= 100
                          ? 'label-orange'
                          : 'label-red'
                        : data.presentasemataytd != undefined
                        ? data.presentasemataytd >= 0 && data.presentasemataytd <= 70
                          ? 'label-ijo'
                          : data.presentasemataytd >= 71 &&
                            data.presentasemataytd <= 90
                          ? 'label-yellow'
                          : data.presentasemataytd >= 91 &&
                            data.presentasemataytd <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.subpresentase >= 0 && data.subpresentase <= 70
                        ? 'label-ijo'
                        : data.subpresentase >= 71 && data.subpresentase <= 90
                        ? 'label-yellow'
                        : data.subpresentase >= 91 && data.subpresentase <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.totalsisaanggarankelmata != undefined
                    ? data.totalsisaanggarankelmata != 0
                      ? data.totalsisaanggarankelmata.toLocaleString("de-DE")
                      : "-"
                    : data.totalsisaanggaranmata != undefined
                    ? data.totalsisaanggaranmata != 0
                      ? data.totalsisaanggaranmata.toLocaleString("de-DE")
                      : "-"
                    : data.totalsubsisanggaran != 0
                    ? data.totalsubsisanggaran.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <!-- CSE -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasicse != undefined
                    ? data.nominalrealisasicse != 0
                      ? data.nominalrealisasicse.toLocaleString("de-DE")
                      : "-"
                    : data.realisasicse != null
                    ? data.realisasicse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfycse != undefined
                    ? data.anggaranfycse != 0
                      ? data.anggaranfycse.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranfycse != null
                    ? data.mataanggaranfycse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytdcse != undefined
                    ? data.anggaranytdcse != 0
                      ? data.anggaranytdcse.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytdcse != null
                    ? data.mataanggaranytdcse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{ data.fycse != undefined ? data.fycse : data.mtfycse }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.fycse != undefined
                        ? data.fycse >= 0 && data.fycse <= 70
                          ? 'label-ijo'
                          : data.fycse >= 71 && data.fycse <= 90
                          ? 'label-yellow'
                          : data.fycse >= 91 && data.fycse <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.mtfycse >= 0 && data.mtfycse <= 70
                        ? 'label-ijo'
                        : data.mtfycse >= 71 && data.mtfycse <= 90
                        ? 'label-yellow'
                        : data.mtfycse >= 91 && data.mtfycse <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{ data.ytdcse != undefined ? data.ytdcse : data.mtytdcse }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.ytdcse != undefined
                        ? data.ytdcse >= 0 && data.ytdcse <= 70
                          ? 'label-ijo'
                          : data.ytdcse >= 71 && data.ytdcse <= 90
                          ? 'label-yellow'
                          : data.ytdcse >= 91 && data.ytdcse <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.mtytdcse >= 0 && data.mtytdcse <= 70
                        ? 'label-ijo'
                        : data.mtytdcse >= 71 && data.mtytdcse <= 90
                        ? 'label-yellow'
                        : data.mtytdcse >= 91 && data.mtytdcse <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarancse != undefined
                    ? data.sisaanggarancse != 0
                      ? data.sisaanggarancse.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarancse != null
                    ? data.sisamtanggarancse.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <!-- DIR dan SEV -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasidir != undefined
                    ? data.nominalrealisasidir != 0
                      ? data.nominalrealisasidir.toLocaleString("de-DE")
                      : "-"
                    : data.realisasidir != null
                    ? data.realisasidir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfydir != undefined
                    ? data.anggaranfydir != 0
                      ? data.anggaranfydir.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranfydir != null
                    ? data.mataanggaranfydir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytddir != undefined
                    ? data.anggaranytddir != 0
                      ? data.anggaranytddir.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytddir != null
                    ? data.mataanggaranytddir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{ data.fydir != undefined ? data.fydir : data.mtfydir }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.fydir != undefined
                        ? data.fydir >= 0 && data.fydir <= 70
                          ? 'label-ijo'
                          : data.fydir >= 71 && data.fydir <= 90
                          ? 'label-yellow'
                          : data.fydir >= 91 && data.fydir <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.mtfydir >= 0 && data.mtfydir <= 70
                        ? 'label-ijo'
                        : data.mtfydir >= 71 && data.mtfydir <= 90
                        ? 'label-yellow'
                        : data.mtfydir >= 91 && data.mtfydir <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{ data.ytddir != undefined ? data.ytddir : data.mtytddir }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.ytddir != undefined
                        ? data.ytddir >= 0 && data.ytddir <= 70
                          ? 'label-ijo'
                          : data.ytddir >= 71 && data.ytddir <= 90
                          ? 'label-yellow'
                          : data.ytddir >= 91 && data.ytddir <= 100
                          ? 'label-orange'
                          : 'label-red'
                        : data.mtytddir >= 0 && data.mtytddir <= 70
                        ? 'label-ijo'
                        : data.mtytddir >= 71 && data.mtytddir <= 90
                        ? 'label-yellow'
                        : data.mtytddir >= 91 && data.mtytddir <= 100
                        ? 'label-orange'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarandir != undefined
                    ? data.sisaanggarandir != 0
                      ? data.sisaanggarandir.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarandir != null
                    ? data.sisamtanggarandir.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <!-- COMM -->
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.nominalrealisasicomm != undefined
                    ? data.nominalrealisasicomm != 0
                      ? data.nominalrealisasicomm.toLocaleString("de-DE")
                      : "-"
                    : data.realisasicomm != null
                    ? data.realisasicomm.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranfycomm != undefined
                    ? data.anggaranfycomm != 0
                      ? data.anggaranfycomm.toLocaleString("de-DE")
                      : "-"
                    : data.nominalmataanggarancomfy != null
                    ? data.nominalmataanggarancomfy.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 160px !important ; text-align: right">
              <template #body="{ data }">
                {{
                  data.anggaranytdcomm != undefined
                    ? data.anggaranytdcomm != 0
                      ? data.anggaranytdcomm.toLocaleString("de-DE")
                      : "-"
                    : data.mataanggaranytdcomm != null
                    ? data.mataanggaranytdcomm.toLocaleString("de-DE")
                    : "-"
                }}
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{ data.fycomm != undefined ? data.fycomm : data.mtfycomm }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.mtfycomm != undefined
                        ? data.mtfycomm >= 0 && data.mtfycomm <= 70
                          ? 'label-ijo'
                          : data.mtfycomm >= 71 && data.mtfycomm <= 90
                          ? 'label-yellow'
                          : data.mtfycomm >= 91 && data.mtfycomm <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.fycomm >= 0 && data.fycomm <= 70
                        ? 'label-ijo'
                        : data.fycomm >= 71 && data.fycomm <= 90
                        ? 'label-yellow'
                        : data.fycomm >= 91 && data.fycomm <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 90px !important; text-align: right">
              <template #body="{ data }">
                <div class="flex float-right">
                  {{
                    data.mtytdcomm != undefined ? data.mtytdcomm : data.ytdcomm
                  }}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    :class="
                      data.ytdcomm != undefined
                        ? data.ytdcomm >= 0 && data.ytdcomm <= 70
                          ? 'label-ijo'
                          : data.ytdcomm >= 71 && data.ytdcomm <= 90
                          ? 'label-yellow'
                          : data.ytdcomm >= 91 && data.ytdcomm <= 100
                          ? 'label-red'
                          : 'label-red'
                        : data.mtytdcomm >= 0 && data.mtytdcomm <= 70
                        ? 'label-ijo'
                        : data.mtytdcomm >= 71 && data.mtytdcomm <= 90
                        ? 'label-yellow'
                        : data.mtytdcomm >= 91 && data.mtytdcomm <= 100
                        ? 'label-red'
                        : 'label-red'
                    "
                  >
                    <path
                      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    />
                  </svg>
                </div>
              </template>
            </Column>
            <Column style="min-width: 160px !important; text-align: right">
              <template #body="{ data }">
                {{
                  data.sisaanggarancomm != null
                    ? data.sisaanggarancomm != 0
                      ? data.sisaanggarancomm.toLocaleString("de-DE")
                      : "-"
                    : data.sisamtanggarancomm != null
                    ? data.sisamtanggarancomm.toLocaleString("de-DE")
                    : "-"
                }}
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
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import serviceReport from "../../../../services/Report.service";
import serviceMataAnggaran from "../../../../services/MataAnggaran.service";
import serviceKMataAnggaran from "../../../../services/KelompokMataAnggaran.service";
export default {
  name: "Laporan Realisasi",
  data() {
    return {
      Filters: {
        kdkelmatanggaran: "",
        kdmatanggaran: "",
      },
      rowMataAnggaran: null,
      rowKelompokMataA: null,
      tahun: "",
      tanggalLengkap: "",
      listLaporan: null,
      token: sessionStorage.getItem("token"),
    };
  },
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  computed: {
    getAllData() {
      return this.listLaporan;
    },
    rowAllMataAnggaran() {
      return this.rowMataAnggaran;
    },
    getKelompokMataAnggaran() {
      return this.rowKelompokMataA;
    },
  },
  methods: {
    async getKMataAnggaran() {
      try {
        let res = await serviceKMataAnggaran.getDataKMataAnggaran(this.token);
        this.rowKelompokMataA = res.data.data;
      } catch (error) {
        console.log(error.response.data.Msg);
      }
    },
    async getMataAnggaran() {
      this.Filters.kdmatanggaran = "";
      let payload = {
        kdkelmatanggaran: this.Filters.kdkelmatanggaran,
      };
      try {
        let respon = await serviceMataAnggaran.getDataMataAnggaran(
          payload,
          this.token
        );

        this.rowMataAnggaran = respon.data.data;
      } catch (error) {
        this.rowMataAnggaran = null;
        console.log(error);
      }
    },
    getTahun() {
      const d = new Date();
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      this.tahun = d.getFullYear();
      let namaBulan = month[d.getMonth()];
      let hari = days[d.getDay()];

      this.tanggalLengkap =
        hari + ", " + namaBulan + " " + d.getDate() + ", " + this.tahun;
    },
    async getData() {
      if (this.Filters.kdkelmatanggaran == "") {
        this.listLaporan = null;
        return this.$swal({
          icon: "info",
          title: "Pemberitahuan",
          text: "Pilih Kelompok Mata Anggaran Terlebih Dahulu",
          confirmButtonColor: "#e77817",
        });
      }
      if (this.Filters.kdmatanggaran == "") {
        this.listLaporan = null;
        return this.$swal({
          icon: "info",
          title: "Pemberitahuan",
          text: "Pilih Mata Anggaran Terlebih Dahulu",
          confirmButtonColor: "#e77817",
        });
      }

      try {
        let res = await serviceReport.laporanRealisasi(
          this.Filters,
          this.token
        );
        this.listLaporan = res.data.data;
      } catch (error) {
        this.listLaporan = null;
        console.log(error);
      }
    },
    getClassdata(data) {
      return data.kode_kelompok_mata_anggaran != undefined
        ? "color-kmataanggaran"
        : data.kode_mata_anggaran != undefined
        ? "color-mataanggaran"
        : "";
    },
    getClassHead(data) {
      console.log(data);
    },
  },
  mounted() {
    this.getTahun();
    this.getKMataAnggaran();
  },
};
</script>
<style>
.label-ijo {
  fill: rgb(45, 220, 45);
  margin-left: 3px;
}
.label-yellow {
  fill: rgb(245, 195, 17);
  margin-left: 3px;
}
.label-orange {
  fill: rgb(255, 94, 0);
  margin-left: 3px;
}
.label-red {
  fill: rgb(241, 0, 0);
  margin-left: 3px;
}
.color-mataanggaran {
  background-color: rgb(93, 113, 121) !important;
  color: #fff !important;
}
.color-kmataanggaran {
  background-color: rgb(160, 166, 169) !important;
  color: #fff !important;
}
</style>
