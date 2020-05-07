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
				<component :is="controlsComponent" :data="controlsComponentData" @update="$emit('change')"></component>
			</v-layout>
		</template>
	</v-layout>
</template>

<script>
	import ControlScalar from '@/views/configuration/components/controls/ControlScalar';
	import {graphRequest} from '@/utils/graph';
	import removeScalar from '@/graphql/removeScalar.graphql';

	const control_type = {
		scalar: 'scalar',
	};

	const control_components = {
		[control_type.scalar]: ControlScalar
	};

	export default {
		name   : 'ControlsValues',
		props  : {
			currentBranch   : {},
			currentSelection: {},
		},
		data() {
			return {
				options              : [],
				controlsComponentData: {},
				controlsComponent    : null
			};
		},
		watch  : {
			currentSelection: {
				deep     : true,
				immediate: true,
				handler(value) {
					if (!value) return;
					switch (value.itemType) {
						case 'root':
							this.controlsComponent = null;
							this.options = [{
								click: () => {
									this.controlsComponentData = {
										sourceId: this.currentBranch,
									};
									this.controlsComponent = control_components[control_type.scalar];
								},
								text : '+ Add Scalar value',
							}, {
								click: () => {},
								text : '+ Add Complex value',
							}];
							break;
						case 'scalar':
							this.options = [{
								click      : () => {
									this.removeScalarValue();
								},
								text       : 'Delete this value',
								customClass: 'error--text'
							}];
							this.controlsComponentData = value;
							this.controlsComponent = control_components[control_type.scalar];
					}
				}
			}
		},
		methods: {
			async removeScalarValue() {
				await graphRequest(removeScalar, {
					id: this.currentSelection.id,
				});
				this.$emit('change');
			}
		}
	};
</script>

<style scoped>

</style>
