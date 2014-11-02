function get_query_params(url) {
  var search = (new URL(url)).search;
  if (!search) {
    return {};
  }
  var ret = {};
  var params = search.substring(1).split('&');
  params.forEach(function(param) {
      var element = param.split('=');
      ret[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
    });
  return ret;
}

function get_request_init(params) {
  var init = {};
  if (params['method']) {
    init['method'] = params['method'];
  }
  if (params['mode']) {
    init['mode'] = params['mode'];
  }
  if (params['credentials']) {
    init['credentials'] = params['credentials'];
  }
  return init;
}

self.addEventListener('fetch', function(event) {
    var params = get_query_params(event.request.url);
    var init = get_request_init(params);
    var url = params['url'];
    if (params['ignore']) {
      return;
    }
    if (params['reject']) {
      event.respondWith(new Promise(function(resolve, reject) {
          reject();
        }));
      return;
    }
    if (params['resolve-null']) {
      event.respondWith(new Promise(function(resolve) {
          resolve(null);
        }));
      return;
    }
    event.respondWith(new Promise(function(resolve, reject) {
        var request = event.request;
        if (url) {
          request = new Request(url, init);
        }
        fetch(request).then(resolve, reject);
      }));
  });
