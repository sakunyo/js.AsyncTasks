/**
 * Date: 13/06/27
 * Time: 13:11
 */


describe('just checking', function() {
    it("work on jQuery", function () {
        expect($.fn.jquery).toBe('1.4.2');
    });
});


describe('class AsyncTasks success', function(){
  it("1 function to success", function () {
    var async, flag = false, value = "";

    runs(function () {

      async = new AsyncTasks({
        success: function () {
          flag = true;  // Update jasmine waitsFor.
          value = "callback";
        }
      });

      async.runs(function () {
        setTimeout(function () {
          async.next(true); // Update AsyncTasks Status.
        }, 1000);
      }).start();

    });

    // Jasmine Wait...
    waitsFor(function () {
      return flag;
    }, 2000);

    // Expects Test Values.
    runs(function () {
      expect(value).toBe("callback");
    });
  });
});


describe('class AsyncTasks fail', function(){
  it("2 functions", function () {
    var async, flag = false, value = "";

    runs(function () {

      async = new AsyncTasks({
        success: function () {
          flag = true;  // Update jasmine waitsFor.
          console.log("success");
          value = "success";
        },
        fail: function () {
          flag = true;
          console.log("fail");
          value = "fail";
        }
      });

      async.runs(function () {
        setTimeout(function () {
          async.next(true); // Update AsyncTasks Status.
        }, 1000);
      },function () {
        setTimeout(function () {
          async.next(false); // Update AsyncTasks Status.
        }, 1500);
      }).start();

    });

    // Jasmine Wait...
    waitsFor(function () {
      return flag;
    }, 2000);

    // Expects Test Values.
    runs(function () {
      expect(value).toBe("fail");
    });
  });
});


describe('fetch 2files', function(){
  it("2 function to success", function () {
    var async, flag = false, value = "";

    runs(function () {

      async = new AsyncTasks({
        success: function () {
          flag = true;  // Update jasmine waitsFor.
        }
      });

      async.runs(function () {
        $.ajax({
          type: "GET",
          cache: false,
          url: "/base/data/fetch_1.txt",
          success: function (context) {
            value += context;
            async.next(true); // Update AsyncTasks Status.
          }
        });
      },function () {
        $.ajax({
          type: "GET",
          cache: false,
          url: "/base/data/fetch_2.txt",
          success: function (context) {
            value += context;
            async.next(true); // Update AsyncTasks Status.
          }
        });
      }).start();

    });

    // Jasmine Wait...
    waitsFor(function () {
      return flag;
    }, 500);

    // Expects Test Values.
    runs(function () {
      expect(/(success:[1-2]){2}/.test(value)).toBe(true);
    });
  });
});

