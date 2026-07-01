<!-- AppHeader.vue - Cabeçalho reutilizável com logout e botão de contato
     Props:
     - titulo: string - Título a exibir no header
     - exibirBotaoLogout: boolean - Se deve exibir botões de ação
     Emits:
     - logout: quando o usuário clica no logout
     - contato: quando o usuário clica no botão de contato
-->
<template>
  <ion-header>
    <ion-toolbar color="primary">
      <!-- Título do header -->
      <ion-title>{{ titulo }}</ion-title>
      
      <!-- Botões de ação no canto direito -->
      <ion-buttons slot="end" v-if="exibirBotaoLogout">
        <!-- Botão para ir ao formulário de contato -->
        <ion-button @click="handleContato" color="light">
          Contato
        </ion-button>
        <!-- Botão de logout -->
        <ion-button @click="handleLogout">
          <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
// Imports necessários
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

// Interface para as props do componente
interface Props {
  titulo?: string; // Título a ser exibido no header
  exibirBotaoLogout?: boolean; // Se deve mostrar botões de ação
}

// Define as props com valores padrão
const props = withDefaults(defineProps<Props>(), {
  titulo: "Álbum de Figurinhas",
  exibirBotaoLogout: false,
});

// Define os eventos que este componente emite
const emit = defineEmits<{
  logout: []; // Evento emitido quando usuário faz logout
  contato: []; // Evento emitido quando usuário clica em contato
}>();

// Obtém a função de logout do composable de autenticação
const { logout } = useAuth();

// Função chamada quando usuário clica no botão de logout
const handleLogout = () => {
  logout();
  emit("logout");
};

// Função chamada quando usuário clica no botão de contato
const handleContato = () => {
  emit("contato");
};
</script>


<style scoped>
ion-toolbar {
  background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
}
</style>
