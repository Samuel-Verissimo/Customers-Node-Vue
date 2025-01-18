<template>
  <v-container class="d-flex justify-center">
    <v-card width="90%" class="pa-4">

      <!-- Título + Botão Novo -->
      <v-row class="mb-3">
        <v-col>
          <h2 class="text-h5">Gerenciar Clientes</h2>
        </v-col>
        <v-col class="text-right" cols="auto">
          <v-btn color="dark" dark @click="openForm">
            Novo Cliente
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Seção de Filtros -->
      <v-row class="mb-3">
        <v-col cols="12" md="3">
          <v-text-field
            v-model="filters.Codigo"
            label="Código"
            type="number"
            @keyup.enter="fetchClients"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="filters.Nome"
            label="Nome"
            @keyup.enter="fetchClients"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="filters.CEP"
            label="CEP"
            @keyup.enter="fetchClients"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="filters.Cidade"
            label="Cidade"
            @keyup.enter="fetchClients"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" class="text-right">
          <v-btn outlined color="primary" @click="fetchClients">
            Pesquisar
            <v-icon right>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Tabela com vue-good-table-next -->
      <vue-good-table
        :columns="columns"
        :rows="clients"
        :search-options="{ enabled: false }"
        :pagination-options="{ enabled: true, mode: 'records', perPage: 5 }"
        class="mt-4"
      >
        <template #table-row="{ column, row }">
          <span v-if="column.field === 'actions'">
            <v-btn outlined small color="light" @click="openForm(row)">
              <v-icon left>mdi-pencil</v-icon>
            </v-btn>
            <v-btn outlined small color="error" @click="deleteClient(row.ID)">
              <v-icon left>mdi-delete</v-icon>
            </v-btn>
          </span>
          <span v-else>
            {{ row[column.field] }}
          </span>
        </template>
      </vue-good-table>
    </v-card>

    <!-- Modal do Formulário de Cadastro/Edição -->
    <v-dialog v-model="formDialog" width="60%">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ editingClient.ID ? 'Editar Cliente' : 'Novo Cliente' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="clientForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Codigo"
                  outlined
                  dense
                  :rules="[rules.required]"
                >
                  <template #label>
                    Código <span class="required">*</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Nome"
                  outlined
                  dense
                  :rules="[rules.required]"
                >
                  <template #label>
                    Nome <span class="required">*</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.CPF_CNPJ"
                  outlined
                  dense
                  :rules="[rules.required]"
                >
                  <template #label>
                    CPF/CNPJ <span class="required">*</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.CEP"
                  outlined
                  dense
                  :rules="[rules.required]"
                  @blur="onCepBlur"
                >
                  <template #label>
                    CEP <span class="required">*</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Logradouro"
                  label="Logradouro"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Endereco"
                  label="Endereço"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingClient.Numero"
                  label="Número"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingClient.Bairro"
                  label="Bairro"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingClient.Cidade"
                  label="Cidade"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="editingClient.UF"
                  label="UF"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="editingClient.Complemento"
                  label="Complemento"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Fone"
                  label="Telefone"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.LimiteCredito"
                  label="Limite de Crédito"
                  type="number"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editingClient.Validade"
                  outlined
                  dense
                  type="date"
                  :rules="[rules.required]"
                >
                  <template #label>
                    Validade <span class="required">*</span>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closeForm">
            Cancelar
            <v-icon right>mdi-cancel</v-icon>
          </v-btn>
          <v-btn color="dark" text @click="validateAndSaveClient">
            Salvar
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/**
 * Certifique-se que instalou:
 * npm install vue-good-table-next
*/
import clientService from '@/api/clientService';
import { VueGoodTable } from 'vue-good-table-next';
import { useToast } from 'vue-toastification';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default {
  name: 'ClientsCrud',
  components: {
    'vue-good-table': VueGoodTable,
  },
  data() {
    return {
      toast: null,
      clients: [],
      formDialog: false,
      editingClient: {
        Codigo: '',
        Nome: '',
        CPF_CNPJ: '',
        CEP: '',
        Logradouro: '',
        Endereco: '',
        Numero: '',
        Bairro: '',
        Cidade: '',
        UF: '',
        Complemento: '',
        Fone: '',
        LimiteCredito: '',
        Validade: '',
      },
      filters: {
        Codigo: '',
        Nome: '',
        CEP: '',
        Cidade: '',
      },
      rules: {
        required: (value) => !!value || 'Este campo é obrigatório.',
      },
      columns: [
        { label: 'ID', field: 'ID', type: 'number', sortable: true },
        { label: 'Código', field: 'Codigo', sortable: true },
        { label: 'Nome', field: 'Nome', sortable: true },
        { label: 'Cidade', field: 'Cidade', sortable: true },
        { label: 'CEP', field: 'CEP', sortable: true },
        { label: 'Ações', field: 'actions', sortable: false, headerClass: 'col-actions', fieldClass: 'col-actions' },
      ],
    };
  },
  mounted() {
    this.toast = useToast();
    this.fetchClients();
  },
  methods: {

    async fetchClients() {
      try {
        const params = { ...this.filters };
        Object.keys(params).forEach((key) => {
          if (!params[key]) delete params[key];
        });
        const data = await clientService.getAll(params);
        this.clients = data;
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao buscar clientes!');
      }
    },

    openForm(client = {}) {
      this.editingClient = {
        ...client,
        Validade: client.Validade
          ? new Date(client.Validade).toISOString().split('T')[0]
          : '', 
      };
      this.formDialog = true;
    },

    closeForm() {
      this.formDialog = false;
      this.editingClient = {};
    },

    validateAndSaveClient() {
      const requiredFields = ['Codigo', 'Nome', 'CPF_CNPJ', 'CEP', 'Validade'];
      const invalidFields = requiredFields.filter((field) => !this.editingClient[field]);

      if (invalidFields.length > 0) {
        this.toast.error('Preencha todos os campos obrigatórios.');
        return;
      }

      this.saveClient();
    },

    async saveClient() {
      try {
        const payload = {
          ...this.editingClient,
          Validade: this.editingClient.Validade
            ? new Date(this.editingClient.Validade).toISOString().split('T')[0]
            : null, 
        };

        if (this.editingClient.ID) {
          await clientService.update(this.editingClient.ID, payload);
          this.toast.success('Cliente atualizado com sucesso!');
        } else {
          await clientService.create(payload);
          this.toast.success('Cliente criado com sucesso!');
        }
        this.closeForm();
        this.fetchClients();
      } catch (error) {
        console.error(error);
        this.toast.error('Ocorreu um erro ao salvar o cliente.');
      }
    },

    async deleteClient(id) {
      if (!confirm('Deseja excluir este cliente?')) return;
      try {
        await clientService.delete(id);
        this.toast.success('Cliente removido!');
        this.fetchClients();
      } catch (error) {
        console.error(error);
        this.toast.error('Erro ao remover cliente.');
      }
    },

    async onCepBlur() {
      const cep = this.editingClient.CEP?.replace(/\D/g, '');
      if (!cep || cep.length !== 8) {
        this.toast.error('CEP inválido!');
        return;
      }
      try {
        const response = await clientService.searchCEP(cep);
        if (response && !response.erro) {
          this.editingClient.Logradouro = response.logradouro || '';
          this.editingClient.Bairro = response.bairro || '';
          this.editingClient.Cidade = response.localidade || '';
          this.editingClient.UF = response.uf || '';
          this.toast.success('Endereço preenchido com sucesso!');
        } else {
          this.toast.error('CEP não encontrado!');
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        this.toast.error('Erro ao buscar o CEP!');
      }
    },

  },
};
</script>

<style scoped>
  .required {
    color: red;
    font-size: 1em;
    font-weight: bold;
  }
  .col-actions {
    text-align: center;
    width: 100px;
  }
</style>
