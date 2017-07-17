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
      return {
        info: function(msg){
          var log =  getTime() + " [INFO] " + name + ': '+ msg;
          console.log(log);
        },
        error: function(msg){
          var log =  getTime() + " [ERROR] " + name + ': '+ msg;
          console.error(log);
        }
      };
    }
};

var getTime = function(){
  var d = new Date();
  return d.getHours() + ":"+d.getMinutes()+  ":"+ d.getSeconds();
};
