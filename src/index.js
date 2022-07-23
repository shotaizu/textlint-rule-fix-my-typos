
"use strict"

const fs = require("fs");

const defaultOptions = {
    dictionary_dir: "./dict"
};

function initDict(dic_dir){
    if (typeof dic_dir === "undefined"){
        dic_dir = "./";
    }
    //console.log(dic_dir + "/dict.dic");
    var dict = [];
    var file;
    try {
        file = fs.readFileSync(dic_dir + '/mytypos.dic');
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        /* Do not show any log ? I am not sure to handle such error logs
        console.log("File not found:" + dic_dir + "/okurigana.dic");
        */
        return dict;
    }
    for (var line of file.toString().split('\n')){
        if( line.charAt(0) === '#') continue;
        const arr = line.split(' ');
        if(arr[0] === '') continue;
        dict.push(arr);
    }

    return dict;
};

export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    const dictionaryDir = typeof options.dictionary_dir === "undefined" ? defaultOptions.dictionary_dir : options.dictionary_dir;
    const dict = initDict(dictionaryDir);
    return {
        [Syntax.Str](node){ // "Str" node
            const text = getSource(node); // Get text
            for( var tgt of dict) {
                const str = tgt[0];
                const matches = RegExp(str).exec(text);
                if(!matches)  continue;
                const ruleError = new RuleError("Found candidate of typo: \"" + str + "\". -> \"" + tgt[1] + "\"?", { index:  matches.index }
                );

                report(node,ruleError);

            }
        }
    }
};
