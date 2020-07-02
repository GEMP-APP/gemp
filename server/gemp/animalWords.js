var wordList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
  "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant",
  "Anteater", "Antelope", "Ape", "Armadillo", "Donkey",
  "Baboon", "Badger", "Barracuda", "Bat", "Bear",
  "Beaver", "Bee", "Bison", "Boar", "Buffalo",
  "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary",
  "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah",
  "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam",
  "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote",
  "Crab", "Crane", "Crocodile", "Crow", "Curlew",
  "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin",
  "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong",
  "Dunlin", "Eagle", "Echidna", "Eel", "Eland",
  "Elephant", "Elk", "Emu", "Falcon", "Ferret",
  "Finch", "Fish", "Flamingo", "Fly", "Fox",
  "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe",
  "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish",
  "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse",
  "Guanaco", "Gull", "Hamster", "Hare", "Hawk",
  "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet",
  "Horse", "Human", "Hummingbird", "Hyena", "Ibex",
  "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish",
  "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey",
  "Kudu", "Lapwing", "Lark", "Lemur", "Leopard",
  "Lion", "Llama", "Lobster", "Locust", "Loris",
  "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee",
  "Mandrill", "Mantis", "Marten", "Meerkat", "Mink",
  "Mole", "Mongoose", "Monkey", "Moose", "Mosquito",
  "Mouse", "Mule", "Narwhal", "Newt", "Nightingale",
  "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich",
  "Otter", "Owl", "Oyster", "Panther", "Parrot",
  "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant",
  "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise",
  "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon",
  "Rail", "Ram", "Rat", "Raven", "Red deer",
  "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander",
  "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion",
  "Seahorse", "Seal", "Shark", "Sheep", "Shrew",
  "Skunk", "Snail", "Snake", "Sparrow", "Spider",
  "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray",
  "Stinkbug", "Stork", "Swallow", "Swan", "Tapir",
  "Tarsier", "Termite", "Tiger", "Toad", "Trout",
  "Turkey", "Turtle", "Viper", "Vulture", "Wallaby",
  "Walrus", "Wasp", "Weasel", "Whale", "Wildcat",
  "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker",
  "Worm", "Wren", "Yak", "Zebra"
];


function words(options) {

  function word() {
    if (options && options.maxLength > 1) {
      return generateWordWithMaxLength();
    } else {
      return generateRandomWord();
    }
  }

  function generateWordWithMaxLength() {
    var rightSize = false;
    var wordUsed;
    while (!rightSize) {  
      wordUsed = generateRandomWord();
      if(wordUsed.length <= options.maxLength) {
        rightSize = true;
      }

    }
    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof(options) === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  
  // not a number = one word par string
  if (typeof(options.wordsPerString) !== 'number') {
    options.wordsPerString = 1;
  }

  //not a function = returns the raw word
  if (typeof(options.formatter) !== 'function') {
    options.formatter = (word) => word;
  }

  //not a string = separator is a space
  if (typeof(options.separator) !== 'string') {
    options.separator = ' ';
  }

  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  var token = '';
  var relativeIndex = 0;

  for (var i = 0; (i < total * options.wordsPerString); i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    }
    else {
      token += options.formatter(word(), relativeIndex) + options.separator;
    }
    relativeIndex++;
    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = ''; 
      relativeIndex = 0;
    }
   
  }
  if (typeof options.join === 'string') {
    results = results.join(options.join);
  }

  return results;
}

module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;