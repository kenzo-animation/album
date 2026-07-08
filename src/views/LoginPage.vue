<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login - Álbum de Figurinhas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="login-content">
      <ion-card class="login-container">
        <ion-card-header class="logo">
          <ion-text class="logo-icon">🏆</ion-text>
          <ion-title class="logo-title">Álbum de Figurinhas</ion-title>
          <ion-text class="logo-subtitle">Copa do Mundo</ion-text>
        </ion-card-header>

        <login-form />
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonText } from "@ionic/vue";
import LoginForm from "@/components/LoginForm.vue";
</script>

<style scoped>
.login-content {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 20px;
}

.logo {
  background: linear-gradient(135deg, #1abc9c 0%, #16a085 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.logo-icon {
  display: block;
  font-size: 64px;
  margin-bottom: 8px;
}

.logo-title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.logo-subtitle {
  display: block;
  font-size: 14px;
  opacity: 0.9;
}
</style>
