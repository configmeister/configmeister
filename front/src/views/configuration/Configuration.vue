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
			</v-select>
		</v-layout>
		<v-layout row justify-space-between fill-height>
			<v-card class="overview-body">
				<overview-tree-view :currentBranch="currentBranch" v-model="currentSelection" :updater="updater"></overview-tree-view>
			</v-card>
			<v-card width="540">
				<v-tabs dense centered>
					<v-tab>Values</v-tab>
					<v-tab>Versions</v-tab>
					<v-tab>Branches</v-tab>
					<v-tab>Export</v-tab>

					<v-tab-item>
						<v-divider></v-divider>
						<controls-values :current-branch="currentBranch" :current-selection="currentSelection" @change="onChangeValue"></controls-values>
					</v-tab-item>

					<v-tab-item>
						<v-divider></v-divider>
						<controls-version></controls-version>
					</v-tab-item>

					<v-tab-item>
						<v-divider></v-divider>
						<controls-branches :current-branch="currentBranch"></controls-branches>
					</v-tab-item>

				</v-tabs>
			</v-card>
		</v-layout>

	</v-layout>
</template>

<script>
	import {actions, mutations} from '@/const';
	import Events from 'events';
	import ControlsVersion from '@/views/configuration/components/ControlsVersion';
	import ControlsBranches from '@/views/configuration/components/ControlsBranches';
	import ControlsValues from '@/views/configuration/components/ControlsValues';
	import OverviewTreeView from '@/views/configuration/components/OverviewTreeView';

	export default {
		name      : 'Configuration',
		components: {OverviewTreeView, ControlsValues, ControlsBranches, ControlsVersion},
		data() {
			return {
				currentBranch    : null,
				addItemDialog    : false,
				addItemDialogData: {},
				inited           : false,
				currentSelection : null,
				updater          : null,
			};
		},
		computed  : {
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
			},
		},
		methods   : {
			onChangeValue(val) {
				this.updater.emit('change-value', val);
			}
		},
		async mounted() {
			await this.loader.wrap(async () => {
				await this.$store.dispatch(actions.get_configuration, this.$route.params.id);
				this.currentBranch = this.versionBranches[0].id;
				this.updater = new Events();
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

	.overview-body {
		width : calc(100% - 556px);
	}
</style>
