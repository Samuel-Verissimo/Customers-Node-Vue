<template>
    <v-app>
        <v-app-bar app color="dark">
            <v-toolbar-title>Sistema de Clientes</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <ClientsCrud />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import ClientsCrud from './components/ClientsCrud.vue';
    export default {
        name: 'App',
        components: {
            ClientsCrud
        }
    }
</script>
