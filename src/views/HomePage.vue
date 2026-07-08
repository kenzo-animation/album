<template>
  <ion-page>
    <app-header titulo="Álbum de Figurinhas" :exibirBotaoLogout="true" @logout="handleLogout" @contato="goToContato" />

    <ion-content>
      <ion-card class="album-header">
        <ion-grid class="stats-container">
          <ion-row>
            <ion-col size="4">
              <ion-card class="stat">
                <ion-text class="stat-value">{{ progresso.total }}</ion-text>
                <ion-text class="stat-label">Total</ion-text>
              </ion-card>
            </ion-col>
            <ion-col size="4">
              <ion-card class="stat">
                <ion-text class="stat-value">{{ progresso.coletadas }}</ion-text>
                <ion-text class="stat-label">Coletadas</ion-text>
              </ion-card>
            </ion-col>
            <ion-col size="4">
              <ion-card class="stat">
                <ion-text class="stat-value">{{ progresso.pendentes }}</ion-text>
                <ion-text class="stat-label">Pendentes</ion-text>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-card class="progress-container">
          <ion-item class="progress-info" lines="none">
            <ion-text>Progresso do Álbum</ion-text>
            <ion-text slot="end" class="progress-percent">{{ progresso.percentual }}%</ion-text>
          </ion-item>
          <ion-progress-bar :value="progresso.percentual / 100"></ion-progress-bar>
        </ion-card>
      </ion-card>

      <sticker-list />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
/**
 * HomePage.vue - Página principal do álbum de figurinhas
 * 
 * Exibe:
 * - Header com logout e botão de contato
 * - Resumo do álbum (total, coletadas, pendentes, percentual)
 * - Barra de progresso visual
 * - Lista de figurinhas com filtros e busca
 */

import { computed, onMounted } from "vue";
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonText, IonProgressBar, IonItem } from "@ionic/vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import StickerList from "@/components/StickerList.vue";
import { useAlbum } from "@/composables/useAlbum";

// Router para navegação
const router = useRouter();

// Composable de álbum com funções para manipular figurinhas
const { calcularProgresso, carregarDoLocalStorage } = useAlbum();

// Computed que calcula o progresso em tempo real
const progresso = computed(() => calcularProgresso());

// Carrega dados salvos quando página é montada
onMounted(() => {
  void carregarDoLocalStorage();
});

/**
 * Faz logout do usuário
 */
const handleLogout = () => {
  router.push("/login");
};

/**
 * Navega para página de contato
 */
const goToContato = () => {
  router.push("/contact");
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.album-header {
  background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
  color: white;
  padding: 20px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.stats-container {
  margin-bottom: 20px;
}

.stat {
  background: rgba(167, 193, 218, 0.568);
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  margin: 0;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  display: block;
  font-size: 12px;
  opacity: 0.9;
}

.progress-container {
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.progress-percent {
  font-weight: bold;
}

.home-actions {
  padding: 16px 20px 0;
}
</style>
