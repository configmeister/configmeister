<template>
	<v-layout column class="configuration-list" align-start justify-start>
		<v-text-field class="mb-3 configuration-list-search" outlined dense label="Search by name" append-icon="mdi-search" v-model="search" @input="onChange"></v-text-field>
		<v-layout class="configuration-list" row wrap>
			<cfg-configurations-list-item v-for="item in $store.state.configurations" :key="item.id" :data="item"></cfg-configurations-list-item>
		</v-layout>
	</v-layout>
</template>

<script>
	import CfgConfigurationsListItem from '@/components/cfg-configurations-list/CfgConfigurationsListItem';
	import {actions} from '@/const';

	export default {
		name      : 'CfgConfigurationsList',
		components: {CfgConfigurationsListItem},
		data() {
			return {
				search    : '',
				inputTimer: null
			};
		},
		methods   : {
			onChange() {
				clearTimeout(this.inputTimer);
				this.inputTimer = setTimeout(() => {
					this.loader.wrap(async () => {
						await this.$store.dispatch(actions.get_configurations, {
							name: this.search
						});
					});
				}, 300);
			}
		}
	};
</script>

<style scoped>
	.configuration-list {
		width : 100%;
	}

	.configuration-list-search {
		max-height : 48px;
		width      : 300px;
	}
</style>
