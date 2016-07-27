var lodash = require('lodash');
var ejs = require('ejs');
var fs = require('fs');
var templateString, compileOpts, rawData, cookedData;


function lightThisCandle(templatePath, dataPath, options) {
    fs.readFile(templatePath, 'utf8', function(err, data) {
        if(err) {
            console.log(err); return;
        }
        templateString = data;
        fs.readFile(rawData, 'utf8', function(err, data) {
            if(err) {
                console.log(err); return;
            }
debugger;
            cookedData =  err || JSON.parse(data);
            var context = {
              _ : lodash,
              options: cookedData
            };
            /*var context = {}
              capitalize: lodash.capitalize,
              foEach: lodash.forEach,
              find: lodash.find
            };
            */
            // lodash.merge(cookedData, context);
            // cookedData.capitalize = lodash.capitalize;
            // cookedData._ = lodash;
            var thePage = ejs.render(templateString, context, options);
            fs.writeFile('output.html', thePage, function(err) {
                if(err) throw err;
                console.log('Finished writing: \n===========================\n' + thePage);
            })
        });
    });
}

templateString = process.argv[2];
rawData = process.argv[3];
options = {
  context: {
    capitalize: lodash.capitalize,
    foEach: lodash.forEach,
    find: lodash.find
  }
};

lightThisCandle(templateString, rawData, options);
