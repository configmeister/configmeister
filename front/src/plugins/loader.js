import Events from 'events';

class Loader extends Events {
	show() {
		this.emit('update', true);
	}

	hide() {
		this.emit('update', false);
	}

	async wrap(clb) {
		this.show();
		const res = clb();
		this.hide();
		return res;
	}
}

const loader = new Loader();
const plugin = (V) => {
	V.prototype.loader = loader;
};
export default loader;
export {
	plugin
};
