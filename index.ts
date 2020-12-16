#!/usr/bin/env node
import * as xml2js from "xml2js";
import {writeFileSync, readFile} from "fs";
const parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
readFile("./"+ process.argv[2], {encoding: "utf8"},(error,content)=>{
    parser.parseStringPromise(content).then((val)=>{writeFileSync("./"+process.argv[2].split(".")[0]+".txt", structureToScript(val)); console.log("Script saved in " + process.argv[2].split(".")[0]+".txt")})
})

function structureToScript(input: any) {
    let states: any[] = input.structure.automaton.state;
    let transitions: any[] = input.structure.automaton.transition;
    let rules: any[] = [];
    transitions = transitions.map((transition)=>({from: (states.find(s=>s.id == transition.from).name), to: (states.find(s=>s.id == transition.to).name), read: transition.read == "" ? "_" : transition.read, write: transition.write == "" ? "_" : transition.write, move: transition.move == "R" ? ">" : (transition.move == "L" ? "<" : "-")}));
    transitions.forEach((transition)=>{rules.push(`${transition.from},${transition.read}\n${transition.to},${transition.write},${transition.move}\n`)});
    let init = states.find(state=>state.initial == "").name;
    let accept = states.filter(state=>state.final == "").map(state=>state.name);
    let name = process.argv[2].split(".")[0];
    return `name: ${name}\ninit: ${init}\naccept: ${accept.join(",")}\n\n${rules.join("\n")}`;
}