<template>
  <ion-list class="sticker-list" lines="none">
    <!-- Barra de pesquisa -->
    <ion-item class="search-bar" lines="none">
      <ion-searchbar
        v-model="searchTerm"
        @ion-input="handleSearch"
        placeholder="Pesquisar por nome ou seleção..."
      />
    </ion-item>

    <!-- Filtros -->
    <ion-item class="filters" lines="none">
      <ion-segment
        v-model="selectedFilter"
        @ion-change="handleFilter"
      >
        <ion-segment-button value="todas">
          <ion-label>Todas</ion-label>
        </ion-segment-button>

        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>

        <ion-segment-button value="pendentes">
          <ion-label>Pendentes</ion-label>
        </ion-segment-button>

        <ion-segment-button value="favoritas">
          <ion-label>Favoritas</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-item>

    <ion-content>

      <ion-text
        v-if="filteredStickers.length === 0"
        class="no-results"
      >
        Nenhuma figurinha encontrada.
      </ion-text>

      <ion-grid
        v-else
        class="grid-container"
      >
        <ion-row>

          <ion-col
            v-for="sticker in filteredStickers"
            :key="sticker.id"
            size="6"
            size-md="4"
          >

            <StickerCard
              :sticker="sticker"
              @toggle="handleToggle"
              @favoritar="handleFavoritar"
            />

          </ion-col>

        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-list>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import {
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonList,
  IonItem,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

import StickerCard from "./StickerCard.vue";

import { useAlbum } from "@/composables/useAlbum";

const {
  obterFiguras,
  pesquisar,
  filtrar,
  alternarColetada,
  favoritar,
} = useAlbum();

const searchTerm = ref("");

const selectedFilter = ref("todas");

const filteredStickers = computed(() => {

  return obterFiguras.value;

});

const handleSearch = (event: any) => {

  pesquisar(event.detail.value);

};

const handleFilter = (event: any) => {

  filtrar(event.detail.value);

};

const handleToggle = (id: number) => {

  alternarColetada(id);

};

const handleFavoritar = (id: number) => {

  favoritar(id);

};
</script>

<style scoped>
.sticker-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-bar {
  padding: 10px;
}

.filters {
  padding: 10px;
}

.grid-container {
  padding: 10px;
}

.no-results {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: gray;
  font-size: 16px;
}
</style>