const textApiProvider = require('./providers/textApiProvider');

textApiProvider.getRandomText().then(text => {
  console.log(text);
}).catch(error => {
  console.error('An error occurred:', error);
});
