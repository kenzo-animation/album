<template>
  <form @submit.prevent="handleRegister">
    <ion-item>
      <ion-label position="floating">Nome Completo</ion-label>
      <ion-input
        v-model="nome"
        type="text"
        required
        @blur="validateNome"
      ></ion-input>
    </ion-item>
    <ion-text v-if="nomeError" color="danger" class="error-message">
      {{ nomeError }}
    </ion-text>

    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input
        v-model="email"
        type="email"
        required
        @blur="validateEmail"
      ></ion-input>
    </ion-item>
    <ion-text v-if="emailError" color="danger" class="error-message">
      {{ emailError }}
    </ion-text>

    <ion-item>
      <ion-label position="floating">Senha</ion-label>
      <ion-input
        v-model="senha"
        type="password"
        required
        @blur="validatePassword"
      ></ion-input>
    </ion-item>
    <ion-text v-if="senhaError" color="danger" class="error-message">
      {{ senhaError }}
    </ion-text>

    <ion-button
      expand="block"
      color="primary"
      type="submit"
      class="ion-margin-top"
    >
      Criar Conta
    </ion-button>

    <ion-text class="links">
      <router-link to="/login">Voltar ao login</router-link>
    </ion-text>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonItem, IonLabel, IonInput, IonButton, IonText, toastController } from "@ionic/vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const nome = ref("");
const email = ref("");
const senha = ref("");
const nomeError = ref("");
const emailError = ref("");
const senhaError = ref("");

const { register } = useAuth();
const router = useRouter();

const validateNome = () => {
  if (!nome.value) {
    nomeError.value = "Nome é obrigatório";
  } else if (nome.value.length < 3) {
    nomeError.value = "Nome deve ter no mínimo 3 caracteres";
  } else {
    nomeError.value = "";
  }
};

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
  } else if (senha.value.length < 6) {
    senhaError.value = "Senha deve ter no mínimo 6 caracteres";
  } else {
    senhaError.value = "";
  }
};

const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleRegister = async () => {
  validateNome();
  validateEmail();
  validatePassword();

  if (nomeError.value || emailError.value || senhaError.value) {
    return;
  }

  const result = await register(nome.value, email.value, senha.value);

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
}

.links a:hover {
  text-decoration: underline;
}
</style>
