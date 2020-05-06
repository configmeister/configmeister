<template>
	<v-list dense nav dark class="py-0">
		<v-list-item two-line :class="'px-0'">
			<v-list-item-avatar>
				<div v-if="value" class="cfg-user-avatar tertiary">{{$store.state.user.username[0].toUpperCase()}}</div>
				<v-btn v-else icon @click="toggleDrawer">
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title>{{$store.state.user.username}}</v-list-item-title>
				<v-list-item-subtitle>{{$store.state.user.role}}</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-btn icon @click="toggleDrawer">
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item-action>
		</v-list-item>
		<v-divider></v-divider>
		<v-list-item to="/">
			<v-list-item-icon>
				<v-icon>mdi-code-json</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>Configurations</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item to="/settings">
			<v-list-item-icon>
				<v-icon>mdi-cog-outline</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>Settings</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item to="/api-keys">
			<v-list-item-icon>
				<v-icon>mdi-key</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>API Keys</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-item @click="logout">
			<v-list-item-icon>
				<v-icon color="error">mdi-exit-to-app</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title class="error--text">Logout</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
	export default {
		name   : 'CfgNav',
		props  : {
			value: {}
		},
		methods: {
			toggleDrawer() {
				this.$emit('input', !this.value);
			},
			logout() {
				window.location = '/logout';
			}
		},
	};
</script>

<style lang="scss" scoped>
	.cfg-user-avatar {
		width           : 100%;
		height          : 100%;
		border-radius   : 50%;
		display         : flex;
		justify-content : center;
		align-items     : center;
	}
</style>

