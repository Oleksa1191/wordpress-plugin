(function() {	jQuery(document).ready(function(){	    jQuery('#web_services_error').css('display','block');	    // ajax loading gif		var ajax_load = "<span class='ajax'></span>";		//path to the admin ajax file	    // url of the blog	    var blogUrl = jQuery('#blogUrl').attr('ajax');	    // when the save changes button is clicked	    jQuery('#save_changes').click(function(event){	    	jQuery('#action_mode').val('');	        // prevent the default action as we need to save the links to the db first.	        event.preventDefault();	        var submit = apikey_check();	        if(submit === true) {	        	var status = jQuery('.status');	            // give the user a pseudo status console so they know something is happening	            status.fadeIn('fast').html(ajax_load+'Saving Links...');	            // need to get the custom links from the form, if any	            if(jQuery('.systemLink').size() > 0 || jQuery('.savedLink').size() > 0) {	            	jQuery('[name=action]').val('idx_update_links');	            	var params = jQuery('#idx_broker_options').serialize()+'&'+jQuery.param({'save_action': 'all_links' });	            	save_form_options(params, function() {	            		status.fadeIn('slow').html(ajax_load+'Saving Options...');	            	});	            }	            else {	            	status.fadeIn('slow').html(ajax_load+'Saving Options...');	            	jQuery('#idx_broker_options').submit();	            }	        }	    });	    jQuery('#save_systemlinks').click(function(event) {	    	event.preventDefault();	     	var submit = apikey_check();		   	if(submit === true) {		    	jQuery('[name=action]').val('idx_update_systemlinks');		    	jQuery('#action_mode').val('systemlinks');		    	var status = jQuery(this).siblings('.system_status');		    	var params = jQuery('#idx_broker_options').serialize()+'&'+jQuery.param({ 'save_action': 'systemlinks' });		    	status.fadeIn('fast').html(ajax_load+'Refreshing API...');		    	save_form_options(params, function() {		    		status.fadeIn('fast').html(ajax_load+'Refreshing Links...');		    	});		   	}	    });	    jQuery('#save_savedlinks').click(function(event) {	        var submit = apikey_check();	   	   	if(submit === true) {	   	    	event.preventDefault();	   	    	jQuery('[name=action]').val('idx_update_savedlinks');	   	    	jQuery('#action_mode').val('savedlinks');	   	    	var status = jQuery(this).siblings('.saved_status');	   	    	var params = jQuery('#idx_broker_options').serialize()+'&'+jQuery.param({ 'save_action': 'savedlinks' });	   	    	status.fadeIn('fast').html(ajax_load+'Refreshing API...');	   	    	save_form_options(params, function() {	   	    		status.fadeIn('fast').html(ajax_load+'Refreshing Links...');	   	    	});	   	   	}	    });	    jQuery('#tabs_container a').click(function(event) {	    	event.preventDefault();	    	var tabIndex = jQuery(this).attr('href');	    	jQuery('#tabs_content_container .tab_content').hide();	    	jQuery('#tabs_container li').removeClass('active');	    	jQuery('#tabs_container li:has(a[href='+tabIndex+'])').addClass('active');	    	jQuery(tabIndex).show();	    });		if (jQuery("#page_link").val().length < 21) {			jQuery("#page_link").width( 20 * 8);		} else {			jQuery("#page_link").width( jQuery("#page_link").val().length * 8);		}	    jQuery("#page_link").click(function(){	    	jQuery("#page_link").select();	    });	    // select/deselect all link functionality	    jQuery('#idx_systemlink_group').click(function(event){	        jQuery('.idx_platinum_sl').attr('checked', jQuery(this).is(':checked'));	    });	    jQuery('#idx_savedlink_group').click(function(event){	        jQuery('.idx_platinum_sdl').attr('checked', jQuery(this).is(':checked'));	    });	    jQuery('#api_update').click(function(event) {	    	var apikey = jQuery('#idx_broker_apikey').val();	        var submit = apikey_check();	    	if(submit === true) {		    	event.preventDefault();		    	jQuery('[name=action]').val('idx_refresh_api');		    	jQuery('#action_mode').val('refresh_mode');		    	var status = jQuery('.refresh_status');		    	var params = jQuery('#idx_broker_options').serialize();		    	status.fadeIn('fast').html(ajax_load+'Refreshing API...');		    	save_form_options(params, function() {		    		status.fadeIn('fast').html(ajax_load+'Refreshing Links...');		    	});	    	}	    });		if(jQuery('#idx_broker_dynamic_wrapper_page_name').val() !== '') {			var linkData = jQuery('#page_link').val().split('//');			var protocol= linkData[0];			var link = linkData[1];			jQuery('#protocol').text(protocol+'//');			jQuery('#page_link').val(link);			jQuery('#dynamic_page_url').show();		}	  	jQuery('#idx_broker_creaet_wrapper_page').click(function(event) {		    event.preventDefault();		    var post_title = jQuery('#idx_broker_dynamic_wrapper_page_name').val();		    var wrapper_page_id = jQuery('#idx_broker_dynamic_wrapper_page_id').val();		    jQuery('#idx_broker_dynamic_wrapper_page_name').removeClass('error');		    jQuery('#dynamic_page > p.error').hide();		    if ( post_title === '') {		    	jQuery('#idx_broker_dynamic_wrapper_page_name').addClass('error');		    	jQuery('#dynamic_page > p.error').show();		    	return;		    }		    jQuery.post(				ajaxurl, {				'action': 'create_dynamic_page',				'post_title': post_title,				'wrapper_page_id': wrapper_page_id			}).done(function(response){				var params = JSON.parse(response);				var status = jQuery('.wrapper_status');				var title = jQuery('#idx_broker_creaet_wrapper_page').val();				title = title.replace(/e$/,'ing');				jQuery("#idx_broker_dynamic_wrapper_page_id").val(params.wrapper_page_id);				status.fadeIn('fast').html(ajax_load+title+' IDX Wrapper Page...');				// save form				save_form_options('', function() {					status.fadeIn('fast').html(ajax_load+' Refreshing Page...');				});			});		});	    jQuery('#idx_broker_delete_wrapper_page').click(function () {	    	var wrapper_page_id = jQuery('#idx_broker_dynamic_wrapper_page_id').val();		    jQuery.post(				ajaxurl, {					'action': 'delete_dynamic_page',					'wrapper_page_id': wrapper_page_id				}).done(function(){					// save form					var status = jQuery('.wrapper_status');					status.fadeIn('fast').html(ajax_load+'Deleting IDX Wrapper Page...');					save_form_options('', function() {						status.fadeIn('fast').html(ajax_load+' Refreshing Page...');					});				});	    });		jQuery('.systemLink').on('click', systemlink_check);		// switch to previous tabs		jQuery('a[href='+jQuery('#currentTab').val()+']').click();		systemlink_check();		savedlink_check();	});	/**	 *	return true or false for form submission	 */	function apikey_check () {		var apikey = jQuery('#idx_broker_apikey').val();		if (apikey === '') {			jQuery('#idx_broker_apikey').focus();			jQuery('#idx_broker_apikey').parent('div').css('background', '#FDB7B7');		   	jQuery('#idx_broker_apikey_error').show();			return false;		} else {		   jQuery('#idx_broker_apikey').parents('div').css('background', 'none');		   jQuery('#idx_broker_apikey_error').hide();		   return true;		}	}	function save_form_options (params, callback) {		params = params || jQuery('#idx_broker_options').serialize();		jQuery.ajax({	  		type: "POST",	   		url: ajaxurl,	   		data: params,	   		success: function(data) {    			jQuery('[name=action]').val('update');    			var curentTab = jQuery('#tabs li.active a').attr('href');  				jQuery('#currentTab').val(curentTab);    			jQuery('#idx_broker_options').submit();    			callback();		  	} 		});	}	window.systemlink_check = function() {	    if(jQuery('.systemLink').size() == jQuery('.systemLink:checked').size()) {	    	jQuery('input[name=idx_systemlink_group]').attr('checked', true);	    }	    else {	    	jQuery('input[name=idx_systemlink_group]').attr('checked', false);	    }	};	window.savedlink_check = function() {	    if(jQuery('.savedLink').size() == jQuery('.savedLink:checked').size()) {	    	jQuery('input[name=idx_savedlink_group]').attr('checked', true);	    }	    else {	    	jQuery('input[name=idx_savedlink_group]').attr('checked', false);	    }	};})(window, undefined);