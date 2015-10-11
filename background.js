// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  


	var opinions = ['Up', 'Down', '-', 'Steady', 'Positive outlook', 'Negative outlook'];

	// Selected text
	var opiniontext = [

		{
			'name': 'person',
			'ell': chrome.contextMenus.create({"title": "Add '%s' as a person with opinion", "contexts":["selection"],
	                                         "id": "person"})
		},
		{
			'name': 'asset',
			'ell': chrome.contextMenus.create({"title": "Add '%s' as a an asset going", "contexts":["selection"],
	                                         "id": "asset"})
		}
	];  

	// Add an opinion menu to the difrent types
	for	(i = 0; i < opiniontext.length; i++) {
		for	(y = 0; y < opinions.length; y++) {

			if (opinions[y] == '-') {

				var id = chrome.contextMenus.create({"type": "separator", 
													"contexts":["selection"],
			                                        "id": opiniontext[i].name + '_' + opinions[y],
			                                        "parentId": opiniontext[i].name
			                                     });
			}
			else {
				var id = chrome.contextMenus.create({"title": opinions[y], 
													"contexts":["selection"],
			                                        "id": opiniontext[i].name + '_' + opinions[y],
			                                        "parentId": opiniontext[i].name
			                                     });
			}
		}
	}

	// patrolled ?
	  
	// Just add url
	var url = chrome.contextMenus.create({"title": "Anarank add url", "contexts":["page"],
	                                         "id": "url"});  

});




// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {

	var options = Array();


	options.push( 'url=' 	+ encodeURIComponent(info.pageUrl) );

	if (info.parentMenuItemId && info.parentMenuItemId == 'person') {
		options.push( 'opinion=' + info.menuItemId.split('_')[1] );
		options.push( 'name=' 	+ encodeURIComponent(info.selectionText) );
	}
	if (info.parentMenuItemId && info.parentMenuItemId == 'asset') {
		options.push( 'opinion=' + info.menuItemId.split('_')[1] );
		options.push( 'asset=' 	+ encodeURIComponent(info.selectionText) );
	}
	else if (info.parentMenuItemId && info.parentMenuItemId == 'url') {
		// Url added about, so do nting :-)
	}

	var url = "http://balder.hostviser.com:3000/urls/add_step_2?" + options.join('&');  
	window.open(url, '_blank');
};