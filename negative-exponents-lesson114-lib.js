'use strict';
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist','advanced-math','exponents','negative-exponents');
const load=name=>require('./negative-exponents-lesson114-'+name+'.json');
const P=['practice-a','practice-b','practice-c','practice-d','practice-e','practice-f'].flatMap(load);
const T=load('test'),E=[...load('explanation-a'),...load('explanation-b')];
module.exports={fs,path,root,load,P,T,E};
