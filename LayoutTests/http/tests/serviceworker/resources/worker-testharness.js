/*
 * worker-test-harness should be considered a temporary polyfill around
 * testharness.js for supporting Service Worker based tests. It should not be
 * necessary once the test harness is able to drive worker based tests natively.
 * See https://github.com/w3c/testharness.js/pull/82 for status of effort to
 * update upstream testharness.js. Once the upstreaming is complete, tests that
 * reference worker-test-harness should be updated to directly import
 * testharness.js.
 */

// The following are necessary to appease attempts by testharness to access the
// DOM.
self.document = {getElementsByTagName: function() { return []; }};
self.window = self;
self.parent = self;

// An onload event handler is used to indicate to the testharness that the
// document has finished loading. At this point the test suite would be
// considered complete if there are no more pending tests and the test isn't
// marked as requring an explicit done() call.
//
// Since ServiceWorkers don't have an onload event, we monkey-patch
// addEventListener to rewire the event to be fired at oninstall which is
// functionally equivalent to onload.
(function() {
  var previous_addEventListener = self.addEventListener;
  self.addEventListener = function() {
    if (arguments.length > 0 && arguments[0] == 'load') {
      arguments[0] = 'install';
    }
    previous_addEventListener.apply(this, arguments);
  };
})();

importScripts('/resources/testharness.js');

(function() {
  // This prevents the worker from attempting to display test results using the
  // DOM.
  setup({output: false});

  // Once the test are considered complete, this logic packages up all the
  // results into a promise resolution so that it can be passed back to the
  // client document when it connects.
  var completion_promise = new Promise(function(resolve, reject) {
      add_completion_callback(function(tests, harness_status) {
          var results = {
            tests: tests.map(function(test) {
                return test.structured_clone();
              }),
            status: harness_status.structured_clone()
          };
          resolve(results);
        });
    });

  // The 'fetch_results' message is sent by the client document to signal that
  // it is now ready to receive test results. It also includes a MessagePort
  // which the worker should use to communicate.
  self.addEventListener('message', function(ev) {
      var message = ev.data;
      if (message.type == 'fetch_results') {
        var port = ev.ports[0];
        completion_promise.then(function(results) {
            var message = {
              type: 'complete',
              tests: results.tests,
              status: results.status
            };
            port.postMessage(message);
          });
      }
    });
})();

(function() {
  var next_cache_index = 1;

  // Returns a promise that resolves to a newly created Cache object. The
  // returned Cache will be destroyed when |test| completes.
  function create_temporary_cache(test) {
    var uniquifier = String(++next_cache_index);
    var cache_name = self.location.pathname + '/' + uniquifier;

    test.add_cleanup(function() {
        self.caches.delete(cache_name);
      });

    return self.caches.delete(cache_name)
      .then(function() {
          return self.caches.open(cache_name);
        });
  }

  self.create_temporary_cache = create_temporary_cache;
})();

// Runs |test_function| with a temporary unique Cache passed in as the only
// argument. The function is run as a part of Promise chain owned by
// promise_test(). As such, it is expected to behave in a manner identical (with
// the exception of the argument) to a function passed into promise_test().
//
// E.g.:
//    cache_test(function(cache) {
//      // Do something with |cache|, which is a Cache object.
//    }, "Some Cache test");
function cache_test(test_function, description) {
  promise_test(function(test) {
    return create_temporary_cache(test)
        .then(test_function);
  }, description);
}
