<template>
  <ion-page>
    <ion-tabs>

      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="./ResetPasswordPage.vue">
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="perfil" href="./ProfilePage.vue">
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="config" href="./HomePage.vue">
          <ion-label>Config</ion-label>
        </ion-tab-button>

      </ion-tab-bar>

    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
</script>
