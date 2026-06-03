<template>
  <ion-page>
    <app-header titulo="Perfil" :exibirBotaoLogout="true" @logout="handleLogout" />

    <ion-content>
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </div>
          <h2>{{ usuario?.nome }}</h2>
          <p class="email">{{ usuario?.email }}</p>
        </div>

        <ion-card>
          <ion-card-content>
            <div class="profile-stat">
              <span class="stat-label">Figurinhas Coletadas</span>
              <span class="stat-value">{{ progresso.coletadas }} / {{ progresso.total }}</span>
            </div>

            <div class="profile-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: progresso.percentual + '%' }"
                ></div>
              </div>
              <p class="progress-text">{{ progresso.percentual }}% completo</p>
            </div>

            <ion-list>
              <ion-item>
                <ion-label>
                  <strong>Pendentes:</strong>
                </ion-label>
                <ion-label slot="end">{{ progresso.pendentes }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <strong>Coletadas:</strong>
                </ion-label>
                <ion-label slot="end">{{ progresso.coletadas }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <div class="profile-actions">
          <ion-button expand="block" color="danger" @click="handleLogout">
            Fazer Logout
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { personCircleOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import { useAuth } from "@/composables/useAuth";
import { useAlbum } from "@/composables/useAlbum";

const router = useRouter();
const { obterUsuarioLogado, logout } = useAuth();
const { calcularProgresso } = useAlbum();

const usuario = computed(() => obterUsuarioLogado());
const progresso = computed(() => calcularProgresso());

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.profile-container {
  padding: 20px;
}

.profile-header {
  background: white;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  font-size: 80px;
  color: #1abc9c;
  margin-bottom: 15px;
}

.profile-header h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
}

.email {
  margin: 0;
  color: #999;
  font-size: 14px;
}

ion-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.profile-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #1abc9c;
}

.profile-progress {
  margin: 20px 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1abc9c 0%, #16a085 100%);
  transition: width 0.3s ease;
}

.progress-text {
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}

ion-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
}

.profile-actions {
  margin-top: 20px;
}
</style>
