<template>
  <ion-page>
    <app-header titulo="Álbum de Figurinhas" :exibirBotaoLogout="true" @logout="handleLogout" />

    <ion-content>
      <div class="album-header">
        <div class="stats-container">
          <div class="stat">
            <span class="stat-value">{{ progresso.total }}</span>
            <span class="stat-label">Total</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ progresso.coletadas }}</span>
            <span class="stat-label">Coletadas</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ progresso.pendentes }}</span>
            <span class="stat-label">Pendentes</span>
          </div>
        </div>

        <div class="progress-container">
          <div class="progress-info">
            <span>Progresso do Álbum</span>
            <span class="progress-percent">{{ progresso.percentual }}%</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progresso.percentual + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <sticker-list />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import StickerList from "@/components/StickerList.vue";
import { useAlbum } from "@/composables/useAlbum";

const router = useRouter();
const { calcularProgresso, carregarDoLocalStorage } = useAlbum();

const progresso = computed(() => calcularProgresso());

onMounted(() => {
  carregarDoLocalStorage();
});

const handleLogout = () => {
  router.push("/login");
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
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat {
  background: rgba(167, 193, 218, 0.568);
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
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

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
  transition: width 0.3s ease;
}
</style>
