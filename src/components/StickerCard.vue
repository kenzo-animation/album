<template>
  <ion-card
    class="sticker-card"
    @click="toggleColetada"
    :class="{ coletada: sticker.coletada }"
  >
    <div class="sticker-image-container">
      <img
        :src="sticker.foto"
        :alt="sticker.nome"
        class="sticker-image"
      />

      <div class="sticker-numero">
        {{ sticker.numero }}
      </div>

      <div
        v-if="sticker.coletada"
        class="badge-coletada"
      >
        ✓ Coletada
      </div>
    </div>

    <ion-card-content>

      <h2>{{ sticker.nome }}</h2>

      <p class="selecao">
        {{ sticker.selecao }}
      </p>

      <!-- Raridade -->
      <ion-chip :color="corRaridade">
        {{ sticker.raridade }}
      </ion-chip>

      <!-- Favorito -->
      <ion-icon
        class="favorite-icon"
        :icon="sticker.favorito ? heart : heartOutline"
        @click.stop="favoritar"
      />

      <div class="button-container">

        <ion-button
          size="small"
          :color="sticker.coletada ? 'danger' : 'success'"
          @click.stop="toggleColetada"
        >
          {{ sticker.coletada ? "Remover" : "Coletar" }}
        </ion-button>

      </div>

    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
} from "@ionic/vue";

import { computed } from "vue";

import { heart, heartOutline } from "ionicons/icons";

import type { Sticker } from "@/data/stickers";

interface Props {
  sticker: Sticker;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggle: [id: number];
  favoritar: [id: number];
}>();

const toggleColetada = () => {
  emit("toggle", props.sticker.id);
};

const favoritar = () => {
  emit("favoritar", props.sticker.id);
};

const corRaridade = computed(() => {
  switch (props.sticker.raridade) {
    case "Comum":
      return "success";

    case "Rara":
      return "primary";

    case "Épica":
      return "warning";

    case "Lendária":
      return "danger";

    default:
      return "medium";
  }
});
</script>

<style scoped>
.sticker-card {
  margin: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 12px;
  overflow: hidden;
  background: #2f9b72;
}

.sticker-card:hover {
  transform: translateY(-5px);
}

.sticker-card.coletada {
  border: 2px solid #4caf50;
}

.sticker-image-container {
  position: relative;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89V0duOsmGzKCLmpQVh38d7FttTLl_iQIbQ&s");
  background-position: center;
  background-size: cover;
}

.sticker-image {
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.sticker-numero {
  position: absolute;
  top: 8px;
  right: 8px;

  background: rgba(0, 0, 0, .7);

  color: white;

  padding: 4px 8px;

  border-radius: 4px;

  font-size: 12px;

  font-weight: bold;
}

.badge-coletada {
  position: absolute;

  top: 50%;

  left: 50%;

  transform: translate(-50%, -50%);

  background: rgba(76, 175, 80, .9);

  color: white;

  padding: 8px 12px;

  border-radius: 20px;

  font-weight: bold;
}

.favorite-icon {
  font-size: 26px;

  color: crimson;

  cursor: pointer;

  margin-top: 10px;

  display: block;
}

.button-container {
  margin-top: 12px;

  display: flex;

  justify-content: center;
}

.selecao {
  color: gray;

  margin-bottom: 10px;
}
</style>