;(function(lb, lbSlider) {

	lbSlider.SliderView = Backbone.View.extend({

		groups : null,
		curSec : null,
		defaultSec : null,

		Event : {
			SWAP : 'lbslider_swap',
			LOAD_SEC_COMPLETE : 'lbslider_load_sec_complete'
		},

		initialize : function(options) {

			this.groups = options.groups;
			var scope = this;

			this.$el.css('min-height', '100%');
			this.$el.css('width', '100%');
			this.$el.css('position', 'absolute');

			this.groups.eachSection(function(sec, group) {
				var secView = new lbSlider.SectionView({
					model : sec,
					parent : scope,
					group : group
				});
			});
						
			this.defaultSec = this.groups.at(0).get('sections').at(0);

		},

		start : function() {

			var secView = this.curSec.get('view');

			secView.on(secView.Event.LOAD_COMPLETE, function(event) {
				if(secView.contentView && secView.contentView.start) {
					secView.contentView.start();
				} 
			});
			
			var pageTitle = this.curSec.get('group').get('title');
			if (this.curSec.get('id') != 'index') {
				pageTitle += '-'+this.curSec.get('title');
			} 
			$('title').html(pageTitle);
			
			secView.$el.css('display', 'block');
			secView.load();

			var scope = this;

			this.groups.eachSection(function(sec, group) {
				if (sec != scope.curSec) {
					sec.get('view').load();
				}
			});

		},

		navigate : function(groupid, secid) {
			//trace('navigate :: '+groupid+' '+ secid);
			var nextSec = this.groups.getSectionByIds(groupid, secid);

			if (nextSec == this.curSec)
				return;

			var path = this.namesToPath(groupid, secid);
			//trace('navigate :: $.address.pathNames() = '+$.address.pathNames());
			$.address.path(path);
		},

		namesToPath : function(groupid, secid) {
			var dgname = this.defaultSec.get('group').get('id');
			var dsname = this.defaultSec.get('id');

			if (groupid == dgname && secid == dsname) {
				$.address.update();
				return '/';
			} else if (secid == 'index'){
				return '/' + groupid;
			} else {
				return '/' + groupid + '/' + secid;
			}
		},

		onAddressChange : function(event) {			
			this.swap(event.pathNames[0], event.pathNames[1]);
		},

		isSwapping : function() {
			return $('div.section', this.$el).is(':animated');
		},

		menuClickHandler : function(event) {

			if (this.isSwapping())
				return;			
			//trace('menuClickHandler :: '+event.groupid+' '+ event.secid);
			this.navigate(event.groupid, event.secid);
		},

		swap : function(groupid, secid, direction) {
			//trace('swap :: '+groupid + ' ' +secid);
			if (this.isSwapping()) {
				return;
			}

			var scope = this;

			var nextSec;
			var oldSec = this.curSec;

			if (!secid && groupid) {
				nextSec = this.groups.getSectionByIds(groupid, 'index');
			} else if (!groupid && !secid) {
				nextSec = this.defaultSec;
			} else {
				nextSec = this.groups.getSectionByIds(groupid, secid);
			}

			if (nextSec == oldSec) {
				return;
			}

			var newGroupId = nextSec.get('group').get('id');
			var oldGroupId = oldSec.get('group').get('id');

			var newSecId = nextSec.get('id');
			var oldSecId = oldSec.get('id');
			
			var pageTitle = nextSec.get('group').get('title');
			if (newSecId != 'index') {
				pageTitle += '-'+nextSec.get('title');
			} 
			$('title').html(pageTitle);

			if (newGroupId != oldGroupId) {
				if (newGroupId < oldGroupId) {
					direction = 'right_left';
				} else {
					direction = 'left_right';
				}
			} else if (oldSecId > newSecId) {
				direction = 'down_top';
			} else {
				direction = 'top_down';
			}

			if (!direction) {
				direction = 'top_down';
			}

			var nextView = nextSec.get('view');
			var curView = this.curSec.get('view');
			
			this.curSec = nextSec;


			try {
				curView.contentView.pause();
			} catch (e) {
				//trace(e);
			}
			
			var e = {
				target : this,
				newSec: nextSec,
				oldSec: oldSec
			};
			
			//return;
			this.trigger(this.Event.SWAP, e);

			var cTop = $(window).scrollTop();
			var s = this.getSwapSettings(direction);

			$('body, html').css('overflow-x', 'hidden');
			$('body, html').css('height', curView.$el.height());
			$('body, html').scrollTop(0);

			curView.$el.css(s.curCss);
			curView.$el.scrollTop(cTop);

			nextView.$el.css(s.nextCss);
			nextView.$el.scrollTop(0);

			s.curTween.onComplete = function() {
				try {
					curView.contentView.onNavOut();
					//curView.contentView.destroy();
				} catch (e) {

				}
			};
		
			TweenLite.killTweensOf(curView.$el);
			TweenLite.to(curView.$el, s.duration, s.curTween);
			
			try {
				nextView.contentView.onNavIn();
			} catch (e) {
				
			}
			
			s.nextTween.onComplete = function() {
				nextView.$el.css('width', '100%');
				nextView.$el.css('height', 'auto');
				curView.$el.css('display', 'none');
				scope.$el.css('height', 'auto');
				scope.$el.css('width', '100%');
				$('body, html').css('height', 'auto');
				$('body, html').css('overflow-x', 'auto');
				if(nextView.contentView && nextView.contentView.start) {
					nextView.contentView.start();
				} 
			};
			
			TweenLite.killTweensOf(nextView.$el);
			TweenLite.to(nextView.$el, s.duration, s.nextTween);


		},

		getSwapSettings : function(direction) {
			var settings = {};
			var w = $(window).width();
			var h = $(window).height();

			settings.w = w;
			settings.h = h;

			switch (direction) {
			case 'top_down':
				settings.nextCss = {

					'top' : -h,
					'left' : 0,
					'width' : w,
					'height' : h,
					'display' : 'block',
					'z-index' : 0
				};

				settings.curCss = {
					'left' : 0,
					'top' : 0,
					'width' : w,
					'height' : h,
					'z-index' : 10
				};

				settings.curTween = {
					top : h,
					ease: Power1.easeOut
				};

				settings.nextTween = {
					top : 0,
					ease: Power1.easeOut
				};

				settings.duration = .75;
				break;

			case 'down_top':
				settings.nextCss = {

					'top' : h,
					'left' : 0,
					'width' : w,
					'height' : h,
					'display' : 'block',
					'z-index' : 10
				};

				settings.curCss = {
					'left' : 0,
					'top' : 0,
					'width' : w,
					'height' : h,
					'z-index' : 0
				};

				settings.curTween = {
					top : -h,
					ease: Power1.easeOut
				};

				settings.nextTween = {
					top : 0,
					ease: Power1.easeOut
				};

				settings.duration = .75;
				break;

			case 'left_right':
				settings.nextCss = {
					'left' : -w,
					'top' : 0,
					'height' : h,
					'width' : w,
					'display' : 'block'
				};

				settings.curCss = {
					'left' : 0,
					'top' : 0,
					'height' : h,
					'width' : w
				};

				settings.curTween = {
					left : w,
					ease: Power1.easeIn
				};

				settings.nextTween = {
					left : 0,
					ease: Power1.easeIn
				};

				settings.ease = Power1.easeIn;
				settings.duration = .65;
				break;

			case 'right_left':
				settings.nextCss = {
					'left' : w,
					'top' : 0,
					'height' : h,
					'width' : w,
					'display' : 'block'
				};

				settings.curCss = {
					'left' : 0,
					'top' : 0,
					'height' : h,
					'width' : w
				};

				settings.curTween = {
					left : -w,
					ease: Power1.easeIn
				};

				settings.nextTween = {
					left : 0,
					ease: Power1.easeIn
				};

				settings.duration = .65;
				break;

			}

			return settings;
		}

	});
	
/*	==============================================================
	SectionView		
	==============================================================*/
			
	lbSlider.SectionView = Backbone.View.extend({

		jsModule : null,
		contentView : null,
		infoView : null,
		secLoaded : false,
		jsLoaded : false,

		Event : {
			LOAD_SEC_COMPLETE : 'lbslidersection_load_sec_complete',
			LOAD_JS_COMPLETE : 'lbslidersection_load_js_complete',
			LOAD_CSS_COMPLETE : 'lbslidersection_load_css_complete',
			LOAD_COMPLETE : 'lbslidersection_load_complete'
		},

		initialize : function(options) {

			this.parent = options.parent;
			this.model = options.model;
			
			var secid;
			
			this.$el = $('<div/>', {
				'class' : 'full section',
				secid : this.model.get('id'),
				groupid : options.group.get('id')
			});

			this.$el.css('position', 'absolute');
			this.$el.css('overflow', 'hidden');
			this.$el.css('min-height', '100%');
			this.$el.css('width', '100%');
			this.$el.css('display', 'none');

			this.el = this.$el.get(0);

			this.$el.css('display', 'none');
			//this.$el.css('background-color', this.getRandomColor());

			this.parent.$el.append(this.el);
			this.model.set('view', this);
			
			this.on(this.Event.LOAD_SEC_COMPLETE, this.loadHandler, this);
			this.on(this.Event.LOAD_JS_COMPLETE, this.loadHandler, this);
		},

		load : function() {

			var base = location.protocol + '//' + location.host;

			var groupid = this.model.get('group').get('id');
			var secid = this.model.get('id');

			var path = base + '/api/section/' + groupid + '/' + secid;
			var scriptPath = base + '/js/sections/' + groupid + '/' + secid+'/'+ secid+build_version
					+ '.js';
			var cssPath = base + '/css/sections/' + groupid + '/' + secid + build_version
			+ '.css';

			var scope = this;

			this.$el.load(path, function() {

				var e = {
					type : scope.Event.LOAD_SEC_COMPLETE,
					target : scope,
					groupid : groupid,
					secid : secid
				};
				scope.trigger(scope.Event.LOAD_SEC_COMPLETE, e);
			});

			$.getScript(scriptPath, function(data, textStatus, jqxhr) {
				scope.jsModule = window.lb.module(groupid + '_' + secid);
				var e = {
					type : scope.Event.LOAD_JS_COMPLETE,
					target : scope,
					groupid : groupid,
					secid : secid
				};
				scope.trigger(scope.Event.LOAD_JS_COMPLETE, e);
			});
			
			 $("head").append($("<link rel='stylesheet' href='"+cssPath+"' type='text/css'/>"));
		},

		loadHandler : function(event) {

			switch (event.type) {
			case this.Event.LOAD_SEC_COMPLETE:
				this.secLoaded = true;
				break;
			case this.Event.LOAD_JS_COMPLETE:
				this.jsLoaded = true;
				this.jsModule = lb
						.module(event.groupid + '_' + event.secid);
				break;
			}

			var scope = this;
			
			if (this.secLoaded && this.jsLoaded) {
				//trace('loadHandler all loaded  '+this.$el.attr('secid'));
				//trace('loadHandler all loaded  '+this.jsModule.ContentView);
				this.contentView = new this.jsModule.ContentView({
					parent : this
				});
				
				if ($('.info',this.$el)) {
					this.infoView = new lbSlider.InfoView({$el: $('.info',this.$el)});
					this.infoView.minimize();
				}
				
				var e = {
					type : this.Event.LOAD_COMPLETE,
					target : this,
					groupid : event.groupid,
					secid : event.secid
				};
				this.trigger(scope.Event.LOAD_COMPLETE, e);
			}
		},

		getRandomColor : function() {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for ( var i = 0; i < 6; i++) {
				color += letters[Math.round(Math.random() * 15)];
			}
			return color;
		}

	});
	
	/*	==============================================================
	MainMenuView	
	==============================================================*/
	
	
	lbSlider.MainMenuView = Backbone.View.extend({
		
		//site data
		groups : null,
		//elements
		groupProto : null,
		secProto : null,
		secConProto: null,
		tab : null,
		content : null,
		
		slider : null,
		
		timeout : null,
		isMouseover : false,
		
		Event : {
			CLICK : 'main_menu_click'
		},
		
		initialize : function(options) {
			this.groups = options.groups;
			this.slider = options.slider;
		},
		
		render : function() {
			var scope = this;
			
			this.tab = $('.tab',this.$el);
			this.tab.click(function() {
				scope.toggleTab();
			});
			
			this.content = $('.content',this.$el);
			
			window.clearTimeout(this.timeout);
			
			this.content.mouseover(function() {
				scope.isMouseover = true;
			});

			this.content.mouseout(function() {
				scope.isMouseover = false;
			});
			
			//get prototypes as templates
			var groupCon = $('.group-con', this.$el);
			this.groupProto = $('ul li:first', groupCon);
			this.groupProto.remove();
			
			this.secConProto = $('.sec-con', this.$el);
			this.secProto = $('ul li:first', this.secConProto);
			
			this.secProto.remove();
			this.secConProto.remove();
						
			//recursively generating all menu items
			this.groups.each(function(group) {
				
				var groupli = scope.groupProto.clone();
				
				groupli.attr('groupid', group.get('id'));
				groupli.attr('secid', group.get('sections').at(0).get('id'));
				
				var label = $('.group-label', groupli);
				label.html(group.get('title'));

				var secCon = scope.secConProto.clone();
				secCon.appendTo(groupli);
				
				groupli.css('display', 'block');
				groupli.appendTo($('ul:first', groupCon));
				
				var secs = group.get('sections');
				
				//check if the group is empty
				if (secs.length == 1 && secs.at(0).get('id') == 'index') {
					
					$(groupli).click(function() {
						if ($(groupli).hasClass('active'))
							return;

						scope.minimize();
						
						var e = {
								target : scope,
								groupid : $(groupli).attr('groupid'),
								secid : 'index'
						}
						scope.trigger(scope.Event.CLICK, e);
					});
					
					var gid = scope.slider.curSec.get('group').get('id');
					var sid = scope.slider.curSec.get('id');
					  
					if ('index' == sid && $(groupli).attr('groupid') == gid) {
						$(groupli).toggleClass('active', true);
					} 
					return;
				} 
				//set up each section button
				secs.each(function(sec) {

				  var secli = scope.secProto.clone();
				  secli.attr('groupid', group.get('id'));
				  secli.attr('secid', sec.get('id'));
				  
				  var label = $('.sec-label', secli);
				  label.html(sec.get('title'));
				  
				  secli.css('display', 'block');
				  secli.appendTo($('ul', groupli));
				  
				  //set up the rollover/out behaviors
				  $(secli).mouseover(function() {
					  if ($(secli).hasClass('active'))
						  return;
					  scope.transition(this, 'mouseover');
				  });
				  
				  $(secli).mouseout(function() {

					  if ($(secli).hasClass('active'))
						  return;
					  scope.transition(this, 'mouseout');
				  });

				  //dispatch even on click
				  $(secli).click(function() {

					  if ($(secli).hasClass('active'))
						  return;
					  
					  scope.minimize();

					  var e = {
							  target : scope,
							  groupid : $(secli).attr('groupid'),
							  secid : $(secli).attr('secid')
					  }
					  scope.trigger(scope.Event.CLICK, e);
				  });
				  
				  //check for default/initial active state
				  
				  var gid = scope.slider.curSec.get('group').get('id');
				  var sid = scope.slider.curSec.get('id');

				  if ($(secli).attr('secid') == sid && $(secli).attr('groupid') == gid) {
					  $(secli).toggleClass('active', true);
					  $(secli).css('padding-left', '0px');
					  $(groupli).toggleClass('active', true);
				  } 
				  
				});
				
			});
			
			this.maximize();
			
			this.timeout = window.setTimeout(function() {
				scope.minimize();
			}, 3000);
			
		},
		
		toggleTab : function() {
			if (this.tab.hasClass('open')) {
				this.minimize();
			} else {
				this.maximize();
			}
		},
		
		minimize : function() {
			window.clearTimeout(this.timeout);
			
			var scope = this;
			this.tab.toggleClass('open', false);
			//this.$el.stop();
			/*this.$el.animate({
				'left' : '-300px'
			}, 'fast');*/
			TweenLite.killTweensOf(this.$el);
			TweenLite.to(this.$el, .3, {left:"-300px",ease:Power1.easeIn});
		
		},

		maximize : function() {
			this.tab.toggleClass('open', true);
			//this.$el.stop();
			/*this.$el.animate({
				'left' : '0px'
			}, 'fast');*/
			TweenLite.killTweensOf(this.$el);
			TweenLite.to(this.$el, .3, {left:"0px",ease:Power1.easeIn});
	
		},
		
		transition : function(ele, type) {
			switch (type) {
			case 'mouseover':
				$(ele).toggleClass('hover', true);
				TweenLite.killTweensOf($(ele));
				TweenLite.to($(ele), .1, {paddingLeft:'10px',ease:Power1.easeIn});
				
				break;
			case 'mouseout':
				$(ele).toggleClass('hover', false);
				TweenLite.killTweensOf($(ele));
				TweenLite.to($(ele), .1, {paddingLeft:'0px',ease:Power1.easeIn});
				
				break;
			case 'click':
				$(ele).toggleClass('hover', false);
				$(ele).toggleClass('active', true);
				TweenLite.to($(ele), .1, {paddingLeft:'0px',ease:Power1.easeIn});
				break;
			}
		},
		
		swapHandler : function(event) {
			
			var newgid = event.newSec.get('group').get('id');
			var oldgid = event.oldSec.get('group').get('id');
			var newsid = event.newSec.get('id');
			var oldsid = event.oldSec.get('id');
			
			var oldEle = $('li[secid="' + oldsid + '"]li[groupid="'+oldgid+'"]', this.$el);
			var newEle = $('li[secid="' + newsid + '"]li[groupid="'+newgid+'"]', this.$el);

			oldEle.toggleClass('active', false);
			this.transition(oldEle, 'mouseout');
			this.transition(newEle, 'click');
			
			var oldGroupli = $('.group-con>ul>li[groupid="'+oldgid+'"]', this.$el);
			var newGroupli = $('.group-con>ul>li[groupid="'+newgid+'"]', this.$el);
			
			if (newgid != oldgid) {
				oldGroupli.toggleClass('active', false);
				newGroupli.toggleClass('active', true);
			} else {
				newGroupli.toggleClass('active', true);
			}
		}
		
	});
	
	lbSlider.InfoView = Backbone.View.extend({
		
		icon : null,
		contentCon: null,
		bg: null,
		
		Event : {
			CLICK : 'info_click'
		},
		
		initialize : function(options) {
			this.$el = options.$el;
			this.render();
		},
		
		render : function() {
			this.icon = $('.info-icon',this.$el);
			this.contentCon = $('.content-con',this.$el);
			this.bg = $('.info-bg',this.$el);
			
			var scope = this;
			
			this.icon.click(function(){
				scope.toggleInfo();
			});
		},
		
		maximize : function() {
			
			this.icon.toggleClass('open', true);
			this.$el.stop();
			this.contentCon.css('height','auto');
			//this.bg.css('height','100%');
			
			var offset = 20+this.$el.position().top;
			trace('max '+this.$el.position().top);
			if (this.contentCon.outerHeight()+offset>= $(window).height()) {
				this.contentCon.outerHeight($(window).height()-offset);
				//this.bg.outerHeight($(window).height()-offset);
			} 
			
			this.contentCon.show('fast');
		},
		
		minimize : function() {
			this.icon.toggleClass('open', false);
			this.$el.stop();
			this.contentCon.hide('fast');			
		},
		
		toggleInfo : function() {
			if (this.icon.hasClass('open')) {
				this.minimize();
			} else {
				this.maximize();
			}
		}
	});
	
	//models

	lbSlider.Section = Backbone.Model.extend({
		constructor: function() {	
		    Backbone.Model.apply(this, arguments);
		}
	});

	lbSlider.Sections = Backbone.Collection.extend({
		model : lbSlider.Section
	});

	lbSlider.Group = Backbone.Model.extend({
		
		initialize: function() {	
			//trace('init '+ this.get('sections'));
		    if (this.get('sections')) {
		    	var secs = new lbSlider.Sections(this.get('sections'));
		    	//secs.reset(this.get('sections'));
		    	this.set('sections', secs);
		    	
		    	var scope = this;
		    	this.get('sections').each(function(sec){
		    		sec.set('group',scope);
		    	});
		    	//trace('init 2 '+ this.get('sections'));
		    }
		    
		},
		
		parse: function(data, options) {			
			//trace('parse ' + this.sections);
	        if (data.sections && this.get('sections')) {
	        	this.get('sections').reset(data.sections);	                
	        }
	        return data;
	    }
	});

	lbSlider.Groups = Backbone.Collection.extend({
		model : lbSlider.Group,
		
		url : '/api/sitemap?format=json',

		getSectionByIds : function(groupid, secid) {
			if (!secid) secid = 'index';
			return this.findWhere({id:groupid}).get('sections').findWhere({id:secid});
		},
		eachSection : function(callback) {
			this.each(function(group) {
				//trace(group.get('sections'));
				group.get('sections').each(function(sec) {
					callback(sec, group);
				});
			});
		}

	});

	
	lbSlider.ContentView = Backbone.View.extend({
		
		parent : null,
		resizeHandler : null,
		update : null,
	
		initialize : function(options) {
			//trace('parent::initializer');
			this.parent = options.parent;
			this.setElement('.sec-content', this.parent.$el);
			//trace(this.$el);
		},

		start : function() {
		},
		
		pause : function() {
		},

		destroy : function() {
		},
		
		onNavOut : function() {
		},
		
		onNavIn : function() {
		}

	});
	/*lbSlider.GroupMenuView = Backbone.View.extend({

				groups : null,
				slider : null,
				menu : null,
				items : null,
				timeout : null,
				isMouseover : false,
				underline : null,

				Event : {
					CLICK : 'lbslidermenu_click'
				},

				initialize : function(options) {

					this.groups = options.groups;
					this.slider = options.slider;

					this.menu = $('ul', this.$el);

					this.proto = $('ul li:first', this.$el);
					this.proto.remove();

					this.underline = $('.underline:first', this.$el);

				},

				render : function() {

					var scope = this;
					this.items = new Array();
					
					var wOffset = 0;
					

					this.groups.each(function(group) {
						var ele = scope.proto.clone();
						

						ele.attr('groupid', group.get('id'));
						ele.attr('secid', group.get('sections').at(0).get(
								'id'));
						
						var label = $('.nav-label', ele);
						label.html(group.get('title'));

						ele.css('display', 'block');

						scope.items.push(ele);
						ele.appendTo(scope.menu);
						ele.css('width', ele.width() + 6);
						//wOffset += 20 + ele.width();
					});
					
					//this.menu.width(wOffset);
					
					
					$(this.items).each(
							function(index, ele) {

								var gid = scope.slider.curSec.get('group')
										.get('id');

								if ($(ele).attr('groupid') == gid) {
									$(ele).toggleClass('active', true);
									var left = $(ele).offset().left
											- scope.menu.offset().left
											+ parseInt($(ele).css(
													'padding-left'));
									scope.underline.css('left', left);
									scope.underline
											.css('width', $(ele).width());
								}

								$(ele).mouseover(function() {
									if ($(ele).hasClass('active'))
										return;

									scope.transition(ele, 'mouseover');
								});
								$(ele).mouseout(function() {

									scope.transition(ele, 'mouseout');
								});
								$(ele).click(function() {

									if ($(ele).hasClass('active'))
										return;

									var e = {
										target : scope,
										groupid : $(ele).attr('groupid'),
										secid : $(ele).attr('secid')
									}
									scope.trigger(scope.Event.CLICK, e);

								});
							});

					this.resizeHandler = $.proxy(function() {
						
						var scope = this;
						$(this.items).each(function(index, ele) {
							$(ele).css('width','auto');
							ele.css('width', ele.width() + 6);
						});
						
						var active = $('.active', this.menuCon);
						var left = active.offset().left
								- this.menu.offset().left
								+ parseInt(active.css('padding-left'));
						this.underline.css('left', left);
						this.underline.css('width', active.width());				
						
					}, this);

					$(window).on('resize', this.resizeHandler);
				},

				transition : function(ele, type) {
					switch (type) {
					case 'mouseover':
						$(ele).toggleClass('hover', true);
						break;
					case 'mouseout':
						$(ele).toggleClass('hover', false);
						break;
					case 'click':
						//trace($(ele).offset());
						var left = $(ele).offset().left
								- this.menu.offset().left
								+ parseInt($(ele).css('padding-left'));
						$(ele).toggleClass('hover', false);
						this.underline.stop();
						this.underline.animate({
							'width' : $(ele).width(),
							'left' : left
						}, 'fast');
						break;
					}
				},

				swapHandler : function(event) {
					
					var newGName = event.newSec.get('group').get('id');
					var oldGName = event.oldSec.get('group').get('id');
					if (newGName == oldGName) return;
					
					var oldEle = $('li.active', this.menu);
					var newEle = $('li[groupid="' + newGName + '"]',
							this.menu);

					oldEle.toggleClass('active', false);
					newEle.toggleClass('active', true);
					this.transition(oldEle, 'mouseout');
					this.transition(newEle, 'click');
				}

			});*/

	/*lbSlider.SectionMenuView = Backbone.View.extend({

				menu : null,
				proto : null,
				items : null,
				menuCon : null,
				timeout : null,
				isMouseover : false,
				groups : null,
				slider : null,

				Event : {
					CLICK : 'lbslidermenu_click'
				},

				render : function() {

					var curGroup = this.slider.curSec.get('group');
					var curSecs = curGroup.get('sections');

					this.items = new Array();

					var maxW = 0;

					this.$el.css('width', 'auto');

					var scope = this;

					var i = 0;
					
					curSecs.each(function(sec) {
						var ele = scope.proto.clone();

						ele.appendTo(scope.menu);
						ele.attr('secid', sec.get('id'));
						ele.attr('groupid', curGroup.get('id'));

						$('.nav-label', ele).html(sec.get('title'));

						ele.css('opacity', '0');
						ele.css('display', 'block');

						scope.items.push(ele);
						
						ele.delay(150 * i).animate({
							'opacity' : '1'
						}, 'fast', function(){
							if (maxW < $('.nav-label', ele).outerWidth()) {
								maxW = $('.nav-label', ele).outerWidth();
							}							
							scope.$el.css('width',(maxW + 45));
						});

						i++;

						if (maxW < $('.nav-label', ele).outerWidth()) {
							maxW = $('.nav-label', ele).outerWidth();
						}
					});
					
					//this.$el.css('width',(maxW + 20 + maxW*.30));

					$('.nav-bg', this.$el).animate({
						'width' : '100%'
					}, 'fast');

					window.clearTimeout(this.timeout);

					this.timeout = window.setTimeout(function() {
						scope.minimize();
					}, 3000);

					this.$el.mouseover(function() {
						scope.isMouseover = true;
						scope.maximize();
					});

					this.$el.mouseout(function() {
						scope.isMouseover = false;
						scope.minimize();
					});

					$(this.items).each(
							function(index, ele) {
								var gid = scope.slider.curSec.get('group')
										.get('id');
								var sid = scope.slider.curSec.get('id');

								if ($(ele).attr('secid') == sid) {
									$(ele).toggleClass('active', true);
									$(ele).css('padding-left', '0px');
								} else {
									// $('.nav-label', ele).css('opacity',
									// '.6');
								}

								$(ele).mouseover(function() {
									if ($(ele).hasClass('active'))
										return;
									scope.transition(ele, 'mouseover');
								});
								$(ele).mouseout(function() {

									if ($(ele).hasClass('active'))
										return;
									scope.transition(ele, 'mouseout');
								});

								$(ele).click(function() {

									if ($(ele).hasClass('active'))
										return;

									var e = {
										target : scope,
										groupid : $(ele).attr('groupid'),
										secid : $(ele).attr('secid')
									}
									scope.trigger(scope.Event.CLICK, e);

								});
							});
				},

				initialize : function(options) {
					this.groups = options.groups;
					this.menu = $('ul', this.$el);
					this.slider = options.slider;

					this.proto = $('ul li:first', this.$el);
					this.proto.remove();
				},

				minimize : function() {
					window.clearTimeout(this.timeout);
					if (!this.isMouseover) {
						$(this.items).each(function(index, ele) {

							$('.nav-label', ele).stop();
							$('.nav-label', ele).animate({
								'opacity' : '0'
							}, 'fast');
						});

						$('.nav-bg', this.$el).stop();
						$('.nav-bg', this.$el).animate({
							'width' : 35
						}, 'fast');
					}
				},

				maximize : function() {

					$(this.items).each(function(index, ele) {
						$('.nav-label', ele).stop();
						$('.nav-label', ele).animate({
							'opacity' : '1'
						}, 'fast');
					});

					$('.nav-bg', this.$el).stop();
					$('.nav-bg', this.$el).animate({
						'width' : '100%'
					}, 'fast');
				},

				transition : function(ele, type) {
					switch (type) {
					case 'mouseover':
						$(ele).toggleClass('hover', true);
						$(ele).stop();
						$(ele).animate({
							'opacity' : '1',
							'padding-left' : '10px'
						}, 'fast');
						break;
					case 'mouseout':
						$(ele).toggleClass('hover', false);
						$(ele).stop();
						$(ele).animate({
							'padding-left' : '0px'
						}, 'fast');
						break;
					case 'click':
						$(ele).toggleClass('hover', false);
						$(ele).toggleClass('active', true);
						$(ele).animate({
							'padding-left' : '0px'
						}, 'fast');
						break;
					}
				},

				destroy : function(callback) {
					var scope = this;
					if (!this.$el || !$('li', this.menu))
						return;
					this.$el.children().unbind();
					this.$el.unbind();

					var li = $('li', this.menu);
					var len = li.length;

					$(li).each(function(index, ele) {

						var func = function() {
							$(ele).remove();
						};

						if (len - 1 == index && callback) {
							func = function() {
								$(ele).remove();
								callback();
							}
						}

						$(ele).delay(100 * index).animate({
							'opacity' : '0'
						}, 'fast', func);
					});
				},

				swapHandler : function(event) {
					
					var newGName = event.newSec.get('group').get('id');
					var oldGName = event.oldSec.get('group').get('id');
					var newSName = event.newSec.get('id');
					var oldSName = event.oldSec.get('id');
					
					if (newGName != oldGName) {
						var scope = this;
						this.destroy(function() {
							scope.render();
						});
					} else {
						var oldEle = $('li.active', this.menu);
						var newEle = $('li[secid="' + newSName + '"]',
								this.menu);

						oldEle.toggleClass('active', false);
						this.transition(oldEle, 'mouseout');
						this.transition(newEle, 'click');
					}
				}

			});*/

})(lb, lb.module('lbSlider'));