// Thanks this guy: http://stackoverflow.com/a/105074
const s4 = () => {
	return Math.floor((1 + Math.random()) * 0x10000)
	.toString(16)
	.substring(1);
};
const guid = () => {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
};
export default guid;
