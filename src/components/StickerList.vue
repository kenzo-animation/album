<template>
  <div class="sticker-list">
    <div class="search-bar">
      <ion-searchbar
        v-model="searchTerm"
        @ion-input="handleSearch"
        placeholder="Pesquisar por nome ou seleção..."
      ></ion-searchbar>
    </div>

    <div class="filters">
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
    </div>

    <ion-content>
      <div v-if="filteredStickers.length === 0" class="no-results">
        <p>Nenhuma figurinha encontrada</p>
      </div>

      <div v-else class="grid-container">
        <sticker-card
          v-for="sticker in filteredStickers"
          :key="sticker.id"
          :sticker="sticker"
          @toggle="handleToggle"
        />
      </div>
    </ion-content>
  </div>
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
