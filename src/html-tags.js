const fromObject = function(type, attributes={}){
	let el, keyValue;
	el = document.createElement(type);
	Object.keys(attributes).forEach((key, index)=>{
		keyValue = Object.values(attributes)[index];
		switch (key) {
			case 'text':
				el.textContent = keyValue;
				break;
			case 'data':
				el.dataset[keyValue.name] = keyValue.value;
				break;	
			default:
				el.setAttribute(key, keyValue);
				break;
		}
	});
	return el;
};
const fromString = (htmlString, multiLevel=false)=>{
	const div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return multiLevel ? div.childNodes : div.firstChild;
}
const Tag = (()=>{
	return {
		fromObject: (type, props)=>fromObject(type, props),
		fromString: (htmlString, multiLevel)=>fromString(htmlString, multiLevel)
	}	
})();

export default Tag;
