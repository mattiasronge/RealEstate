import Layout from '../../data/layout'


const state = {
	layout : Layout
}

// getters
const getters = {

}

// mutations
const mutations = {
	set: (state) => {
		document.body.className = state.layout.color.mix_layout;
		document.body.setAttribute("main-theme-layout", state.layout.settings.layout_type);
		document.getElementsByTagName('html')[0].setAttribute('dir', state.layout.settings.layout_type);
		var color = localStorage.getItem("color") || state.layout.color.color;
		var layoutVersion = localStorage.getItem("layoutVersion") || state.layout.color.layout_version;
		if (color) {
			createStyle(color);
			if (layoutVersion)
				document.body.className = layoutVersion;
		}
	},
	setLayoutType: (state, payload) => {
		document.body.setAttribute("main-theme-layout", payload);
		document.getElementsByTagName('html')[0].setAttribute('dir', payload);
	},
	setLayout: (state, payload) => {
		document.body.className = payload
	},
	setColorLightScheme: (state, payload) => {
		setColor(state, payload);
		state.layout.color.layout_version = 'light';
		localStorage.setItem('layoutVersion', state.layout.color.layout_version);
	},
	setColorDarkScheme: (state, payload) => {
		setColor(state, payload);
		state.layout.color.layout_version = 'dark-only';
		localStorage.setItem('layoutVersion', state.layout.color.layout_version);
	}
};

// actions
const actions = {
	set: (context) => {
		context.commit('set');
	},
	setLayoutType: (context, payload) => {
		context.commit('setLayoutType',payload)
	},
	setLayout: (context, payload) => {
		context.commit('setLayout',payload)
	},
	setColorLightScheme: (context, payload) => {
		context.commit('setColorLightScheme',payload)
	},
	setColorDarkScheme: (context, payload) => {
		context.commit('setColorDarkScheme',payload)
	},
}

// Create style sheet append in head
function createStyle(color) {
	var head = document.head;
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = window.location.origin + '/endless/css/'+color+".css";
	head.appendChild(link);
}


function setColor(state, color) {
	createStyle(color)
	state.layout.color.color = color
	if (color == "color-1") {
		state.layout.color.primary_color = '#4466f2';
		state.layout.color.secondary_color = '#1ea6ec';
	} else if (color == "color-2") {		
		state.layout.color.primary_color = '#0288d1';
		state.layout.color.secondary_color = '#26c6da';
	} else if (color == "color-3") {
		state.layout.color.primary_color = '#8e24aa';
		state.layout.color.secondary_color = '#ff6e40';
	} else if (color == "color-4") {
		state.layout.color.primary_color = '#4c2fbf';
		state.layout.color.secondary_color = '#2e9de4';
	} else if (color == "color-5") {
		state.layout.color.primary_color = '#7c4dff';
		state.layout.color.secondary_color = '#7b1fa2';
	} else if (color == "color-6") {
		state.layout.color.primary_color = '#3949ab';
		state.layout.color.secondary_color = '#4fc3f7';
	}
	localStorage.setItem('color', state.layout.color.color);
	localStorage.setItem('primary_color', state.layout.color.primary_color);
	localStorage.setItem('secondary_color', state.layout.color.secondary_color);
	window.location.reload();
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}