<template>
	<div class="json-editor" ref="editor"></div>
</template>

<script>
	import JSONEditor from 'jsoneditor';

	export default {
		name : 'JsonEditor',
		props: {
			value: {}
		},
		data() {
			return {
				editor       : null,
				editorOptions: {
					name: 'Root',
					mode: 'tree'
				}
			};
		},
		async mounted() {
			await this.$nextTick();
			this.editor = new JSONEditor(this.$refs.editor, this.editorOptions);
			this.editor.set({
				'name': 'value'
			});
		}
	};
</script>

<style scoped>

</style>
