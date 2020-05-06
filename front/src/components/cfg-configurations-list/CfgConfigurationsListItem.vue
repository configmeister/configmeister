<template>
	<v-card :width="300" class="ma-3">
		<v-card-title>
			<v-layout align-baseline>
				<span class="mr-3">{{data.name}}</span>
				<v-dialog max-width="400px" v-model="renameDialog">
					<template v-slot:activator="{on}">
						<span class="text--secondary caption cfg-pointer" v-on="on">Change name</span>
					</template>
					<div class="dialog-body white pa-3">
						<div class="title mb-3">Change configuration name</div>
						<v-text-field class="mb-2" dense outlined label="New name" @keypress="onEnterSubmit" @input="errors = []" :error-messages="errors"
						              v-model="newConfigurationName"></v-text-field>
						<div class="dialog-body__actions">
							<v-btn color="primary" depressed :width="120" @click="changeName">Submit</v-btn>
							<v-btn color="error" depressed :width="120" @click="renameDialog = false">Cancel</v-btn>
						</div>
					</div>
				</v-dialog>
			</v-layout>
		</v-card-title>
		<v-card-subtitle>Last edited: {{lastEdited}}</v-card-subtitle>
		<v-divider></v-divider>
		<v-card-actions>
			<v-btn depressed :width="120" color="primary" :to="configurationLink">Edit</v-btn>
			<v-spacer></v-spacer>
			<v-btn depressed :width="120" color="error">Delete</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import moment from 'moment';
	import {graphRequest} from '@/utils/graph';
	import renameConfiguration from '@/graphql/renameConfiguration.graphql';
	import {actions, mutations} from '@/const';

	export default {
		name    : 'CfgConfigurationsListItem',
		props   : {
			/**
			 * @type {{
			 *     id: string
			 *     name: string
			 *     updatedAt: number,
			 *     versions: [{
			 *         id: string
			 *         name: string
			 *     }]
			 * }}
			 */
			data: Object
		},
		computed: {
			configurationLink() {
				return {
					path: `/configuration/${this.data.id}`
				};
			},
			lastEdited() {
				return moment(this.data.updatedAt).from(moment());
			},
		},
		data() {
			return {
				newConfigurationName: '',
				renameDialog        : false,
				errors              : [],
			};
		},
		methods : {
			onEnterSubmit(e) {
				if (e.key === 'Enter') {
					this.changeName();
				}
			},
			async changeName() {
				if (!this.newConfigurationName) {
					this.errors = ['Please provide a name'];
					return;
				}
				await this.loader.wrap(async () => {
					const result = await graphRequest(renameConfiguration, {
						id  : this.data.id,
						name: this.newConfigurationName
					});
					console.log(result);
					await this.$store.commit(mutations.set_configuration_from_all, result.cfgConfiguration);
					this.newConfigurationName = '';
					this.renameDialog = false;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.v-card {
		height : 140px;
	}

	.dialog-body {
		width          : 100%;
		height         : 100%;
		display        : flex;
		flex-direction : column;

		.dialog-body__actions {
			width           : 100%;
			display         : flex;
			align-items     : center;
			justify-content : space-between;
		}
	}

</style>
