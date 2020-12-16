#!/usr/bin/env node
import * as xml2js from "xml2js";
import {writeFileSync, readFile} from "fs";
const parser = new xml2js.Parser();
readFile("./"+ process.argv[2], {encoding: "utf8"},(error,content)=>{
    parser.parseStringPromise(content).then((val)=>{writeFileSync("./"+process.argv[2].split(".")[0]+".txt", structureToScript(val)); console.log("Script saved in " + process.argv[2].split(".")[0]+".txt")})
})

function structureToScript(input: any) {
    let transitions: any[] = input.structure.automaton[0].transition;
    let rules: any[] = [];
    transitions.forEach((transition:any)=>{rules.push(`q${transition.from[0]},${transition.read[0] == ""?"_":transition.read[0]}\nq${transition.to[0]},${transition.write[0]==""?"_":transition.write[0]},${transition.move[0]=="R"?">":(transition.move[0] == "L"? "<" : "-")}\n`)})
    return rules.join("\n");
}