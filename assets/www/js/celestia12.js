function init() {

	document.addEventListener("deviceready", onDeviceReady, false);
	// Cordova is ready
	//
	function onDeviceReady() {
		checkConnection();
	}

	function checkConnection() {
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 1;
		states[Connection.ETHERNET] = 2;
		states[Connection.WIFI] = 3;
		states[Connection.CELL_2G] = 4;
		states[Connection.CELL_3G] = 5;
		states[Connection.CELL_4G] = 6;
		states[Connection.NONE] = 0;

		if (states[networkState] == 0) {
			$('#cont')
					.html(
							'<h1> No Access to Internet </h1><p>A Working connection is needed...</p><button id="checkCon"> Try Connecting Again </button>');
		} else {
			startApp();
		}
	}
}// init ends

function startApp() {
	$.ajax({
		type : "GET",
		url : 'http://www.celestia12.in/feed.php',//'http://amsentropy.comxa.com/celestia/feed.php',
		dataType : "xml",
		success : function(xmlcontent) {
			var listhtml = "";
			var pagehtml = "";
			$(xmlcontent).find("item").each(
					function() {
						listhtml += "<div data-role='collapsible' ><h3>"
								+ $(this).find('title').text() + "</h3><p>"
								+ $(this).find('description').text()
								+ "</p></div>";
						count += 1;
						//		pagehtml += "<div data-role='page' id='" + $(this).find('title').text().replace(/\s+/g, '') + "'><div data-role='header' data-theme='a'><h1>"+ $(this).find('title').text() +"</h1></div><div data-role='content' data-theme='a'><h2>"+ $(this).find('title').text() +"</h2><p>"+ $(this).find('description').text() +"</p></div><!-- /content --><div data-role='footer'><h4>&copy Fix_ Corporation</h4></div><!-- /footer --></div><!-- /page popup -->";
						//       var page = $(this).find('title').text().replace(/\s+/g, '');
						//       $('#'+page).page();
					});
			$('#cont').html(listhtml);
			$('#cont').trigger('create');

		}
	});

	setInterval("trigger()", 10000);
}// startApp ends here

function trigger() {
	var markup = $.parseXML('');
	$
			.ajax({
				type : "GET",
				url : "http://www.celestia12.in/feed.php",//'http://amsentropy.comxa.com/celestia/feed.php',
				dataType : "text",
				success : function(xmlcontent) {
					var currentcount = 0;
					$(xmlcontent).find("item").each(function() {
						currentcount += 1;

					});
					$('#result').html(
							'<p>updates found: ' + (currentcount - count)
									+ '</p>');
					//temp = "";					
					//for (i in $(xmlcontent).find('item')[0].children[0]) {
					//	temp += "<br>" + i;
					//}
					//notifier(temp);
					//xmlc = $.parseXML(xmlcontent);
					//notifier($(xmlcontent).find('item')[0].children[0].innerText);	
					if (currentcount > count) {
						var num = currentcount - count;
						for ( var i = 0; i < num; i++) {
							var notification = $(xmlcontent).find('item')[i].children[0].innerText;
							notifier(notification);
						}
					}
				}

			});
	function notifier(notification) {
		$('#result').append(notification);
		navigator.notification.alert(notification, // message
		init, // callback
		'Event Update', // title
		'OK' // buttonName
		);
	}
}

function dir(object) {
	stuff = [];
	for (s in object) {
		stuff.push(s);
	}
	stuff.sort();
	return stuff;
}
