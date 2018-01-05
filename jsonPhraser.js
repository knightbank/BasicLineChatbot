let jsonParser = jsonString => {
    let string = JSON.stringify(jsonString);
    let objectValue = JSON.parse(string);
    //return objectValue;
    console.log(objectValue);
}

jsonParser("{name: 'bank'}")