<template>
	<div>
		<div class="customizer-links" :class="{'open' : customizer }" id="inner-customizer">
			<div class="nav flex-column nac-pills" id="c-pills-tab" role="tablist" aria-orientation="vertical">
				<a href="javascript:void(0)" class="nav-link" :class="{'active show': customizer == 'settings' }" id="c-pills-home-tab" @click="openCustomizerSetting('settings')">
					<div class="settings"> <i class="icofont icofont-ui-settings"></i> </div>
				</a>
				<a href="javascript:void(0)" class="nav-link" :class="{'active show': customizer == 'color' }" id="c-pills-profile-tab" @click="openCustomizerSetting('color')">
					<div class="settings color-settings"> <i class="icofont icofont-color-bucket"></i> </div>
				</a>
			</div>
		</div>
		<div class="customizer-contain" :class="{'open' : customizer }">
			<div class="tab-content" id="c-pills-tabContent">
				<div class="customizer-header">
					<i class="icofont-close icon-close" @click="customizer = ''"></i>
					<h5>Customizer</h5>
					<p class="mb-0">Customize &amp; Preview Real Time</p>
					<button v-b-modal.modal-customizer class="btn btn-primary plus-popup mt-2">Configuration</button>
					<b-modal id="modal-customizer" title="Modal Title" class="theme-modal">
						<div class="modal-header modal-copy-header">
							<h5 class="headerTitle mb-0">Customizer configuration</h5>
						</div>
						<div class="modal-body">
							<div class="modal-header config-popup">
								<p>To replace our design with your desired theme. Please do configuration as mention </p>
								<p> <b> Path : src > data > layout.json </b> </p>
								<div>
									<pre>
										<code>
											<b-form-textarea :value="data" ref="layout" rows="1" v-bind:style="styleObject"></b-form-textarea>
											{{layout}}
										</code>
									</pre>
								</div>
								<button class="btn btn-primary mt-2" @click="copyText()">Copy Json</button>
							</div>
						</div>
					</b-modal>
				</div>
				<div class="customizer-body custom-scrollbar">
					<div class="tab-pane fade" :class="{'active show': customizer == 'settings' }" id="c-pills-home" role="tabpanel" aria-labelledby="c-pills-home-tab">
						<h6>Layout Type</h6>
						<ul class="main-layout layout-grid">
							<li data-attr="ltr" :class="{'active': layoutType == 'ltr'}" @click="customizeLayoutType('ltr')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-light body"> <span class="badge badge-dark">LTR Layout</span> </li>
									</ul>
								</div>
							</li>
							<li data-attr="rtl" :class="{'active': layoutType == 'rtl'}" @click="customizeLayoutType('rtl')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-light body"> <span class="badge badge-dark">RTL Layout</span> </li>
										<li class="bg-dark sidebar"></li>
									</ul>
								</div>
							</li>
						</ul>
						<h6 class="">Sidebar Type</h6>
						<ul class="sidebar-type layout-grid">
							<li data-attr="normal-sidebar" :class="{'active': sidebarType == 'default'}" @click="customizeSidebarType('default')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
							<li data-attr="compact-sidebar" :class="{'active': sidebarType == 'compact'}" @click="customizeSidebarType('compact')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar compact"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
							<li data-attr="compact-icon-sidebar" :class="{'active': sidebarType == 'compact-icon'}" @click="customizeSidebarType('compact-icon')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar compact-icon"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
						</ul>
						<h6 class="">Sidebar settings</h6>
						<ul class="sidebar-setting layout-grid">
							<li data-attr="default-sidebar" :class="{'active': layout.settings.sidebar_setting == 'default-sidebar'}" @click="customizeSidebarSetting('default-sidebar')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body bg-light"> <span class="badge badge-dark">Default</span> </div>
							</li>
							<li data-attr="border-sidebar"  :class="{'active': layout.settings.sidebar_setting == 'border-sidebar'}" @click="customizeSidebarSetting('border-sidebar')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body bg-light"> <span class="badge badge-dark">Border</span> </div>
							</li>
							<li data-attr="iconcolor-sidebar" :class="{'active': layout.settings.sidebar_setting == 'iconcolor-sidebar'}" @click="customizeSidebarSetting('iconcolor-sidebar')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body bg-light"> <span class="badge badge-dark">icon Color</span> </div>
							</li>
						</ul>
						<h6 class="">Sidebar background setting</h6>
						<ul class="nav nac-pills" id="pills-tab" role="tablist">
							<li class="nav-item">
								<a href="javascript:void(0)" class="nav-link" id="pills-home-tab" :class="{'active show': sidebarSetting == 'color' }" @click="customizerSetting('color')">Color</a>
							</li>
							<li class="nav-item">
								<a href="javascript:void(0)" class="nav-link" id="pills-profile-tab" :class="{'active show': sidebarSetting == 'pattern' }" @click="customizerSetting('pattern')">Pattern</a>
							</li>
							<li class="nav-item">
								<a href="javascript:void(0)" class="nav-link" id="pills-contact-tab" :class="{'active show': sidebarSetting == 'image' }" @click="customizerSetting('image')">image</a>
							</li>
						</ul>
						<div class="tab-content sidebar-main-bg-setting" id="pills-tabContent">
							<div class="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" :class="{'active show': sidebarSetting == 'color' }">
								<ul class="sidebar-bg-settings">
									<li class="bg-dark" data-attr="dark-sidebar"     @click="customizeSidebarBackround('dark-sidebar')"></li>
									<li class="bg-white" data-attr="light-sidebar"   @click="customizeSidebarBackround('light-sidebar')"></li>
									<li class="bg-color1" data-attr="color1-sidebar" @click="customizeSidebarBackround('color1-sidebar')"></li>
									<li class="bg-color2" data-attr="color2-sidebar" @click="customizeSidebarBackround('color2-sidebar')"></li>
									<li class="bg-color3" data-attr="color3-sidebar" @click="customizeSidebarBackround('color3-sidebar')"></li>
									<li class="bg-color4" data-attr="color4-sidebar" @click="customizeSidebarBackround('color4-sidebar')"></li>
									<li class="bg-color5" data-attr="color5-sidebar" @click="customizeSidebarBackround('color5-sidebar')"></li>
								</ul>
							</div>
							<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" :class="{'active show': sidebarSetting == 'pattern' }">
								<ul class="sidebar-bg-settings">
									<li class="bg-pattern1" data-attr="sidebar-pattern1" @click="customizeSidebarBackround('sidebar-pattern1')"></li>
									<li class="bg-pattern2" data-attr="sidebar-pattern2" @click="customizeSidebarBackround('sidebar-pattern2')"></li>
									<li class="bg-pattern3" data-attr="sidebar-pattern3" @click="customizeSidebarBackround('sidebar-pattern3')"></li>
									<li class="bg-pattern4" data-attr="sidebar-pattern4" @click="customizeSidebarBackround('sidebar-pattern4')"></li>
									<li class="bg-pattern5" data-attr="sidebar-pattern5" @click="customizeSidebarBackround('sidebar-pattern5')"></li>
									<li class="bg-pattern6" data-attr="sidebar-pattern6" @click="customizeSidebarBackround('sidebar-pattern6')"></li>
								</ul>
							</div>
							<div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" :class="{'active show': sidebarSetting == 'image' }">
								<ul class="sidebar-bg-settings">
									<li class="bg-img1" data-attr="sidebar-img1" @click="customizeSidebarBackround('sidebar-img1')">
									</li>
									<li class="bg-img2" data-attr="sidebar-img2" @click="customizeSidebarBackround('sidebar-img2')">
									</li>
									<li class="bg-img3" data-attr="sidebar-img3" @click="customizeSidebarBackround('sidebar-img3')">
									</li>
									<li class="bg-img4" data-attr="sidebar-img4" @click="customizeSidebarBackround('sidebar-img4')">
									</li>
									<li class="bg-img5" data-attr="sidebar-img5" @click="customizeSidebarBackround('sidebar-img5')">
									</li>
									<li class="bg-img6" data-attr="sidebar-img6" @click="customizeSidebarBackround('sidebar-img6')">
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="c-pills-profile" :class="{'active show': customizer == 'color' }" role="tabpanel" aria-labelledby="c-pills-profile-tab">
						<h6>Light layout</h6>
						<ul class="layout-grid customizer-color">
							<li class="color-layout" data-attr="light-1" data-primary="#4466f2" data-secondary="#1ea6ec" @click="customizeLightColorScheme('color-1')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="light-2" data-primary="#0288d1" data-secondary="#26c6da" @click="customizeLightColorScheme('color-2')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="light-3" data-primary="#8e24aa" data-secondary="#ff6e40" @click="customizeLightColorScheme('color-3')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="light-4" data-primary="#4c2fbf" data-secondary="#2e9de4" @click="customizeLightColorScheme('color-4')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="light-5" data-primary="#7c4dff" data-secondary="#7b1fa2" @click="customizeLightColorScheme('color-5')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="light-6" data-primary="#3949ab" data-secondary="#4fc3f7" @click="customizeLightColorScheme('color-6')">
								<div></div>
							</li>
						</ul>
						<h6 class="">Dark Layout</h6>
						<ul class="layout-grid customizer-color dark">
							<li class="color-layout" data-attr="dark-1" data-primary="#4466f2" data-secondary="#1ea6ec" @click="customizeDarkColorScheme('color-1')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="dark-2" data-primary="#0288d1" data-secondary="#26c6da" @click="customizeDarkColorScheme('color-2')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="dark-3" data-primary="#8e24aa" data-secondary="#ff6e40" @click="customizeDarkColorScheme('color-3')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="dark-4" data-primary="#4c2fbf" data-secondary="#2e9de4" @click="customizeDarkColorScheme('color-4')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="dark-5" data-primary="#7c4dff" data-secondary="#7b1fa2" @click="customizeDarkColorScheme('color-5')">
								<div></div>
							</li>
							<li class="color-layout" data-attr="dark-6" data-primary="#3949ab" data-secondary="#4fc3f7" @click="customizeDarkColorScheme('color-6')">
								<div></div>
							</li>
						</ul>
						<h6 class="">Mix Layout</h6>
						<ul class="layout-grid customizer-mix">
							<li class="color-layout" data-attr="light-only"  :class="{'active': mixLayout == 'light-only' }" @click="customizeMixLayout('light-only')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-light sidebar"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
							<li class="color-layout" data-attr=""  :class="{'active': mixLayout == 'default' }" @click="customizeMixLayout('default')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
							<li class="color-layout" data-attr="dark-body-only" :class="{'active': mixLayout == 'dark-body-only' }" @click="customizeMixLayout('dark-body-only')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-light sidebar"></li>
										<li class="bg-dark body"> </li>
									</ul>
								</div>
							</li>
							<li class="color-layout" data-attr="dark-sidebar-body-mix" :class="{'active': mixLayout == 'dark-sidebar-body-mix' }" @click="customizeMixLayout('dark-sidebar-body-mix')">
								<div class="header bg-light">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-dark body"> </li>
									</ul>
								</div>
							</li>
							<li class="color-layout" data-attr="dark-header-sidebar-mix" :class="{'active': mixLayout == 'dark-header-sidebar-mix' }" @click="customizeMixLayout('dark-header-sidebar-mix')">
								<div class="header bg-dark">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-light body"> </li>
									</ul>
								</div>
							</li>
							<li class="color-layout" data-attr="dark-only" :class="{'active': mixLayout == 'dark-only' }" @click="customizeMixLayout('dark-only')">
								<div class="header bg-dark">
									<ul>
										<li></li>
										<li></li>
										<li></li>
									</ul>
								</div>
								<div class="body">
									<ul>
										<li class="bg-dark sidebar"></li>
										<li class="bg-dark body"> </li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: 'customizer',
	data(){
		return{
			customizer:'',
			sidebarSetting: 'color',
			layoutType: 'ltr',
			sidebarType: 'default',
			mixLayout:'default',
			styleObject: {
				position: 'fixed',
				left: '0',
				top: '0',
				opacity: '0',
			}
		}
	},
	mounted(){
      this.layout.color.color = localStorage.getItem("color")
      this.layout.color.primary_color = localStorage.getItem("primary_color")
      this.layout.color.secondary_color = localStorage.getItem("secondary_color")		
	},
	computed: {
		...mapState({
			layout: state => state.layout.layout,
			data: state => JSON.stringify(state.layout.layout)
		})
	},
	methods: {
		openCustomizerSetting(val) {
			this.customizer = val
		},
		customizerSetting(val) {
			this.sidebarSetting = val
		},
		customizeLayoutType(val) {
			this.$store.dispatch('layout/setLayoutType', val)
			this.layoutType = val
		},
		customizeSidebarType(val) {
			if (val == 'default') {
				this.layout.settings.sidebar.type = 'default';
				this.layout.settings.sidebar.body_type = 'default';
			} else if (val == 'compact') {
				this.layout.settings.sidebar.type = 'compact-wrapper';
				this.layout.settings.sidebar.body_type = 'sidebar-icon';
			} else if (val == 'compact-icon') {
				this.layout.settings.sidebar.type = 'compact-page';
				this.layout.settings.sidebar.body_type = 'sidebar-hover';
			}  
			this.sidebarType = val
		},
		customizeSidebarSetting(val) {
			this.layout.settings.sidebar_setting = val
		},
		customizeSidebarBackround(val) {
			this.layout.settings.sidebar_backround = val
		},
		customizeMixLayout(val) {
			this.mixLayout = val
			this.$store.dispatch('layout/setLayout', val)
		},
		customizeLightColorScheme(val) {
			this.lightColor = val;
			this.$store.dispatch('layout/setColorLightScheme', val)
		},
		customizeDarkColorScheme(val) {
			this.$store.dispatch('layout/setColorDarkScheme', val)
		},
		copyText() {
			this.$refs.layout.select();
			document.execCommand('copy');
			this.$toasted.show('Code Copied to clipboard', {theme: 'outline',position: 'top-right', type: 'default', duration: 3000});
		}
	}
}
</script>