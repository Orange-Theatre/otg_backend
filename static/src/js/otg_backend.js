odoo.define('otg_backend', function (require) {
	"use strict";

	var core = require('web.core');
	var View = require('web.View');
	var Widget = require('web.Widget');
	var pyeval = require('web.pyeval');
	var ControlPanel = require('web.ControlPanel');
	var Menu = require('web.Menu');
	var ViewManager = require('web.ViewManager');

	ControlPanel.include({
		// Launch our code
		start: function() {
			var result = this._super();
			this.resize_listener();
			return result;
		},

		// Listener for handling window resizing
		resize_listener: function() {
			var self = this;
			$(window).resize(function(){
                self.searchview_resize();
            });
		},

		// Controls behavior of searchview when window is resized
		searchview_resize: function() {
			var self = this;
            var window_w = $(window).width();
            var toggle = $('.o_cp_searchview_toggle');

            if (window_w >= 600 && !$('.o_control_panel').hasClass('o_breadcrumb_full')) {
            	toggle.addClass('o_hidden');
            	this.nodes.$searchview.removeAttr('style').removeClass('collapse in');
            } else if (window_w < 600) {
            	var is_hidden = false;
            	if ($('.o_searchview').hasClass('o_hidden')) {
            		is_hidden = true;
            	}
            	self.toggle_searchview(false, is_hidden);
            };
		},


		// Hide and show searchview button in mobile header 
		_update_search_view: function(searchview, is_hidden) {
			var result = this._super(searchview, is_hidden);
			var self = this;
			
			var window_w = $(window).width();
			if (window_w < 600 && searchview) {
	        	self.toggle_searchview(searchview, is_hidden);
		    };
	        return result;
	    },

	    toggle_searchview: function(searchview, is_hidden) {
	    	var toggle = $('.o_cp_searchview_toggle');

	    	toggle.toggleClass('o_hidden', is_hidden);
	        this.nodes.$searchview.removeAttr('style').addClass('collapse').removeClass('in');
	    },
	});

	Menu.include({
		// Display the name of the opened app in the menubar
		open_menu: function(id) {
			var result = this._super(id);
			var $clicked_menu, $sub_menu;
			$clicked_menu = this.$el.add(this.$secondary_menus).find('a[data-menu=' + id + ']');

			if (this.$secondary_menus.has($clicked_menu).length) {
	            $sub_menu = $clicked_menu.parents('.oe_secondary_menu');
	        } else {
	            $sub_menu = this.$secondary_menus.find('.oe_secondary_menu[data-menu-parent=' + $clicked_menu.attr('data-menu') + ']');
	        }

	        var	$appname = $sub_menu.find('.app-name .oe_menu_text').text();
	        var $apptitle = $('.app-title');
	        if ($apptitle.text() != $appname) {
	        	$apptitle.text($appname);
	        }
            

			console.log(id);
			console.log($appname);
			return result;
		},

		// Handle the behavior of the menu bar channel toggle in discuss
		start: function () {
			var self = this;
	        var result = this._super();
	        $('.o_mail_toggle_channels').click(function () {
	            $('.o_mail_chat_sidebar').slideToggle(200);
	        });
	        return result;
		},
	});
});