<template>
   <ion-list>
    <template v-if="contatos.length">
        <ion-item-sliding v-for="contato in contatos" :key="contato.id">
            <ion-item>
                <ion-label>
                    <ion-text class="contact-name">{{ contato.nome }}</ion-text>
                    <ion-text class="contact-info">{{ contato.email }}</ion-text>
                    <ion-text class="contact-info">{{ contato.telefone }}</ion-text>
                </ion-label>
            </ion-item>
            <ion-item-options side="end">
                <ion-item-option color="primary" @click="editarContato(contato)">
                    Editar
                </ion-item-option>
                <ion-item-option color="danger" @click="confirmarExclusao(contato)">
                    Excluir
                </ion-item-option>
            </ion-item-options>
        </ion-item-sliding>
 
    </template>
 
    <ion-item v-else>
        <Ion-label>Nenhum contato encontrado.</Ion-label>
    </ion-item>
 
   </ion-list>
 
   <ion-alert
        :is-open="editAlert.open"
        header="Editar Contato"
        :message="editAlert.error"
        :inputs="editInputs"
        :buttons="[
            { text: 'Cancelar', role: 'cancel', handler: closeEditAlert },
            { text: 'Salvar', handler: salvarEdicao }
        ]"
    />
 
    <ion-alert
        :is-open="deleteAlert.open"
        header="Excluir Contato"
        message="Tem certeza que deseja excluir este contato?"
        :buttons="[
            { text: 'Cancelar', role: 'cancel', handler: closeDeleteAlert },
            { text: 'Excluir', handler: excluirContato }
        ]"
    />
    </template>
 
 
    <script setup lang ="ts">
    import {ref, onMounted, onBeforeUnmount, computed} from 'vue'
    import {IonAlert, IonItem, IonItemOption, IonItemSliding, IonLabel, IonList, IonText} from '@ionic/vue'
    import {listContatos, updateContato, deleteContatoById} from '@/service/database'
 
const contatos = ref<any[]>([])
const editAlert = ref({open: false, error:'', data: {id: null as number | null, nome: '', email: '', telefone: ''}})
const deleteAlert = ref({open: false, contatoId: null as number | null})
 
const editInputs = computed(() => [
    {name: 'Nome', value: editAlert.value.data.nome, type: 'text', placeholder: 'Nome'},
    {name: 'Email', value: editAlert.value.data.email, type: 'email', placeholder: 'Email'},
    {name: 'Telefone', value: editAlert.value.data.telefone, type: 'tel', placeholder: 'Telefone'}
])
 
async function load(){
    contatos.value = await listContatos()
}
 
function handleContatoSalvo(){
    load()
}
function editarContato(contato: any){
    editAlert.value = {
        open: true,
        error: '',
        data: {
            id: contato.id,
            nome: contato.nome,
            email: contato.email,
            telefone: contato.telefone
        }
    }
}
 
function confirmarExclusao(contato: any){
    deleteAlert.value = {
        open: true,
        contatoId: contato.id
    }
}
 
function closeEditAlert(){
    editAlert.value.open = false
    editAlert.value.error = ''
}
 
function closeDeleteAlert(){
    deleteAlert.value.open = false
}
 
async function salvarEdicao(values: any){
    if (!editAlert.value.data.id){
        return
    }
 
 
const nome = values?.nome ?? editAlert.value.data.nome
const email = values?.email ?? editAlert.value.data.email
const telefone = values?.telefone ?? editAlert.value.data.telefone
 
if(!nome || !email){
    editAlert.value.error = 'Nome e Email são obrigatórios.'
    return false
}
 
editAlert.value.error = ''
await updateContato(editAlert.value.data.id, nome, email, telefone)
closeEditAlert()
 load()
 return true
}
 
async function excluirContato(){
    if(!deleteAlert.value.contatoId){
        return
    }
 
    await deleteContatoById(deleteAlert.value.contatoId)
    closeDeleteAlert()
    load()
}
 
onMounted(() => {
    load()
    window.addEventListener('contato-salvo', handleContatoSalvo)
 
})
 
onBeforeUnmount(() => {
    window.removeEventListener('contato-salvo', handleContatoSalvo)
})
 
</script>