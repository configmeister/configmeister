<template>
	<v-layout column class="cfg-layout" v-if="inited">
		<v-layout align-center>
			<div class="headline mb-6 mr-6">Configuration: {{$store.state.currentConfiguration.name}}</div>
			<v-select
					outlined
					dense
					label="Version"
					item-value="id"
					item-text="name"
					:items="$store.state.currentConfiguration.versions"
					v-model="selectedVersion"
					style="max-width: 200px;"
					class="mr-3"
			>
				<template v-slot:item="data">
					<v-list-item dense @click="data.on.click">
						<v-list-item-content>
							<v-list-item-title>
								{{data.item.name}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action @click.prevent.stop="editVersion(data)">
							<v-btn small icon>
								<v-icon small color="primary">mdi-pencil</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</template>
				<template v-slot:append-item>
					<v-list-item dense @click="createNewVersion">
						<v-list-item-content>
							<v-layout align-center justify-center>
								<v-icon small color="primary">mdi-plus</v-icon>
							</v-layout>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-select>
			<v-select
					dense
					outlined
					label="Branch"
					item-value="id"
					item-text="name"
					:items="versionBranches"
					v-model="currentBranch"
					style="max-width: 200px"
			>

				<template v-slot:item="data">
					<v-list-item dense @click="data.on.click">
						<v-list-item-content>
							<v-list-item-title>
								{{data.item.name}}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action @click.prevent.stop="editBranch(data)">
							<v-btn small icon>
								<v-icon small color="primary">mdi-pencil</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</template>
				<template v-slot:append-item>
					<v-list-item dense @click="createNewBranch">
						<v-list-item-content>
							<v-layout align-center justify-center>
								<v-icon small color="primary">mdi-plus</v-icon>
							</v-layout>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-select>
		</v-layout>
		<v-layout row justify-space-between fill-height>
			<v-card>

			</v-card>
			<v-card>

			</v-card>
		</v-layout>

		<v-dialog max-width="400px" v-model="addItemDialog">
			<div class="dialog-body white pa-3">

			</div>
		</v-dialog>

	</v-layout>
</template>

<script>
	import {actions, mutations} from '@/const';

	export default {
		name    : 'Configuration',
		data() {
			return {
				currentBranch    : null,
				addItemDialog    : false,
				addItemDialogData: {},
				inited           : false,
			};
		},
		computed: {
			selectedVersion: {
				get() {
					return this.$store.state.currentVersion;
				},
				set(value) {
					this.$store.commit(mutations.set_current_version, value);
				}
			},
			versionBranches() {
				return this.$store.state.currentConfiguration.versions.find(version => {
					return version.id === this.$store.state.currentVersion;
				}).branches;
			}
		},
		methods : {
			createNewVersion() {
				this.addItemDialogData = {
					type: 'version',
				};
				this.addItemDialog = true;
			},
			createNewBranch() {
				this.addItemDialogData = {
					type: 'branch',
				};
				this.addItemDialog = true;
			},
			editVersion(data) {

			},
			editBranch(data) {
			}
		},
		async mounted() {
			await this.loader.wrap(async () => {
				await this.$store.dispatch(actions.get_configuration, this.$route.params.id);
				this.currentBranch = this.versionBranches[0].id;
			});
			this.inited = true;
		},
	};
</script>

<style scoped>
	.cfg-layout {
		padding-left  : 24px;
		padding-right : 24px;
		padding-top   : 24px;
		width         : 100%;
	}
</style>
