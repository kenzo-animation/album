<template>
  <ion-list class="sticker-list" lines="none">
    <ion-item class="search-bar" lines="none">
      <ion-searchbar
        v-model="searchTerm"
        @ion-input="handleSearch"
        placeholder="Pesquisar por nome ou seleção..."
      ></ion-searchbar>
    </ion-item>

    <ion-item class="filters" lines="none">
      <ion-segment v-model="selectedFilter" @ion-change="handleFilter">
        <ion-segment-button value="todas">
          <ion-label>Todas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="coletadas">
          <ion-label>Coletadas</ion-label>
        </ion-segment-button>
        <ion-segment-button value="pendentes">
          <ion-label>Pendentes</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-item>

    <ion-content>
      <ion-text v-if="filteredStickers.length === 0" class="no-results">
        Nenhuma figurinha encontrada
      </ion-text>

      <ion-grid v-else class="grid-container">
        <ion-row>
          <ion-col v-for="sticker in filteredStickers" :key="sticker.id" size="6" size-md="4">
            <sticker-card :sticker="sticker" @toggle="handleToggle" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-list>
</template>

<script setup lang="ts">
/**
 * StickerList.vue - Componente que lista e filtra as figurinhas
 * 
 * Funcionalidades:
 * - Exibe grid de figurinhas
 * - Busca por nome ou seleção
 * - Filtro por status (todas, coletadas, pendentes)
 * - Alterna status de figurinhas
 */

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

// Funções do composable de álbum
const { pesquisar, filtrar, alternarColetada, obterFiguras } = useAlbum();

// Termo de busca digitado
const searchTerm = ref("");
// Filtro selecionado
const selectedFilter = ref("todas");

/**
 * Computed que retorna as figurinhas filtradas e pesquisadas
 */
const filteredStickers = computed(() => {
  return obterFiguras.value;
});

/**
 * Processa mudança na busca
 */
const handleSearch = (event: any) => {
  pesquisar(event.detail.value);
};

/**
 * Processa mudança no filtro
 */
const handleFilter = (event: any) => {
  filtrar(event.detail.value);
};

/**
 * Alterna status de coletada de uma figurinha
 */
const handleToggle = (id: number) => {
  alternarColetada(id);
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
  background: white;
}

.filters {
  padding: 10px;
  background: white;
  border-bottom: 1px solid #eee;
}

ion-segment {
  background: transparent;
}

ion-segment-button {
  color: #999;
}

ion-segment-button.segment-button-checked {
  color: #1abc9c;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #999;
}

@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>
