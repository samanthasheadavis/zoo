// -- Animal prototype -- //

Animal.prototype = {
    // birthday is a function that takes in the date of birth of the animal instance, parses it and returns age in years.
    buildMe: function() {

        //1. Create variables for page elements
        var armadilloIcon = document.getElementById('armadillo');
        var badgerIcon = document.getElementById('badger');
        var blobFishIcon = document.getElementById('blobfish');
        var owlIcon = document.getElementById('owl');

        // variables for info
        var badgerInfo = document.getElementById('badgerInfo');
        var armadilloInfo = document.getElementById('armadilloInfo');
        var blobfishInfo = document.getElementById('blobfishInfo');
        var owlInfo = document.getElementById('owlInfo');


        //2. Set regions equal to page elements.
        this.regions.armadillo = armadilloIcon;
        this.regions.badger = badgerIcon;
        this.regions.blobfish = blobFishIcon;
        this.regions.owl = owlIcon;

    },


    getAge: function(birthday) {
        // 1. Parse string of day month and year into js date.
        var parseBday = Date.parse(this.birthday);
        //2. get milliseconds elapsed between today and birthday and calculate years elapsed
        var today = new Date();
        var parseToday = today.getTime();

        var age = Math.round((parseToday - parseBday) / 31536000000); // number of milliseconds in a year;
        return age + " years old";
    },

    // vertebrateClass is a function to initialize other reproductive functions based upon vertebrate class of animal instance.
    vertebrateClass: function(vertebrate) {
        if (this.vertebrate === 'mammal') {
            return this.giveBirth();
        } else if (this.vertebrate === 'fish') {
            return this.spawn();
        } else if (this.vertebrate === 'bird') {
            return this.lay();
        }
    },

    // Try-Catch statements to make sure animal species have correct info
    buildCheck: function() {
        try {
            if (typeof this.birthday !== "string") throw "Looks like birthday is not a string. Please enter birthday in 'dd month yyyy' format";
        } catch (error) {
            console.log(error);
        }
        try {
            if (this.name === '' || this.birthday === '' || this.vertebrate === '') throw "Looks like you're missing some info. Please include a name, birthday and vertebrate class";
        } catch (error) {
            console.log(error);
        }
    },


    // init Function triggers buildCheck whenever a new species is built.
    init: function() {
        this.buildCheck();
        this.buildMe();


    }
};
// -- Animal Constructor -- //

function Animal(name, birthday, vertebrate) { // birthday must be put in 'dd month yyyy' format i.e. 21 July 1993
    this.name = name;
    this.birthday = birthday;
    this.vertebrate = vertebrate;
    this.regions = {
        // create regions in html document to display animal name, age and kids in buildMe function.
        armadillo: null,
        badger: null,
        blobfish: null,
        owl: null,

    };


    // giveBirth is a function that produces a random number of children (between 1 and 10) with randomly assigned sexes.
    this.giveBirth = function() {
        //1. Generate random number for number of children
        var numChildren = Math.floor(Math.random() * 10) + 1;
        // create empty child array
        var children = [];
        // generate random variable between 1 and 2 to pick sex
        // create a loop that loops numChildren number of times to create random number of children, assigning sex each time.
        for (count = 0; count < numChildren; count++) {
            var sexRand = (Math.random());
            if (sexRand < 0.5) {
                children.push('boy');
            } else if (sexRand >= 0.5) {
                children.push('girl');
            }
        }
        return "I have " + numChildren + " children: " + children;
    };
    //spawn is a function that is applied to the fish classes of animals. It creates a random number of eggs.
    this.spawn = function() {
        //1. create random number of eggs between 1 and 300
        var numEggs = Math.floor(Math.random() * 300) + 1;
        return "I have " + numEggs + " eggs";
    };

    //lay is a function that is applied to the bird classes of animals. It creates a random number of eggs.
    this.lay = function() {
        //1. create random number of eggs between 1 and 12
        var numEggs = Math.floor(Math.random() * 12) + 1;
        return "I have " + numEggs + " eggs";
    };

    // ToString Method
    Animal.prototype.toString = function animalToString() {
        var animalToString = "Hi my name is " + this.name + ", I'm " + this.getAge() + " and " + this.vertebrateClass() + ". ";
        return animalToString;
    };

    // Animation Methods
    this.animateArmadillo = function() {
        this.regions.armadillo.addEventListener('click', this.roll.bind(this));
    };

    this.animateBadger = function() {
        this.regions.badger.addEventListener('click', this.rassle.bind(this));
    };

    this.animateBlobfish = function() {
        this.regions.blobfish.addEventListener('click', this.squidge.bind(this));
    };
    this.animateOwl = function() {
        this.regions.owl.addEventListener('click', this.hop.bind(this));
    };


    this.roll = function() {
        this.regions.armadillo.className += 'roll';
        this.regions.armadillo.addEventListener('animationend', this.revert.bind(this));
    };

    this.rassle = function() {
        this.regions.badger.className += 'rassle';
        this.regions.badger.addEventListener('animationend', this.revert.bind(this));

    };

    this.squidge = function() {
        this.regions.blobfish.className += 'squidge';
        this.regions.blobfish.addEventListener('animationend', this.revert.bind(this));

    };

    this.hop = function() {
        this.regions.owl.className += 'hop';
        this.regions.owl.addEventListener('animationend', this.revert.bind(this));

    };
    this.revert = function() {
        this.regions.armadillo.className = '';
        this.regions.badger.className = '';
        this.regions.blobfish.className = '';
        this.regions.owl.className = '';
    };
}

// -- Animal Instances with JSON Jquery-- //

var promise = $.get('data/animals.json');

promise.then(function(armadilloJson) {
  var armadillo = new Animal(armadilloJson.animals[0].name, armadilloJson.animals[0].birthday, armadilloJson.animals[0].vertebrate);
  armadillo.init();
  armadilloInfo.innerHTML = "<span>Armadillo</span>" + '<br><br>' + armadillo.toString();
  armadillo.animateArmadillo();
  armadillo.roll();
  return promise;
}).then(function(blobfishJson) {
  var blobfish = new Animal(blobfishJson.animals[1].name, blobfishJson.animals[1].birthday, blobfishJson.animals[1].vertebrate);
  blobfish.init();
  blobfishInfo.innerHTML = "<span>Blobfish</span>" + '<br><br>' + blobfish.toString();
  blobfish.animateBlobfish();
  blobfish.squidge();
  return promise;
}).then(function(owlJson) {
  var pygmyOwl = new Animal(owlJson.animals[2].name, owlJson.animals[2].birthday, owlJson.animals[2].vertebrate);
  pygmyOwl.init();
  owlInfo.innerHTML = "<span>pygmy Owl</span>" + '<br><br>' + pygmyOwl.toString();
  pygmyOwl.animateOwl();
  pygmyOwl.hop();
  return promise;
}).then(function(badgerJson) {
  var honeyBadger = new Animal(badgerJson.animals[3].name, badgerJson.animals[3].birthday, badgerJson.animals[3].vertebrate);
  honeyBadger.init();
  badgerInfo.innerHTML = "<span>Honey Badger</span>" + '<br><br>' + honeyBadger.toString();
  honeyBadger.animateBadger();
  honeyBadger.rassle();
}).catch(function(error){
  console.log(error);
});
