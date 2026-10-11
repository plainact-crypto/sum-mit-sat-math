const fs=require('fs');const path=require('path');
fs.mkdirSync(path.join(__dirname,'dist'),{recursive:true});
fs.copyFileSync(path.join(__dirname,'sample-statistics-lesson212-test.js'),path.join(__dirname,'dist','sample-statistics-lesson212-test.js'));
