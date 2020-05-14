<template>
	<v-layout column>
		<v-text-field
				label="Key name"
				outlined
				dense
				v-model="name"
				:error-messages="errorName"
		></v-text-field>
		<v-layout>
			<v-select
					style="max-width: 150px"
					class="mr-3"
					outlined
					dense
					label="Value type"
					v-model="type"
					:items="typeOptions"
			></v-select>
			<v-text-field
					outlined
					dense
					label="Value"
					v-model="value"
					:error-messages="errorValue"
			></v-text-field>
		</v-layout>
		<v-btn depressed color="primary" :disabled="loading" :loading="loading" @click="submit">{{buttonText}}</v-btn>
	</v-layout>
</template>

<script>
	import {SCALAR_TYPE} from '@/../../back/src/datatypes';
	import api from '@/utils/api';

	export default {
		name    : 'ControlScalar',
		props   : {
			data: {
				type: Object
			},
		},
		data() {
			return {
				name       : '',
				type       : SCALAR_TYPE.STRING,
				typeOptions: Object.values(SCALAR_TYPE),
				value      : '',
				loading    : false,
				errorName  : [],
				errorValue : []
			};
		},
		methods : {
			validate() {
				if (this.name.length === 0) {
					this.errorName = ['Provide a name.'];
				} else if (this.name.match(/[^\w_$]/)) {
					this.errorName = ['Name must not contain only letters, numbers, "_" and "$" characters.'];
				}

				if (this.type === SCALAR_TYPE.NUMBER) {
					try {
						let x = parseFloat(this.value);
						if (typeof x !== 'number' || Number.isNaN(x)) {
							this.errorValue = ['Value must be a valid number (float or integer)'];
						}
					} catch (e) {
						this.errorValue = ['Value must be a valid number (float or integer)'];
					}
				} else if (this.type === SCALAR_TYPE.BOOLEAN) {
					if (this.value !== 'true' && this.value !== 'false') {
						this.errorValue = ['Value must be either "true" or "false"'];
					}
				}
				return !(this.errorName.length || this.errorValue.length);

			},
			async submit() {
				this.loading = true;

				const isValid = this.validate();
				if (!isValid) {
					this.loading = false;
					return;
				}

				let value = '';
				switch (this.type) {
					case SCALAR_TYPE.NUMBER:
						value = JSON.stringify(parseFloat(this.value));
						break;
					case SCALAR_TYPE.STRING:
						value = JSON.stringify(this.value);
						break;
					case SCALAR_TYPE.BOOLEAN:
						value = JSON.stringify(this.value === 'true');
				}

				const res = await api.upsertScalar({
					...(this.data.id ? {id: this.data.id} : {}),
					type    : this.type,
					value,
					name    : this.name,
					sourceId: this.data.sourceId
				});
				if (!res) return;

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
			value() {
				this.errorValue = [];
			},
			data: {
				deep     : true,
				immediate: true,
				handler(val) {
					if (val.name) this.name = val.name;
					if (val.type) this.type = val.type;
					if (val.value) this.value = JSON.parse(val.value);
				}
			}
		}
	};
</script>

<style scoped>

</style>
