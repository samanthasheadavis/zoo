// -- Animal prototype -- //

Animal.prototype = {
    // birthday is a function that takes in the date of birth of the animal instance, parses it and returns age in years.
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
    this.roll = function() {
      this.regions.armadillo.className += 'roll';
    };

    this.rassle = function() {
      this.regions.badger.className += 'rassle';
    };

    this.squidge = function() {
      this.regions.blobfish.className += 'squidge';
    };

    this.hop = function() {
      this.regions.owl.className += 'hop';
    };
}

// -- Animal Instances -- //

var armadillo = new Animal('Earl', '21 July 1993', 'mammal');
armadillo.init();
armadilloInfo.innerHTML = "<span>Armadillo</span>" + '<br><br>' + armadillo.toString();
armadillo.roll();

var blobfish = new Animal('Gertrude', '13 May 2001', 'fish');
blobfish.init();
blobfishInfo.innerHTML = "<span>Blobfish</span>" + '<br><br>' + blobfish.toString();
blobfish.squidge();

var pygmyOwl = new Animal('Jim', '8 January 2011', 'bird');
pygmyOwl.init();
owlInfo.innerHTML = "<span>pygmy Owl</span>" + '<br><br>' + pygmyOwl.toString();
pygmyOwl.hop();

var honeyBadger = new Animal('Bertha', '19 September 1980', 'mammal');
honeyBadger.init();
badgerInfo.innerHTML = "<span>Honey Badger</span>" + '<br><br>' + honeyBadger.toString();
honeyBadger.rassle();
