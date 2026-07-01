<template>
  <form @submit.prevent="handleLogin">
    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input
        v-model="email"
        type="email"
        required
        @blur="validateEmail"
      ></ion-input>
    </ion-item>
    <div v-if="emailError" class="error-message">
      {{ emailError }}
    </div>

    <ion-item>
      <ion-label position="floating">Senha</ion-label>
      <ion-input
        v-model="senha"
        type="password"
        required
        @blur="validatePassword"
      ></ion-input>
    </ion-item>
    <div v-if="senhaError" class="error-message">
      {{ senhaError }}
    </div>

    <ion-button
      expand="block"
      color="primary"
      type="submit"
      class="ion-margin-top"
    >
      Entrar
    </ion-button>

    <div class="links">
      <router-link to="/reset-password">Esqueci minha senha</router-link>
      <span class="separator">|</span>
      <router-link to="/register">Criar conta</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonItem, IonLabel, IonInput, IonButton, toastController } from "@ionic/vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");
const emailError = ref("");
const senhaError = ref("");

const { login } = useAuth();
const router = useRouter();

const validateEmail = () => {
  if (!email.value) {
    emailError.value = "E-mail é obrigatório";
  } else if (!isValidEmail(email.value)) {
    emailError.value = "E-mail inválido";
  } else {
    emailError.value = "";
  }
};

const validatePassword = () => {
  if (!senha.value) {
    senhaError.value = "Senha é obrigatória";
  } else {
    senhaError.value = "";
  }
};

const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleLogin = async () => {
  validateEmail();
  validatePassword();

  if (emailError.value || senhaError.value) {
    return;
  }

  const result = await login(email.value, senha.value);

  if (result.success) {
    const toast = await toastController.create({
      message: result.message,
      duration: 2000,
      position: "bottom",
      color: "success",
    });
    await toast.present();
    router.push("/home");
  } else {
    const toast = await toastController.create({
      message: result.message,
      duration: 2000,
      position: "bottom",
      color: "danger",
    });
    await toast.present();
  }
};
</script>

<style scoped>
form {
  padding: 20px;
}

ion-item {
  margin-bottom: 15px;
  border-radius: 8px;
}

.error-message {
  color: #f04141;
  font-size: 12px;
  padding: 5px 15px;
  margin-bottom: 10px;
}

.links {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.links a {
  color: #1abc9c;
  text-decoration: none;
  margin: 0 5px;
}

.links a:hover {
  text-decoration: underline;
}

.separator {
  color: #999;
}
</style>
