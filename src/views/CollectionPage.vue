<template>
  <ion-page>
    <app-header titulo="Minha Coleção" :exibirBotaoLogout="false" />

    <ion-content>
      <div v-if="coletadas.length === 0" class="empty-state">
        <ion-icon :icon="imageOutline" size="large"></ion-icon>
        <p>Você ainda não coletou nenhuma figurinha</p>
        <ion-button color="primary" @click="irParaAlbum">Ir para o Álbum</ion-button>
      </div>

      <div v-else>
        <div class="collection-header">
          <p class="collection-count">{{ coletadas.length }} figurinhas coletadas</p>
        </div>

        <div class="grid-container">
          <sticker-card
            v-for="sticker in coletadas"
            :key="sticker.id"
            :sticker="sticker"
            @toggle="handleToggle"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonPage, IonContent, IonIcon, IonButton } from "@ionic/vue";
import { imageOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import StickerCard from "@/components/StickerCard.vue";
import { useAlbum } from "@/composables/useAlbum";

const router = useRouter();
const { obterColetadas, alternarColetada } = useAlbum();

const coletadas = computed(() => obterColetadas.value);

const handleToggle = (id: number) => {
  alternarColetada(id);
};

const irParaAlbum = () => {
  router.push("/home");
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.empty-state ion-icon {
  color: #1abc9c;
  margin-bottom: 20px;
}

.empty-state p {
  color: #999;
  margin-bottom: 20px;
}

.collection-header {
  background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.collection-count {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px;
}
</style>
