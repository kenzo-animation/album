<template>
  <form @submit.prevent="handleResetPassword">
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

    <ion-button
      expand="block"
      color="primary"
      type="submit"
      class="ion-margin-top"
    >
      Enviar E-mail de Recuperação
    </ion-button>

    <div class="links">
      <router-link to="/login">Voltar ao login</router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonItem, IonLabel, IonInput, IonButton, alertController } from "@ionic/vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const email = ref("");
const emailError = ref("");

const { resetPassword } = useAuth();
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

const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleResetPassword = async () => {
  validateEmail();

  if (emailError.value) {
    return;
  }

  const result = await resetPassword(email.value);

  if (result.success) {
    const alert = await alertController.create({
      header: "Sucesso!",
      message: result.message,
      buttons: [
        {
          text: "OK",
          handler: () => {
            router.push("/login");
          },
        },
      ],
    });
    await alert.present();
  } else {
    const alert = await alertController.create({
      header: "Erro",
      message: result.message,
      buttons: ["OK"],
    });
    await alert.present();
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
