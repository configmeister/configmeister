<template>
	<v-layout class="cfg-layout" column align-center>
		<template v-if="!$store.state.hasAnyConfigurations">
			<v-layout column justify-center align-center>
				<v-card color="#EDF0F2">
					<v-card-title>Oops...</v-card-title>
					<v-card-subtitle>You have no configurations yet</v-card-subtitle>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" text to="/configuration/new">Create One?</v-btn>
						<v-spacer></v-spacer>
					</v-card-actions>
				</v-card>
			</v-layout>
		</template>
		<template v-else>
			<cfg-recent-configurations></cfg-recent-configurations>
			<cfg-configurations-list></cfg-configurations-list>
		</template>
	</v-layout>
</template>

<script>
	import CfgRecentConfigurations from '@/components/CfgRecentConfigurations';
	import CfgConfigurationsList from '@/components/cfg-configurations-list/CfgConfigurationsList';

	export default {
		name      : 'Main',
		components: {CfgConfigurationsList, CfgRecentConfigurations}
	};
</script>

<style lang="scss" scoped>
	.cfg-layout {
		width         : 100%;
		padding-left  : 24px;
		padding-right : 24px;
	}
</style>
