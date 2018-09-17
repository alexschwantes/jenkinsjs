jQuery( document ).ready(function() {
	var path = window.location.pathname;
	var pathParts = path.split("/");
	var jobPart = pathParts.lastIndexOf('job');

	var url = document.location.protocol + "//" + document.location.hostname; 
	for(var i=1; i<=jobPart+1; i++) {
		url += "/" + pathParts[i];
	}

	// if job is a multi/matrix job
	if(pathParts[jobPart+2].indexOf("=") > -1){
		url += "/" + pathParts[jobPart+2];
	}

	reg = new RegExp(/Screenshot: .*(\/screenshots.*)/g); 
	jQuery('pre:contains("Screenshot:")').each(function(){
		console.log("Found a screenshot");
		// if(jQuery(this).children().length <= 1) {
		var result;
		while((result = reg.exec(jQuery(this).html())) !== null) {
			// console.log(result[1]);
			jQuery(this).after('<img src="'+ url + '/artifact' + result[1]+'" style="border:solid 1px #bbb; float:left; margin:10px 10px 0 0">');
		}
		jQuery(this).css("border","solid 2px red");
		// }
	});
});
