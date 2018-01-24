describe("About Higher Order Functions pt 2", function () {

  it("should use filter to select only array elements that meet a criteria", function () {
    // return a filer people over 40
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47},{name: "name", age: 35}];
    var peopleOverFourty = people.filter(function (x) { return x.age > 40 });

    expect(peopleOverFourty).toEqual([{name: "name", age: 41}, {name: "name", age: 47}]);
  });

  it("should use 'map' to transform every element in an array", function () {
    // return a list of everyone's name
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47}];
    var names = people.map(function(x) { return x.age });

    expect(names).toEqual([41, 22, 47]);
  });

  it("should use 'reduce' to transform elements in into a new value", function () {
    // sum these numbers
    var numbers = [1, 2, 3];
    var reduction = numbers.reduce(function(acc, n) { return acc + n }, 0);

    expect(reduction).toBe(6);
  });

  it("should make the band", function() {
    var bandMembers = [{name: "Donnie", dancing: 3, performing: 5}, {name: "Paschan" ,dancing: 1, performing: 9},  {name: "Celeste", dancing: 3, performing: 4},
      {name: "DeAngelo", dancing: 7, performing: 7, otherObligations: 'soloAspirations'}, {name: "Leslie" ,dancing: 6, performing: 8, otherObligations: 'is a student'},
      {name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
      {name: "Aundrea", dancing: 8, performing: 5}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9} ];

    // filter out band members who have dancing skill 3 or less
    var afterRoundOne = bandMembers.filter( m => m.dancing > 3);
    expect(afterRoundOne.length).toEqual(8);

    // Remove band members who have otherObligations (only filter members who have the 'otherObligations' property and have some value in that property )
    var afterRoundTwo = afterRoundOne.filter( m => !m.otherObligations || !m.otherObligations.length > 0 );
    expect(afterRoundTwo.length).toEqual(6);
  });

  it("should make the band 2", function() {
    var bandMembers = [{name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
                       {name: "Aundrea", dancing: 8, performing: 5, otherObligations: "Something"}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9}];
    // Transform the list of members left afterRoundTwo into a list of names and their strength
    // for example "Brian: dancr" or "Aubrey: performer"
    var names = bandMembers.map( m => `${m.name}: ${m.dancing > m.performing ? "dancer" : "performer"}`);

    expect(names).toEqual(["Brian: dancer", "Kristen: dancer", "Bethany: dancer", "Aundrea: dancer", "Aubrey: dancer", "Robert: performer"]);
    expect(names.length).toEqual(6);

    // Transform into a list of the length of each name
    var nameLengths = bandMembers.map( m => m.name.length );
    expect(nameLengths.length).toEqual(6);
    expect(nameLengths).toEqual([5, 7, 7, 7, 6, 6]);

    // Map over all of the band members and return a html string that contains each person's names, dancing skill, performing skill
    // For example the first element should be a string equal to this: "<div>Name: Donnie <br> Dancing: 3 <br> Performing: 5 </div>"
    var profiles = bandMembers.map( (m) => {
      var html = `<div>Name: ${m.name} <br> Dancing: ${m.dancing} <br> Performing: ${m.performing}`;
      if (m.otherObligations && m.otherObligations.length > 0) {
        html += "Other Obligations: " + m.otherObligations + "</div>";
      } else {
        html += "</div>";
      }
      return html;
    });
    expect(profiles.length).toEqual(6);
    expect(profiles[0]).toEqual(`<div>Name: ${bandMembers[0].name} <br> Dancing: ${bandMembers[0].dancing} <br> Performing: ${bandMembers[0].performing}</div>`);
  });

  it("should make the band 3", function() {
    //REDUCE
    var bandMembers = [{name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
                       {name: "Aundrea", dancing: 8, performing: 5, otherObligations: "Something"}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9}];

    
    // reduce bandMembers to get the sum of all dancing properties
    var totalDancingSkillLeft = bandMembers.reduce( (acc, m)  => acc + m.dancing, 0);
    expect(totalDancingSkillLeft).toEqual(42);

    // reduce bandMembers to get the sum of all performing properties
    var totalPerformingSkillLeft = bandMembers.reduce( (acc, m)  => acc + m.performing, 0);
    expect(totalPerformingSkillLeft).toEqual(34);

    // // keep members who have higher than average scores
    // // sum dancing + (performing*2) / length of the list to get average
    // var afterRoundThree = bandMembers.filter(function(m) {
    //   return (m.performing + m.dancing) > (totalDancingSkillLeft/6 + totalPerformingSkillLeft/6);
    // });
    // expect(afterRoundThree.length).toEqual(3);
    // expect(afterRoundThree).toEqual([{name: "Aundrea", dancing: 8, performing: 5, otherObligations: 'Something'}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9}]);

    // What was the highest performer and highest dancer score
    // use reduce to create an object with two properties 'maxPerform' and 'maxScore'
    var bestPerformAndDance = bandMembers.reduce( (best, m) => {
      var newPerform = m.performing < best.maxPerform ? best.maxPerform : m.performing;
      best.maxPerform = newPerform;
      var newDance = m.dancing < best.maxDance ? best.maxDance : m.dancing;
      best.maxDance = newDance;
      return best;
    },{});
    expect(bestPerformAndDance).toEqual({maxPerform: 9, maxDance: 8});
  });

  it("should write a function that finds the difference between two arrays", function () {
    // implement a difference function for lists, which subtracts one list from another.
    // It should remove all values from list a, which are present in list b.
    // arrayDiff([1,2],[1]) == [2]
    // arrayDiff([1,2,2,2,3],[2]) == [1,3]

    var arrayDiff = function(a1, a2) {
      return a1.filter(function(a) {
        return !a2.includes(a)
      });
    };

    expect(arrayDiff([1,2,3], [1,2])).toEqual([3]);
    expect(arrayDiff([1,2,2,2,3], [2])).toEqual([1,3]);
  });

  it("should write a function that turns an array of numbers into an array with two numbers the first is the count of all the negative numbers, the second the sum of all negative numbers", function(){
    //countOfPositveAndSumOfNegatives([-1,-2,3,4]) === [2,7]

    var countOfPositveAndSumOfNegatives = function(arr) {
      var negatives = arr.filter((a) =>{return a > 0 });
      var positives = arr.filter((a) =>{return a < 0 });
      return[positives.length, negatives.reduce((acc, i)=> acc + i, 0)];
    };

    var numbers = [-1,-2,-3,-4,0,3,5,2,5];
    expect(countOfPositveAndSumOfNegatives(numbers)).toEqual([4, 15]);
  });

  it("should write a function to capitalize every word in a string", function(){
    // Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

    // Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

    // Example:
    // Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
    // Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"

    // Hint:
    // First split the string into a list of words
    // Map over each word
    // turn the array back into a string

    var jadenCase = function(string){
      var words = string.split(" ");
      var caps = words.map((w) => w[0].toUpperCase() + w.slice(1) );
      return caps.join(" ");
    };

    expect(jadenCase("How can mirrors be real if our eyes aren't real")).toEqual("How Can Mirrors Be Real If Our Eyes Aren't Real");
  });

  it("should use reduce to sum all odd numbers in an array", function(){
    var numbers = [1,2,3,4,5,6,7,8,9];
    var sumOfOdds = numbers.reduce(function(acc, n){
      if(n % 2 !== 0) {
        return acc + n;
      } else {
        return acc;
      }
    }, 0);
    expect(sumOfOdds).toEqual(1+3+5+7+9);
  });

  it("use reduce to convert a binary representation of a number (array of 0s and 1s) into that number in base 10", function() {
    // Given an array of one's and zero's convert the equivalent binary value to an integer.
    // Eg: [0, 0, 0, 1] is treated as 0001 which is the binary representation of 1

    // Examples:
    // Testing: [0, 0, 1] ==> 1
    // Testing: [0, 0, 0, 1, 0] ==> 2
    // Testing: [0, 1, 0, 1] ==> 5
    // Testing: [0, 1, 1, 0] ==> 6
    // Testing: [0, 0, 1, 1, 1, 1] ==> 15
    // Testing: [1, 0, 1, 1] ==> 11

    // hint: the callback for reduce will have an optional argument for the index of the current item

    var binaryToNumber = function(array) {
      var reversed = array.reverse();
      return reversed.reduce(function(acc, i, index){
        var val = 2**index;
        return i === 1 ? acc + val : acc;
      }, 0);
    };

    expect(binaryToNumber([0,0,1])).toEqual(1);
    expect(binaryToNumber([0,0,0,1,0])).toEqual(2);
    expect(binaryToNumber([0,1,0,1])).toEqual(5);
    expect(binaryToNumber([0,1,1,0])).toEqual(6);
    expect(binaryToNumber([0,0,1,1,1,1])).toEqual(15);
    expect(binaryToNumber([1,0,1,1])).toEqual(11);
  });
  
  // Uncomment for extra challenge!!!
  it("can write your own filter function", function() {
    var myFilter = function(arr, func){
      var newArr = [];
      arr.forEach( (i) => {
        if(func(i)) {
          newArr.push(i);
        }
      });
      return newArr;
    };

    expect(myFilter([1,2,3], (i) => i > 2)).toEqual([3]);
  });
  
  it("can write your own map function", function() {
    var myMap = function(arr, func){
      var newArr = [];
      arr.forEach( (i) => {newArr.push(func(i));});
      return newArr;
    };

    expect(myMap([1,2,3], (i) => i + 2)).toEqual([3,4,5]);
  });

  it("can write your own reduce function", function() {
    var myReduce = function(arr, func, initial){
      var acc = initial;
      arr.forEach( (i) => {
        acc = func(acc, i);
      });
      return acc;
    };

    expect(myReduce([1,2,3], ((acc, i) => acc + i), 0)).toEqual(6);
  });

});

// For Fun, add your own thing
it("should use add some html to the page", function () {
  var animals = [{name: "animal", img: "http://lorempixel.com/400/200/animals/" }, {name: "animal", img: "http://lorempixel.com/400/200/animals/"}];
  var html = animals.map(function(p){
    html = `<li>${p.name}<img src="${p.img}" height="200" width="400"></img></li>`;
    console.log(html);
    return html;
  });

  var outerList = document.createElement("ul");
  html.forEach(function(person){
    let el = document.createElement("li");
    el.innerHTML = person;
    outerList.append(el);
  });
  document.body.getElementsByClassName("banner")[0].append( outerList);
});

