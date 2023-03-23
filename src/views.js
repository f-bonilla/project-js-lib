import {logger} from './utils.js';
import Locale from './locale.js';
import EventsManager from './events-manager.js';

const head  = document.getElementsByTagName('head')[0];
const getStyle = (el, style)=>window.getComputedStyle(el).getPropertyValue(style);
const appendCss = (className, cssPath)=>{
	if( document.querySelectorAll('[data-component="'+className+'"]').length === 0){
		const link  = document.createElement('link');
		link.dataset.component = className;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = cssPath;
		link.media = 'all';
		head.appendChild(link);
	}
};
const removeCss = className=>{
	const instances = document.getElementsByClassName(className);
	if(instances.length === 1){
		const link = document.querySelector('[data-component="'+className+'"]');
		link.parentNode.removeChild(link);
	}
}
const appendHtml = (id, container, html)=>{
	html.id = html.id || id;
	Locale.update(html.querySelectorAll('[data-lang]'));
	return container.appendChild(html);
};
const removeHtml = (id, container)=>{	
	container.removeChild(container.querySelector('#'+id));
};
const append = (id, containerId, cssPath, html)=>{
	const container = document.getElementById(containerId);
	if(!container){
		return logger.error(`Views.add: there is no "${containerId}" container for the "${id}" component.`);
	}
	appendCss(html.className, cssPath);
	return appendHtml(id, container, html);
};
const remove = (id, containerId, className)=>{
	const container = document.getElementById(containerId);
	if(!container){
		return logger.error(`Views.remove: there is no "${containerId}" container for the "${id}" component.`);
	}else if(!container.querySelector('#'+id)){
		return logger.error(`Views.remove: compontent ${id} unknow.`);
	}
	removeCss(className);
	removeHtml(id, container);
};

const Views = (id, containerId, cssPath, html)=>{
	const view = append(id, containerId, cssPath, html);
	let viewDisplay = getStyle(view, 'display');
	const events = EventsManager(view);
	return {
		events: events,
		get: query=>view.querySelector(query),	
		getAll: query=>view.querySelectorAll(query),
		show: ()=>{
			if(getStyle(view, 'display') === 'none') view.style.display = viewDisplay;
		},
		hide: ()=>{
			if(getStyle(view, 'display') !== 'none') view.style.display = 'none';
		},
		destroy: ()=>{
			events.destroy();
			remove(id, containerId, html.className);
		}
	}
};

export default Views;
