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

			<v-list-item @click="() => {}">
				<v-list-item-content>
					<v-list-item-title class="error--text">Delete current branch</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

		</v-list>
	</v-layout>
</template>

<script>
	export default {
		name : 'ControlsBranches',
		props: {
			currentBranch: {},
		}
	};
</script>

<style scoped>

</style>
