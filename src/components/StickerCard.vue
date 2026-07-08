<template>
  <ion-card class="sticker-card" @click="toggleColetada" :class="{ coletada: sticker.coletada }">
    <div class="sticker-image-container">
      <img :src="sticker.foto" :alt="sticker.nome" class="sticker-image" />
      <ion-badge class="sticker-numero">{{ sticker.numero }}</ion-badge>
      <ion-badge v-if="sticker.coletada" color="success" class="badge-coletada">✓ Coletada</ion-badge>
    </div>
    <ion-card-content>
      <ion-text class="sticker-name">{{ sticker.nome }}</ion-text>
      <ion-text class="selecao">{{ sticker.selecao }}</ion-text>
      <ion-buttons class="button-container">
        <ion-button
          size="small"
          :color="sticker.coletada ? 'danger' : 'success'"
          @click.stop="toggleColetada"
        >
          {{ sticker.coletada ? "Remover" : "Coletar" }}
        </ion-button>
      </ion-buttons>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
/**
 * StickerCard.vue - Componente que exibe uma figurinha individual
 * 
 * Funcionalidades:
 * - Exibe imagem, número e nome da figurinha
 * - Mostra badge "Coletada" quando marcada
 * - Permite coletar/remover figurinha
 * - Emite evento ao usuário clicar para alternar status
 */

import { IonCard, IonCardContent, IonButton, IonBadge, IonText, IonButtons } from "@ionic/vue";
import { type Sticker } from "@/data/stickers";

// Interface para as props do componente
interface Props {
  sticker: Sticker; // Dados da figurinha a exibir
}

// Define as props
const props = defineProps<Props>();

// Define os eventos emitidos por este componente
const emit = defineEmits<{
  toggle: [id: number]; // Emitido quando usuário quer marcar/desmarcar figurinha
}>();

/**
 * Alterna o status de coletada da figurinha
 * Emite um evento com o ID da figurinha
 */
const toggleColetada = () => {
  emit("toggle", props.sticker.id);
};
</script>

<style scoped>
.sticker-card {
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(180, 234, 238, 0.1);
  background: #2f9b72;
}

.sticker-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.sticker-card.coletada {
  background: linear-gradient(135deg, #d4f1d4 0%, #e8f5e9 100%);
  border: 2px solid #4caf50;
}

.sticker-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89V0duOsmGzKCLmpQVh38d7FttTLl_iQIbQ&s");
  background-position: center;
  background-size: cover;
}

.sticker-image {
  display: block;
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.sticker-numero {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
}

.badge-coletada {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
}

ion-card-content {
  padding: 12px;
}

.sticker-name {
  display: block;
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.selecao {
  margin: 0;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.button-container {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
</style>
