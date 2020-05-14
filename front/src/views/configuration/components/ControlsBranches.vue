<template>
	<v-layout column fill-height class="pa-2">
		<v-list dense>

			<v-list-item @click="() => {}">
				<v-list-item-content>
					<v-list-item-title>Rename current branch</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="() => {}">
				<v-list-item-content>
					<v-list-item-title>Create new branch</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="importJSONDialog = true">
				<v-list-item-content>
					<v-list-item-title>Import from JSON</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-list-item @click="() => {}">
				<v-list-item-content>
					<v-list-item-title class="error--text">Delete current branch</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>

		<v-dialog v-model="importJSONDialog" width="600">
			<v-card>
				<v-card-title>JSON</v-card-title>
				<v-card-text>
					<!--Add ace editor to edit json-->
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn depressed color="primary" @click="importFromJSON">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	import api from '@/utils/api';
	import {import_type} from '@/const';

	export default {
		name   : 'ControlsBranches',
		props  : {
			currentBranch: {},
		},
		data() {
			return {
				importJSONDialog: false,
				json            : ''
			};
		},
		methods: {
			async importFromJSON() {
				await api.importJSON(this.json, {
					type: import_type.branch,
					id  : this.currentBranch
				});
				this.importJSONDialog = false;
			}
		}
	};
</script>

<style scoped>

</style>
