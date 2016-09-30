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
            this.giveBirth();
            return "I'm a mammal";
        } else if (this.vertebrate === 'fish') {
            this.spawn();
            return "I'm a fish";
        } else if (this.vertebrate === 'bird') {
            this.lay();
            return "I'm a bird";
        }
    },

    // Try-Catch statements to make sure animal species have correct info
    buildCheck: function() {
        try {
            if (typeof this.birthday !== "string") throw "Looks like birthday is not a string. Please enter birthday in 'dd month yyyy' format";
        } catch (error) {
            console.log(error);
            // console.log(typeof emu.birthday);
        }
        try {
            if (this.name === '' || this.birthday === '' || this.vertebrate === '') throw "Looks like you're missing some info. Please include a name, birthday and vertebrate class";
        } catch (error) {
            console.log(error);
        }
    },

    buildMe: function() {
  //    $('container').addClass('animal');
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
        return "I produced " + numEggs + " eggs.";
    };

    //lay is a function that is applied to the bird classes of animals. It creates a random number of eggs.
    this.lay = function() {
        //1. create random number of eggs between 1 and 12
        var numEggs = Math.floor(Math.random() * 12) + 1;
        return "I produced " + numEggs + " eggs.";
    };

    // ToString Method
    Animal.prototype.toString = function animalToString() {
        var animalToString = "Hi my name is " + this.name + ", I'm " + this.getAge() + " and " + this.vertebrateClass() + ". ";
        return animalToString;
    };
}

// -- Animal Instances -- //

var emu = new Animal('Earl', '21 July 1993', 'mammal');
emu.init();
// console.log("Hi my name is " + emu.name + ", I'm " + emu.getAge() + " and " + emu.vertebrateClass() + ". " + emu.giveBirth());
// console.log(emu.toString());

var blobfish = new Animal('Gertrude', '13 May 2001', 'fish');
blobfish.init();
// console.log("Hi my name is " + blobfish.name + ", I'm " + blobfish.getAge() + " and " + blobfish.vertebrateClass() + ". " + blobfish.spawn());
// console.log(blobfish.toString());

var pygmyOwl = new Animal('Jim', '8 January 2011', 'bird');
pygmyOwl.init();
// console.log("Hi my name is " + pygmyOwl.name + ", I'm " + pygmyOwl.getAge() + " and " + pygmyOwl.vertebrateClass() + ". " + pygmyOwl.lay());
// console.log(pygmyOwl.toString());

var honeyBadger = new Animal('Bertha', '19 September 1980', 'mammal');
honeyBadger.init();
// console.log("Hi my name is " + honeyBadger.name + ", I'm " + honeyBadger.getAge() + " and " + honeyBadger.vertebrateClass() + ". " + honeyBadger.giveBirth());
// console.log(honeyBadger.toString());
