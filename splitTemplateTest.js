var lodash = require('lodash');
var ejs = require('ejs');
var fs = require('fs');
var templateString, compileOpts, rawData, cookedData, outputPath;


function lightThisCandle(templatePath, dataPath, options, outPath) {
  if(outPath) console.log(outPath);
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

            var splitData = lodash.reduce(cookedData.groupedRecords, function(acc, n) {
              var dataToDice = lodash.cloneDeep(cookedData);
              var retVal = lodash.omit(dataToDice, ['groupRecords', 'groupedRecords']);
              retVal.groupRecords = lodash.filter(cookedData.groupRecords, {'group': n.group});
              retVal.groupedRecords = lodash.filter(cookedData.groupedRecords, {'id': n.group});
              acc.push(retVal);
              return acc;
            },[]);

            lodash.forEach(splitData, function(n, key) {
              var context = {
                _ : lodash,
                options: n
              }
              var thePage = ejs.render(templateString, context, options);
              fs.writeFile(outPath ? outPath + '/' +key + 'output.html': '/split'+key+'/'+key+'output.html', thePage, function(err) {
                if(err) throw err;
                console.log('Finished writing split page: '+ key + '\n');
              });
            })
            /*var thePage = ejs.render(templateString, context, options);
            fs.writeFile('output.html', thePage, function(err) {
                if(err) throw err;
                console.log('Finished writing: \n===========================\n' + thePage);
            })*/
        });
    });
}

templateString = process.argv[2];
rawData = process.argv[3];
outputPath = process.argv[4]
options = {
  context: {
    capitalize: lodash.capitalize,
    foEach: lodash.forEach,
    find: lodash.find
  }
};

lightThisCandle(templateString, rawData, options, outputPath);
