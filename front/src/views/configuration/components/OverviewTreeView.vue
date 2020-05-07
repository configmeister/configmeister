<template>
	<v-treeview
			v-if="inited"
			class="mt-4"
			@update:active="onActiveUpdate"
			return-object
			dense
			activatable
			hoverable
			:items="computedBranchValues"
			color="secondary"
	>
		<template v-slot:prepend="{item}">
			<v-icon small color="primary cfg-pointer">{{itemTypeIcon(item)}}</v-icon>
		</template>
		<template v-slot:label="{item}">
			<span class="body-2 mr-1 cfg-pointer">{{item.name}}</span>
			<span class="body-2 cfg-pointer" v-if="item.type">
				(<span class="body-2 overline cfg-pointer">{{item.type}}</span>)
			</span>
			<span class="body-2 mr-3 cfg-pointer" v-if="item.value">:</span>
			<span class="body-2 cfg-pointer" :class="itemClass(item.type)" v-if="item.value">{{itemParseValue(item)}}</span>
		</template>
	</v-treeview>
</template>

<script>
	import {graphRequest} from '@/utils/graph';
	import getBranch from '@/graphql/getBranch.graphql';

	export default {
		name    : 'OverviewTreeView',
		props   : {
			currentBranch           : {},
			value                   : {},
			updater                 : {},
			excludedKeysForSelection: {},
		},
		data() {
			return {
				model : {},
				inited: false,
			};
		},
		computed: {
			computedBranchValues() {
				return [{
					id      : this.model.id,
					name    : this.model.name,
					itemType: 'root',
					children: [
						...this.parseScalars(),
						...this.parseComplex()
					]
				}];
			}
		},
		methods : {
			parseScalars() {
				return this.model.scalarValues.map(scalar => {
					return {
						id      : scalar.id,
						name    : scalar.name,
						type    : scalar.type,
						value   : scalar.value,
						sourceId: scalar.sourceId,
						itemType: 'scalar',
						path    : [],
					};
				});
			},
			parseComplex() {
				return [];
			},
			onActiveUpdate(e) {
				this.$emit('input', e[0]);
			},
			itemTypeIcon({itemType, type}) {
				switch (itemType) {
					case 'root':
						return 'mdi-source-branch';
					case 'scalar':
						return 'mdi-code-tags';
					case 'complex':
						return 'mdi-code-json';
				}
			},
			itemClass(type) {
				if (type === 'number') {
					return 'indigo--text';
				} else if (type === 'string') {
					return 'green--text';
				} else if (type === 'boolean') {
					return ['overline', 'indigo--text'];
				}
			},
			itemParseValue(item) {
				switch (item.type) {
					case 'number':
					case 'boolean':
						return JSON.parse(item.value);
					case 'string':
						return item.value;
				}
			},
			async updateValue() {
				const res = await graphRequest(getBranch, {id: this.currentBranch});
				this.model = res.cfgBranch;
			}
		},
		async mounted() {
			await this.updateValue();
			this.inited = true;
			this.updater.on('change-value', async () => {
				await this.updateValue();
			});
		}
	};
</script>

<style scoped>

</style>
