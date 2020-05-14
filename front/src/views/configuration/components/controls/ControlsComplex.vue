<template>
	<v-layout column>
		<v-text-field
				label="Key name"
				outlined
				dense
				v-model="name"
				:error-messages="errorName"
		></v-text-field>
		<v-select
				outlined
				dense
				label="Value type"
				v-model="type"
				:items="typeOptions"
		></v-select>
		<v-btn depressed color="primary" :disabled="loading" :loading="loading" @click="submit">{{buttonText}}</v-btn>
	</v-layout>
</template>

<script>
	import {COMPLEX_TYPE} from '@/../../back/src/datatypes';
	import api from '@/utils/api';

	export default {
		name    : 'ControlComplex',
		props   : {
			data: {
				type: Object
			},
		},
		data() {
			return {
				name       : '',
				type       : COMPLEX_TYPE.OBJECT,
				typeOptions: Object.values(COMPLEX_TYPE),
				loading    : false,
				errorName  : [],
			};
		},
		methods : {
			validate() {
				if (this.name.length === 0) {
					this.errorName = ['Provide a name.'];
				} else if (this.name.match(/[^\w_$]/)) {
					this.errorName = ['Name must not contain only letters, numbers, "_" and "$" characters.'];
				}

				return !this.errorName.length;

			},
			async submit() {
				this.loading = true;

				const isValid = this.validate();
				if (!isValid) {
					this.loading = false;
					return;
				}
				const res = await api.upsertComplex({
					...(this.data.id ? {id: this.data.id} : {}),
					name    : this.name,
					type    : this.type,
					sourceId: this.data.sourceId
				});
				console.log(res);
				this.$emit('update');

				this.loading = false;
			},
		},
		computed: {
			buttonText() {
				if (this.data.id) return 'Update';
				return 'Add';
			}
		},
		watch   : {
			name() {
				this.errorName = [];
			},
			data: {
				deep     : true,
				immediate: true,
				handler(val) {
					if (val.name) this.name = val.name;
					if (val.type) this.type = val.type;
				}
			}
		}
	};
</script>

<style scoped>

</style>
