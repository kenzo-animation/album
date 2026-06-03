<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ titulo }}</ion-title>
      <ion-buttons slot="end" v-if="exibirBotaoLogout">
        <ion-button @click="handleLogout">
          <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { useAuth } from "@/composables/useAuth";

interface Props {
  titulo?: string;
  exibirBotaoLogout?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titulo: "Álbum de Figurinhas",
  exibirBotaoLogout: false,
});

const emit = defineEmits<{
  logout: [];
}>();

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  emit("logout");
};
</script>

<style scoped>
ion-toolbar {
  background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
}
</style>
