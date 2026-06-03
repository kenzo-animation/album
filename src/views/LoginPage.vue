<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login - Álbum de Figurinhas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="login-content">
      <div class="login-container">
        <div class="logo">
          <h1>🏆</h1>
          <h2>Álbum de Figurinhas</h2>
          <p>Copa do Mundo</p>
        </div>

        <login-form />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
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

.logo h1 {
  font-size: 64px;
  margin: 0;
}

.logo h2 {
  margin: 10px 0 5px 0;
  font-size: 24px;
  font-weight: bold;
}

.logo p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}
</style>
