<template>
  <ion-page>
    <app-header titulo="Minha Coleção" :exibirBotaoLogout="false" />

    <ion-content>
      <ion-card v-if="coletadas.length === 0" class="empty-state">
        <ion-icon :icon="imageOutline" size="large"></ion-icon>
        <ion-text>Você ainda não coletou nenhuma figurinha</ion-text>
        <ion-button color="primary" @click="irParaAlbum">Ir para o Álbum</ion-button>
      </ion-card>

      <ion-list v-else lines="none">
        <ion-item class="collection-header" lines="none">
          <ion-label class="collection-count">{{ coletadas.length }} figurinhas coletadas</ion-label>
        </ion-item>

        <ion-grid class="grid-container">
          <ion-row>
            <ion-col v-for="sticker in coletadas" :key="sticker.id" size="6" size-md="4">
              <sticker-card :sticker="sticker" @toggle="handleToggle" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { IonPage, IonContent, IonIcon, IonButton, IonCard, IonText, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { imageOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import StickerCard from "@/components/StickerCard.vue";
import { useAlbum } from "@/composables/useAlbum";

const router = useRouter();
const { obterColetadas, alternarColetada, carregarDoLocalStorage } = useAlbum();

const coletadas = computed(() => obterColetadas.value);

const handleToggle = (id: number) => {
  alternarColetada(id);
};

const irParaAlbum = () => {
  router.push("/home");
};

onMounted(() => {
  void carregarDoLocalStorage();
});
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
