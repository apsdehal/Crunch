muzi = muzi || {};

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
  var key;
  originalOptions.data = originalOptions.data || {};
  key = options.localStorageKey = options.url + '?' + $.param(originalOptions.data);
  //Some urls may actually be complete
  if(options.url.substr(0,4)!='http')
	options.url=muzi.config.ajaxRoot+options.url;
});