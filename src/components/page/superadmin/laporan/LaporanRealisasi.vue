<template>
  <div>
    <DataTable :value="getAllData" tableStyle="min-width: 50rem">
      <ColumnGroup type="header">
        <Row>
          <Column header="Divisi Corporate Secretary" :rowspan="2" />
          <Column :header="'Tahun ' + tahun" :colspan="18" />
        </Row>
        <Row>
          <Column header="753 - CSE" :colspan="6" />
          <Column header="711 - DIR dan SEVP" :colspan="6" />
          <Column header="712 - COMM" :colspan="6" />
        </Row>
        <Row>
          <Column :header="tanggalLengkap" />
          <!-- CSE -->
          <Column header="Realisasi" field="lastYearSale" />
          <Column header="Anggaran FY" field="lastYearSale" />
          <Column header="Anggaran YTD" field="thisYearSale" />
          <Column header="% FY" field="lastYearProfit" />
          <Column header="% YTD" field="thisYearProfit" />
          <Column header="Sisa Anggaran" field="thisYearProfit" />
          <!-- DIR dan SEV -->
          <Column header="Realisasi" field="lastYearSale" />
          <Column header="Anggaran FY" field="lastYearSale" />
          <Column header="Anggaran YTD" field="thisYearSale" />
          <Column header="% FY" field="lastYearProfit" />
          <Column header="% YTD" field="thisYearProfit" />
          <Column header="Sisa Anggaran" field="thisYearProfit" />
          <!-- COMM -->
          <Column header="Realisasi" field="lastYearSale" />
          <Column header="Anggaran FY" field="lastYearSale" />
          <Column header="Anggaran YTD" field="thisYearSale" />
          <Column header="% FY" field="lastYearProfit" />
          <Column header="% YTD" field="thisYearProfit" />
          <Column header="Sisa Anggaran" field="thisYearProfit" />
        </Row>
      </ColumnGroup>
      <Column style="min-width: 620px !important">
        <template #body="{ data }">
          {{
            data.kode_sub_mata_anggaran + " - " + data.nama_sub_mata_anggaran
          }}
        </template>
      </Column>

      <!-- CSE -->
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.nominalrealisasicse != null
              ? data.nominalrealisasicse.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important ; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranfycse != null
              ? data.anggaranfycse.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important ; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranytdcse != null
              ? data.anggaranytdcse.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.fycse >= 0 && data.fycse <= 70
                ? 'label-ijo'
                : data.fycse >= 71 && data.fycse <= 90
                ? 'label-yellow'
                : data.fycse >= 91 && data.fycse <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.fycse }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.ytdcse >= 0 && data.ytdcse <= 70
                ? 'label-ijo'
                : data.ytdcse >= 71 && data.ytdcse <= 90
                ? 'label-yellow'
                : data.ytdcse >= 91 && data.ytdcse <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.ytdcse }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.sisaanggarancse != null
              ? data.sisaanggarancse.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <!-- DIR dan SEV -->
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.nominalrealisasidir != null
              ? data.nominalrealisasidir.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranfydir != null
              ? data.anggaranfydir.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranytddir != null
              ? data.anggaranytddir.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.fydir >= 0 && data.fydir <= 70
                ? 'label-ijo'
                : data.fydir >= 71 && data.fydir <= 90
                ? 'label-yellow'
                : data.fydir >= 91 && data.fydir <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.fydir }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.ytddir >= 0 && data.ytddir <= 70
                ? 'label-ijo'
                : data.ytddir >= 71 && data.ytddir <= 90
                ? 'label-yellow'
                : data.ytddir >= 91 && data.ytddir <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.ytddir }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.sisaanggarandir != null
              ? data.sisaanggarandir.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <!-- COMM -->
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.nominalrealisasicomm != null
              ? data.nominalrealisasicomm.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranfycomm != null
              ? data.anggaranfycomm.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.anggaranytdcomm != null
              ? data.anggaranytdcomm.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.fycomm >= 0 && data.fycomm <= 70
                ? 'label-ijo'
                : data.fycomm >= 71 && data.fycomm <= 90
                ? 'label-yellow'
                : data.fycomm >= 91 && data.fycomm <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.fycomm }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 90px !important; text-align: center">
        <template #body="{ data }">
          <div
            :class="
              data.ytdcomm >= 0 && data.ytdcomm <= 70
                ? 'label-ijo'
                : data.ytdcomm >= 71 && data.ytdcomm <= 90
                ? 'label-yellow'
                : data.ytdcomm >= 91 && data.ytdcomm <= 100
                ? 'label-orange'
                : 'label-red'
            "
          >
            {{ data.ytdcomm }}%
          </div>
        </template>
      </Column>
      <Column style="min-width: 160px !important; text-align: right">
        <template #body="{ data }">
          {{
            data.sisaanggarancomm != null
              ? data.sisaanggarancomm.toLocaleString("de-DE")
              : "-"
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import serviceReport from "../../../../services/Report.service";
export default {
  name: "Laporan Realisasi",
  data() {
    return {
      tahun: "",
      tanggalLengkap: "",
      listLaporan: null,
      token: sessionStorage.getItem("token"),

      sales: [
        {
          product: "Bamboo Watch",
          lastYearSale: 51,
          thisYearSale: 40,
          lastYearProfit: 54406,
          thisYearProfit: 43342,
        },
        {
          product: "Black Watch",
          lastYearSale: 83,
          thisYearSale: 9,
          lastYearProfit: 423132,
          thisYearProfit: 312122,
        },
        {
          product: "Blue Band",
          lastYearSale: 38,
          thisYearSale: 5,
          lastYearProfit: 12321,
          thisYearProfit: 8500,
        },
        {
          product: "Blue T-Shirt",
          lastYearSale: 49,
          thisYearSale: 22,
          lastYearProfit: 745232,
          thisYearProfit: 65323,
        },
        {
          product: "Brown Purse",
          lastYearSale: 17,
          thisYearSale: 79,
          lastYearProfit: 643242,
          thisYearProfit: 500332,
        },
        {
          product: "Chakra Bracelet",
          lastYearSale: 52,
          thisYearSale: 65,
          lastYearProfit: 421132,
          thisYearProfit: 150005,
        },
        {
          product: "Galaxy Earrings",
          lastYearSale: 82,
          thisYearSale: 12,
          lastYearProfit: 131211,
          thisYearProfit: 100214,
        },
        {
          product: "Game Controller",
          lastYearSale: 44,
          thisYearSale: 45,
          lastYearProfit: 66442,
          thisYearProfit: 53322,
        },
        {
          product: "Gaming Set",
          lastYearSale: 90,
          thisYearSale: 56,
          lastYearProfit: 765442,
          thisYearProfit: 296232,
        },
        {
          product: "Gold Phone Case",
          lastYearSale: 75,
          thisYearSale: 54,
          lastYearProfit: 21212,
          thisYearProfit: 12533,
        },
      ],
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
  },
  methods: {
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
        hari + ", " + namaBulan + " " + d.getDay() + ", " + this.tahun;
    },
    async getData() {
      try {
        let res = await serviceReport.laporanRealisasi(this.token);
        this.listLaporan = res.data.data;
        console.log(this.listLaporan);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTahun();
    this.getData();
  },
};
</script>
<style>
.label-ijo {
  color: rgb(6, 165, 6);
}
.label-yellow {
  color: rgb(206, 206, 16);
}
.label-orange {
  color: rgb(255, 94, 0);
}
.label-red {
  color: rgb(237, 13, 13);
}
</style>
