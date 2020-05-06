<template>
	<v-app class="cfg-app">
		<v-navigation-drawer app color="primary" :mini-variant="!drawerOpened">
			<cfg-nav v-model="drawerOpened"></cfg-nav>
		</v-navigation-drawer>
		<v-content app>
			<v-container fluid fill-height>
				<router-view></router-view>
			</v-container>
		</v-content>

		<v-overlay :value="showLoader">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-app>
</template>

<script>
	import CfgNav from './components/CfgNav';
	import {actions} from './const';
	import loader from '@/plugins/loader';

	export default {
		name      : 'App',
		components: {CfgNav},
		data() {
			return {
				drawerOpened: true,
				showLoader  : false,
			};
		},
		async mounted() {
			loader.on('update', (value) => {
				this.showLoader = value;
			});
			await this.$store.dispatch(actions.init_configurations);
		}
	};
</script>

<style lang="scss">
	html, body {
	}

	.cfg-app {
		background-color : #edf0f2 !important;
	}

	.cfg-pointer {
		cursor : pointer;
	}

	.v-dialog {
		border-radius : 0 !important;
	}
</style>
