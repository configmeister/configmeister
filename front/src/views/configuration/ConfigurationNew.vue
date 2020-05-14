<template>
	<v-layout column justify-center align-center>
		<v-card :width="800">
			<v-card-title>New Configuration</v-card-title>
			<v-card-text>
				<v-layout column>
					<v-text-field dense outlined v-model="configurationName" label="Configuration name"></v-text-field>
					<v-text-field dense outlined v-model="versionName" label="Version name"></v-text-field>
					<v-combobox dense outlined multiple v-model="branches" append-icon="" label="Branches"></v-combobox>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" large fill-width text @click="create">Create</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-layout>
</template>

<script>
	import api from '@/utils/api';

	export default {
		name   : 'ConfigurationNew',
		data() {
			return {
				configurationName: '',
				versionName      : '',
				branches         : [],
			};
		},
		methods: {
			async create() {
				await this.loader.wrap(async () => {
					const res = await api.createNewConfiguration(this.configurationName, this.versionName, this.branches);
					await this.$router.push({
						path: `/configuration/${res.id}`,
					});
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
