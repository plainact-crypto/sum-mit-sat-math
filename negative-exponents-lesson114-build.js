'use strict';
const fs=require('fs');
const path=require('path');
// Lesson 114 content generator: Negative Exponents.
const root=path.join(__dirname,'dist','advanced-math','exponents','negative-exponents');
if(!fs.existsSync(root))throw new Error('Missing canonical lesson route');
