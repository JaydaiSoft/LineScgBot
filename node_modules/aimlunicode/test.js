AIMLUnicode = require('./AIMLUnicode');

var AIMLUnicode = new AIMLUnicode({ name: 'AIMLUnicode', age: '21' });
AIMLUnicode.loadAIMlFile(['./test.aiml.xml']);

var callback = function (answer, wildCardArray, input) {
  console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};

var caseCallback = function (answer, wildCardArray, input) {
  if (answer == this) {
    console.log(answer + ' | ' + wildCardArray + ' | ' + input);
  } else {
    console.log('ERROR:', answer);
    console.log('   Expected:', this.toString());
  }
};

// Test bot attributes
AIMLUnicode.findAnswer('What is your name?', callback);

// Test setting and getting variable values
AIMLUnicode.findAnswer('My name is Ben.', callback);
AIMLUnicode.findAnswer('What is my name?', callback);

// Test srai tag
AIMLUnicode.findAnswer('Who are you?', callback);

// Test random tag
AIMLUnicode.findAnswer('Give me a letter.', callback);
AIMLUnicode.findAnswer('Test srai in random.', callback);
AIMLUnicode.findAnswer('Test wildcard What is my name?', callback);
AIMLUnicode.findAnswer('Test multiple beautiful wildcards you are', callback);

// Test sr tag
AIMLUnicode.findAnswer('Test sr tag What is my name?', callback);
AIMLUnicode.findAnswer('Test sr in random What is my name?', callback);

// Test star tag
AIMLUnicode.findAnswer('Test the star tag repeat what I said', callback);

// Test that tag
AIMLUnicode.findAnswer('Test the that tag', callback)
AIMLUnicode.findAnswer('Test that-tag. match', callback);
AIMLUnicode.findAnswer('Test that-tag. dont match', callback);

// Test condition tag
AIMLUnicode.findAnswer('What is your feeling today?', callback);
AIMLUnicode.findAnswer('How are you feeling today?', callback);
AIMLUnicode.findAnswer('Tell me about your feelings', callback);
AIMLUnicode.findAnswer("You feel crumpy", callback);
AIMLUnicode.findAnswer('What is your feeling today?', callback);
AIMLUnicode.findAnswer("You feel happy", callback);
AIMLUnicode.findAnswer('How are you feeling today?', callback);
AIMLUnicode.findAnswer('What is your feeling today?', callback);
AIMLUnicode.findAnswer('Tell me about your feelings', callback);
AIMLUnicode.findAnswer("You feel sad", callback);
AIMLUnicode.findAnswer('How are you feeling today?', callback);
AIMLUnicode.findAnswer('What is your feeling today?', callback);
AIMLUnicode.findAnswer('Tell me about your feelings', callback);

// Test wildcards
AIMLUnicode.findAnswer('Explain HANA', callback);

//Test Think tag
AIMLUnicode.findAnswer('I am 123', callback);
AIMLUnicode.findAnswer('How old am I?', callback);
AIMLUnicode.findAnswer('What do you know about me?', callback);

//Test condition and srai
AIMLUnicode.findAnswer('Test condition and srai', callback);
AIMLUnicode.findAnswer("You feel happy", callback);
AIMLUnicode.findAnswer('Test condition and srai', callback);
AIMLUnicode.findAnswer("You feel crumpy", callback);
AIMLUnicode.findAnswer('Test condition and srai', callback);

// Test finding nothing
AIMLUnicode.findAnswer('Test the wildcard pattern!', callback);

//Case insensitive testing
AIMLUnicode.findAnswer('You feel BAD', caseCallback.bind('I feel BAD!'));
AIMLUnicode.findAnswer('You feel good', caseCallback.bind('I feel good!'));
AIMLUnicode.findAnswer('You feel hAPPy', caseCallback.bind('I feel HAPPY!')); // INTENTIONAL ERROR CHECKING
AIMLUnicode.findAnswer('You feel FINEeeeee', caseCallback.bind('I feel FINEEEEEE!')); // INTENTIONAL ERROR CHECKING