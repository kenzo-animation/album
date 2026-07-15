<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/reset-password">
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="perfil" href="/tabs/profile">
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/tabs/home">
          <ion-label>Config</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
</script>
