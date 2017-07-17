//Sample of winston implementation
/*var winston = require('winston');
module.exports = {
    create: function(name) {
      return new (winston.Logger)({
        transports: [
          new (winston.transports.Console)({
            formatter: function(options) {
              return getTime() + " ["+options.level.toUpperCase() +'] ' + name + ': '+ options.message;
            }
          })
        ]
      });
    }
};*/


module.exports = {

    create: function(name) {
      var log = function(msg, level) {
          return getTime() + " ["+level+"] " + name + ': '+ msg;
      }
      return {
        debug: function(msg){
          console.log(log(msg, "DEBUG"));
        },
        info: function(msg){
          console.log(log(msg, "INFO"));
        },
        error: function(msg){
          console.error(log(msg, "ERROR"));
        }
      };
    }
};

var getTime = function(){
  var d = new Date();
  return d.getHours() + ":"+d.getMinutes()+  ":"+ d.getSeconds();
};
