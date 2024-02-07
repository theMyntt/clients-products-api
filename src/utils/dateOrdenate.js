function dateOrdenate(data) {
  let newArr = [];
  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].createdAt);
    const dateTime = date.getTime();
    let arrayPosition = 0;
    for (let i2 = 0; i2 < data.length; i2++) {
      let iDate = new Date(data[i2].createdAt);
      let iDateTime = iDate.getTime();
      if (dateTime > iDateTime) {
        arrayPosition++;
      }
    }
    newArr[arrayPosition] = data[i];
  }
  return newArr;
}

module.exports = dateOrdenate;
