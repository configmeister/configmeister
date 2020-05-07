<template>
	<v-layout column fill-height class="pa-2">
		<template v-if="!currentSelection">
			<div class="caption text-sm-center mt-3">Please select something from the tree on the left.</div>
		</template>
		<template v-else>
			<v-list dense>
				<v-list-item v-for="(value, index) in options" :key="index" @click="value.click">
					<v-list-item-content>
						<v-list-item-title :class="`${value.customClass}`">{{value.text}}</v-list-item-title>
						<v-list-item-subtitle v-if="value.subText">{{value.subText}}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-layout class="mt-3" column>
				<template v-if="controlType === control_type.add_scalar">
					<v-text-field
							label="Key name"
							outlined
							dense
							v-model="controlValues[control_type.add_scalar].name"
					></v-text-field>
					<v-layout>
						<v-select
								style="max-width: 150px"
								class="mr-3"
								outlined
								dense
								label="Value type"
								v-model="controlValues[control_type.add_scalar].type"
								:items="controlValues[control_type.add_scalar].typeOptions"
						></v-select>
						<v-text-field
								outlined
								dense
								label="Value"
								v-model="controlValues[control_type.add_scalar].value"
						></v-text-field>
					</v-layout>
					<v-layout class="pl-4 pr-4" row>
						<v-btn depressed min-width="200" color="primary" @click="controllSubmit">Submit</v-btn>
						<v-spacer></v-spacer>
						<v-btn depressed min-width="200" color="error" @click="resetControls">Cancel</v-btn>
					</v-layout>
				</template>
			</v-layout>
		</template>
	</v-layout>
</template>

<script>
	import {graphRequest} from '@/utils/graph';
	import createNewScalar from '@/graphql/createNewScalar.graphql';

	const control_type = {
		add_scalar : 'add-scalar',
		add_complex: 'add-complex'
	};
	const scalar_types = {
		number : 'number',
		string : 'string',
		boolean: 'boolean',
	};

	export default {
		name    : 'ControlsValues',
		props   : {
			currentBranch   : {},
			currentSelection: {},
		},
		data() {
			return {
				control_type,
				controlType   : null,
				controllSubmit: () => {},
				controlValues : {
					[control_type.add_scalar]: {
						name       : '',
						type       : scalar_types.string,
						typeOptions: Object.values(scalar_types),
						value      : ''
					}
				}
			};
		},
		watch   : {
			currentSelection: {
				deep: true,
				handler() {
					if (this.currentSelection && this.currentSelection.itemType === 'scalar') {
						this.controlValues = {
							[control_type.add_scalar]: {
								name       : this.currentSelection.name,
								type       : this.currentSelection.type,
								value      : JSON.parse(this.currentSelection.value),
								typeOptions: Object.values(scalar_types),
							}
						};
						this.addScalar(true);
					}
				}
			}
		},
		computed: {
			options() {
				switch (this.currentSelection.itemType) {
					case 'root':
						return [{
							click  : this.addScalar,
							text   : '+ Add Scalar value',
							subText: `Path: ${this.itemPath}`
						}, {
							click  : this.addComplex,
							text   : '+ Add Complex value',
							subText: `Path: ${this.itemPath}`
						}];
					case 'scalar':
						return [{
							click      : this.destroyScalar,
							text       : 'Remove this value',
							customClass: 'error--text'
						}];
				}
			},
			itemPath() {
				return 'backend';
			}
		},
		methods : {
			resetControls() {
				this.controlType = null;
				this.controllSubmit = () => {};
			},
			addScalar(withId = false) {
				this.controlType = control_type.add_scalar;
				this.controllSubmit = async () => {
					let value = '';
					switch (this.controlValues[control_type.add_scalar].type) {
						case scalar_types.number:
							value = JSON.stringify(parseFloat(this.controlValues[control_type.add_scalar].value));
							break;
						case scalar_types.string:
							value = JSON.stringify(this.controlValues[control_type.add_scalar].value);
							break;
						case scalar_types.boolean:
							value = JSON.stringify(this.controlValues[control_type.add_scalar].value === 'true');
					}

					const res = await graphRequest(createNewScalar, {
						...(withId === true ? {id: this.currentSelection.id} : {}),
						name: this.controlValues[control_type.add_scalar].name,
						type: this.controlValues[control_type.add_scalar].type,
						value,
						...(withId !== true ? {sourceId: this.currentSelection.id} : {})
					});
					this.$emit('change', res.cfgScalar);
				};
			},
			addComplex() {

			},
			destroyScalar() {

			}
		}
	};
</script>

<style scoped>

</style>
