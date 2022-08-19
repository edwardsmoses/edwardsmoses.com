---
template: BlogPost
path: /converting-arrays-in-an-object-to-objects
date: 2022-08-19T21:30:14.312Z
title: Convert Arrays in an Object to an Object in Javascript
thumbnail: /assets/cover_image.png
---
I was working with an object in Javascript, and I needed to convert all arrays in the object to an object itself no matter the level the Array was present in the object. Here's what I came up with:

```
const convertArrayInObject = (obj) => {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
      if(Array.isArray(value)){
          const convertedTOOBject = value.reduce((obj, cur, index) => ({...obj, [index]: cur}), {});
          console.log(convertedTOOBject);
          return convertedTOOBject;
      }
      return value;
  }));
};
```

The above code snippet takes advantage of the `replace` callback parameter in the JSON.stringify function (here's [an article](https://dillionmegida.com/p/second-argument-in-json-stringify/) that explains it). 

It checks for every value in the object, if it's an array, and then converts to an object using the index as the key. 

Pretty simple - and with the above, we get: 

```
// input
// {
//   "name": "Edwards",
//   "links": ["https://edwardsmoses.com", "https://google.com"],
//   "age": 23
// }

// output 
// {
//     "name": "Edwards",
//     "links": {
//         "0": "https://edwardsmoses.com",
//         "1": "https://google.com"
//     },
//     "age": 23
// }
```