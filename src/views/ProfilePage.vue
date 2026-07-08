<template>
  <ion-page>
    <app-header titulo="Perfil" :exibirBotaoLogout="true" @logout="handleLogout" />

    <ion-content>
      <ion-card class="profile-container">
        <ion-card class="profile-header">
          <ion-avatar class="profile-avatar">
            <ion-icon :icon="personCircleOutline"></ion-icon>
          </ion-avatar>
          <ion-title class="profile-name">{{ usuario?.nome }}</ion-title>
          <ion-text class="email">{{ usuario?.email }}</ion-text>
        </ion-card>

        <ion-card>
          <ion-card-content>
            <ion-item class="profile-stat" lines="none">
              <ion-text class="stat-label">Figurinhas Coletadas</ion-text>
              <ion-text slot="end" class="stat-value">{{ progresso.coletadas }} / {{ progresso.total }}</ion-text>
            </ion-item>

            <ion-item class="profile-progress" lines="none">
              <ion-progress-bar :value="progresso.percentual / 100"></ion-progress-bar>
            </ion-item>
            <ion-text class="progress-text">{{ progresso.percentual }}% completo</ion-text>

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

        <ion-item class="profile-actions" lines="none">
          <ion-button expand="block" color="danger" @click="handleLogout">
            Fazer Logout
          </ion-button>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
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
  IonText,
  IonTitle,
  IonProgressBar,
  IonAvatar,
} from "@ionic/vue";
import { personCircleOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import { useAuth } from "@/composables/useAuth";
import { useAlbum } from "@/composables/useAlbum";

const router = useRouter();
const { obterUsuarioLogado, logout } = useAuth();
const { calcularProgresso, carregarDoLocalStorage } = useAlbum();

const usuario = computed(() => obterUsuarioLogado());
const progresso = computed(() => calcularProgresso());

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  void carregarDoLocalStorage();
});
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

.profile-name {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
}

.email {
  display: block;
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

ion-progress-bar {
  --progress-background: #dcefe9;
  --background: #eee;
  margin-bottom: 10px;
}

.progress-text {
  display: block;
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
