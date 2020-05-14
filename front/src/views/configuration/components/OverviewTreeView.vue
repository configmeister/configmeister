<template>
	<div>
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
				<v-btn small icon @click.native.prevent.stop="onMouseClick(item, $event)">
					<v-icon small color="black">mdi-dots-vertical</v-icon>
				</v-btn>
			</template>
		</v-treeview>

		<v-menu v-model="sideMenuOpened" :position-x="menuX" :position-y="menuY" absolute>
			<v-list dense>
				<v-list-item @click="copyItem">
					<v-list-item-content>
						<v-list-item-title>Copy</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
	import api from '@/utils/api';

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
				model         : {},
				inited        : false,
				sideMenuOpened: false,
				menuX         : 0,
				menuY         : 0,
				menuData      : {},
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
			copyItem() {

			},
			onMouseClick(item, e) {
				this.menuX = e.clientX;
				this.menuY = e.clientY;
				this.menuData = {};
				this.sideMenuOpened = true;
			},
			parseScalars(vals) {
				if (!vals) vals = this.model.scalarValues;
				return vals.map(scalar => {
					return {
						id      : scalar.id,
						name    : scalar.name,
						type    : scalar.type,
						value   : scalar.value,
						sourceId: scalar.sourceId,
						itemType: 'scalar',
					};
				});
			},
			parseValues(scalars, complex) {
				return [
					...(scalars && scalars.length ? this.parseScalars(scalars) : []),
					...(complex && complex.length ? this.parseComplex(complex) : [])
				];
			},
			parseComplex(vals) {
				if (!vals) vals = this.model.complexValues;
				return vals.map(complex => {
					return {
						id      : complex.id,
						name    : complex.name,
						type    : complex.type,
						sourceId: complex.sourceId,
						itemType: 'complex',
						children: this.parseValues(complex.scalarValues, complex.complexValues)
					};
				});
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
				this.model = await api.getBranchById(this.currentBranch);
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

<style lang="scss" scoped>
	.side-menu {
		background-color : #ffffff;
	}
</style>
