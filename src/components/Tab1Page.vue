<!-- Tab1Page.vue - Página de abas (Tab 1)
     Exibe contatoList como parte da navegação por abas
-->
<template>
    <ion-page>
        <!-- Cabeçalho da página -->
        <ion-header>
            <ion-toolbar>
                <ion-title>Contatos</ion-title>
            </ion-toolbar>
        </ion-header>
        
        <!-- Conteúdo principal -->
        <ion-content :fullscreen="true">
            <!-- Cabeçalho com collapse -->
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Contatos</ion-title>
                </ion-toolbar>
            </ion-header>
            
            <!-- Lista de contatos -->
            <ContatoList/>
        </ion-content>
    </ion-page>
</template>
 
<script setup lang="ts">
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue'
import ContatoList from '@/components/ContatoList.vue'
</script>
