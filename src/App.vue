<template>
  <ion-app>
    <div v-if="estaLogado && rotaRequerAutenticacao">
      <ion-tabs>
        <ion-tab-bar slot="bottom" color="primary">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="homeOutline"></ion-icon>
            <ion-label>Álbum</ion-label>
            <ion-badge v-if="progresso.coletadas > 0" color="secondary">{{ progresso.coletadas }}</ion-badge>
          </ion-tab-button>

          <ion-tab-button tab="collection" href="/collection">
            <ion-icon :icon="bagOutline"></ion-icon>
            <ion-label>Coleção</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profile" href="/profile">
            <ion-icon :icon="personOutline"></ion-icon>
            <ion-label>Perfil</ion-label>
          </ion-tab-button>
        </ion-tab-bar>

        <ion-router-outlet></ion-router-outlet>
      </ion-tabs>
    </div>
    <div v-else>
      <ion-router-outlet />
    </div>
  </ion-app>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonBadge,
} from '@ionic/vue';
import { homeOutline, bagOutline, personOutline } from 'ionicons/icons';
import { useAuth } from '@/composables/useAuth';
import { useAlbum } from '@/composables/useAlbum';

const route = useRoute();
const { estaLogado: checkLogado, carregarUsuarioSalvo } = useAuth();
const { calcularProgresso, carregarDoLocalStorage } = useAlbum();

const estaLogado = computed(() => checkLogado());
const progresso = computed(() => calcularProgresso());

const rotasAutenticadas = ['Home', 'Collection', 'Profile'];
const rotaRequerAutenticacao = computed(() => {
  return rotasAutenticadas.includes(route.name as string);
});

onMounted(() => {
  carregarUsuarioSalvo();
  carregarDoLocalStorage();
});
</script>

<style scoped>
ion-app {
  --ion-background-color: #f5f7fa;
}
</style>
