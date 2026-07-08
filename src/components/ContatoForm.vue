<template>
<ion-list>
  <ion-item>
    <ion-label position="stacked">Nome</ion-label>
    <ion-input v-model="form.nome" :class="{ 'error': errors.nome }"></ion-input>
  </ion-item>
  <ion-text v-if="errors.nome" color="danger" class="error-message">{{ errors.nome }}</ion-text>

  <ion-item>
    <ion-label position="stacked">Email</ion-label>
    <ion-input v-model="form.email" :class="{ 'error': errors.email }"></ion-input>
  </ion-item>
  <ion-text v-if="errors.email" color="danger" class="error-message">{{ errors.email }}</ion-text>

  <ion-item>
    <ion-label position="stacked">Telefone</ion-label>
    <ion-input v-model="form.telefone"></ion-input>
  </ion-item>

  <ion-button expand="full" @click="salvarContato">Salvar Contato</ion-button>

  <ion-toast
    :is-open="toast.show"
    :message="toast.message"
    duration="2000"
    @did-dismiss="toast.show = false"
  ></ion-toast>
</ion-list>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { addContato } from '@/service/database';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/vue';

const form = reactive({
  nome: '',
  email: '',
  telefone: ''
});

const toast = reactive({
  show: false,
  message: ''
});

const errors = reactive({
  nome: '',
  email: '',
});

function clearErrors() {
  errors.nome = '';
  errors.email = '';
}
async function salvarContato() {
  clearErrors();
  if (!form.nome) {
    errors.nome = 'O nome é obrigatório.';
    return;
  }
  if (!form.email) {
    errors.email = 'O email é obrigatório.';
    return;
  }
  try {
    await addContato(form.nome, form.email, form.telefone);
    toast.message = 'Contato salvo com sucesso!';
    toast.show = true;
    form.nome = '';
    form.email = '';
    form.telefone = '';
  } catch (error) {
    toast.message = 'Erro ao salvar contato.';
    toast.show = true;
  }
}
</script>