<template>
    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input v-model="email" type="email" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Senha</ion-label>
      <ion-input v-model="senha" type="password" required></ion-input>
    </ion-item>

    <ion-button expand="block" color="primary" type="submit" class="ion-margin-top">
      Entrar
    </ion-button>

    <ion-card class="links">
      <router-link to="/reset-password">Esqueci minha senha</router-link>
      <span class="separator">|</span>
      <router-link to="/register">Criar conta</router-link>
    </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonItem, IonLabel, IonInput, IonButton, IonCard } from "@ionic/vue";
// import { useAuth } from "@/composables/useAuth";
// import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");

// const { login } = useAuth();
// const router = useRouter();

// const handleLogin = async () => {
//   if (!email.value || !senha.value) {
//     return;
//   }

//   const result = await login(email.value, senha.value);

//   if (result.success) {
//     const toast = await toastController.create({
//       message: result.message,
//       duration: 2000,
//       position: "bottom",
//       color: "success",
//     });
//     await toast.present();
//     router.push("/home");
//   } else {
//     const toast = await toastController.create({
//       message: result.message,
//       duration: 2000,
//       position: "bottom",
//       color: "danger",
//     });
//     await toast.present();
//   }
// };
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

ion-item {
  border-radius: 8px;
}

.links {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
}

.links a {
  color: #1abc9c;
  text-decoration: none;
}

.separator {
  margin: 0 8px;
  color: #999;
}
</style>
