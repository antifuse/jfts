# jfts
![](https://img.shields.io/npm/l/jfts) ![](https://img.shields.io/npm/v/jfts)
## What it is
As writing rules for the much-used online Turing Machine Simulator can be tedious, this small package parses JFLAP XML and converts it into a plain text file, ready to be pasted onto the website.

## How to use
This package includes the binary **jfts**. You pass a JFLAP file to it as an argument, and a text file of the same name is saved in your working directory.

## How not to use
**Do not** pass multi-tape JFLAP automata as arguments - it will most likely fail, as those are not yet fully implemented. Also **do not** pass no arguments at all or a file not compliant with XML standards - this script is a "quick and dirty" one and outputs errors directly to stderr.