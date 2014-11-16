# DeltaE - Fun With Color Difference Formulas!

This repository will be updated with more information (and a demo!)
once a tutorial goes live on Smashing Magazine.

## About Delta E

tl;dr - an organization created a way to quantify difference in CIELAB color space. And now you too can quantify color... in JavaScript!

More: http://en.wikipedia.org/wiki/Color_difference

## Get Started
Install via npm

    npm install --save delta-e
    
### Use It
A quick and dirty guide to using each of the three formulas:

    // Include library
    var DeltaE = require('delta-e');
    
    // Let's create two test LAB color objects to compare!
    var color1 = {L: 36, A: 60, B: 41};
    var color2 = {L: 100, A: 40, B: 90};
    
    // 1976 formula
    console.log(DeltaE.getDeltaE76(color1, color2));
    
    // 1994 formula
    console.log(DeltaE.getDeltaE94(color1, color2));
    
    // 2000 formula
    console.log(DeltaE.getDeltaE00(color1, color2));


### ... But What Does it Mean? And Why Do I Care?

Wait for the Smashing Magazine to publish, pardner.

## Licensing

This is Unlicensed. Do what you want. Just don't sue me, and we is cool.

> This is free and unencumbered software released into the public domain.
>
> Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.
>
> In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
>
> For more information, please refer to <http://unlicense.org>


