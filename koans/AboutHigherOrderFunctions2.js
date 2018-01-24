describe("About Higher Order Functions pt 2", function () {

  it("should use filter to return array items that meet a criteria", function () {
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47},{name: "name", age: 35}];
    var peopleOverFourty = people.filter(function (x) { return x.age > 40 });

    expect(peopleOverFourty).toEqual([{name: "name", age: 41}, {name: "name", age: 47}]);
  });

  it("should use 'map' to transform each element", function () {
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47}];
    var names = people.map(function(x) { return x.age });

    expect(names).toEqual([41, 22, 47]);
  });

  it("should use 'reduce' sum a list", function () {
    var numbers = [1, 2, 3];
    var reduction = numbers.reduce(
            function(/* result from last call */ memo, /* current */ x) { return memo + x }, /* initial */ 0);

    expect(reduction).toBe(6);
    expect(numbers).toEqual([1,2,3]);
  });

  it("should make the band", function() {
    // https://en.wikipedia.org/wiki/Making_the_Band#Results
    // Competitors 	Result
    // Tyra, Paschan, Celeste 	Eliminated in episode 2 for failing to satisfy in terms of dancing

    // Leslie 	Eliminated in episode 2 as the judges felt that her solo aspirations and attitude would interfere with the chemistry of the future group
    // Michelle 	Left in episode 7 to go back to school

    // Lavantae, Patty 	Eliminated in episode 8 for failing to satisfy in terms of dancing and performing
    // Roxanne1, Erika (Bunny), Kristen, Leche, Bethany 	Eliminated in episode 9 for failing to satisfy in terms of dancing

    // Yahaira, Shantee 	Eliminated in episode 10 for failing to satisfy in terms of singing to a crowd
    // Mylah, Aileen, Martii, Francesca 	Were not considered good enough for the group on Season 2

    // Aundrea, Aubrey, Malika 	Kept by Diddy after episode 10 to continue for a second season. They didn't make the band but were considered good enough to have another shot at Making the Band.

    var band_members = [{name: "Tyra", dancing: 3, performing: 5}, {name: "Paschan" ,dancing: 1, performing: 9},  {name: "Celeste", dancing: 3, performing: 4},
      {name: "Leslie", dancing: 7, performing: 7, otherObligations: 'soloAspirations'}, {name: "Michelle" ,dancing: 6, performing: 8, otherObligations: 'is a student'},
      {name: "Erica (Bunny)", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
      {name: "Aundrea", dancing: 8, performing: 5}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Malika", dancing: 7, performing: 9} ];

    // filter out band members who have dancing skill 3 or less
    var afterRoundOne = band_members.filter( m => m.dancing > 3);
    expect(afterRoundOne.length).toEqual(8);

    // Remove band members who have otherObligations (only filter member who have the otherObligations property and have some value in that property )
    var afterRoundTwo = afterRoundOne.filter( m => !m.otherObligations || !m.otherObligations.length > 0 );
    expect(afterRoundTwo.length).toEqual(6);


    //MAPPING

    // Transform the list of members left afterRountTwo into a list of names
    var names = afterRoundTwo.map( m => m.name );
    expect(names.length).toEqual(6);
    expect(names).toEqual(["Erica (Bunny)", "Kristen", "Bethany", "Aundrea", "Aubrey", "Malika"]);

    // Transform that same list of names into a list that contains the length of each name
    var nameLengths = names.map( name => name.length );
    expect(nameLengths.length).toEqual(6);
    expect(nameLengths).toEqual([13, 7, 7, 7, 6, 6]);

    // Map over all of the band members and return a html string that contains each person's names, dancing skill, performing skill
    // For example the first element should be a string equal to this: "<div>Name: Tyra <br> Dancing: 3 <br> Performing: 5 </div>"
    var profiles = band_members.map( (m) => {
      var html = `<div>Name: ${m.name} <br> Dancing: ${m.dancing} <br> Performing: ${m.performing}`;
      if (m.otherObligations && m.otherObligations.length > 0) {
        html += "Other Obligations: " + m.otherObligations + "</div>";
      } else {
        html += "</div>";
      }
      return html;
    });
    expect(profiles.length).toEqual(11);
    expect(profiles[0]).toEqual(`<div>Name: ${band_members[0].name} <br> Dancing Skill: ${band_members[0].dancing} <br> Performing: ${band_members[0].performing} </div>`);
    // Uncomment this test for an extra challenge this requires the map function to output Other Obligations if that member has the otherObligations propery
    // expect(profiles[3]).toEqual(`<div>Name: ${band_members[3].name} <br> Dancing Skill: ${band_members[3].dancing} <br> Performing: ${band_members[3].performing} <br>Other Obligations: ${band_members[3].otherObligations}</div>`);

    //REDUCE

    // sum dancing + (performing*2) / 6 get average
    // filter out people who have higher than average scores
    var totalDancingSkillLeft = afterRoundTwo.reduce( (acc, m)  => acc + m.dancing, 0);
    var totalPerformingSkillLeft = afterRoundTwo.reduce( (acc, m)  => acc + m.performing, 0);

    expect(totalDancingSkillLeft).toEqual(42);
    expect(totalPerformingSkillLeft).toEqual(34);


    // Who was the best performer and best dancer create an object with two properties

    var bestPerformerAndDancer = band_members.reduce();
    expect(bestPerformerAndDancer).toEqual({bestPerformer: "some name", bestDancer: "some other name"});

    var afterRoundThree = afterRoundTwo.filter(function(m) {
      return (m.performing + m.dancing) > (totalDancingSkillLeft/6 + totalPerformingSkillLeft/6);
    });

    expect(afterRoundThree.length).toEqual(3);
    expect(afterRoundThree).toEqual([{name: "Aundrea", dancing: 8, performing: 5}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Malika", dancing: 7, performing: 9}]);
  });

  it("should use 'forEach' for simple iteration", function () {
    var codergirls = [{name: "Eliot Piering", img: "http://lorempixel.com/400/200/animals/" }, {name: "Eliot Piering", img: "http://lorempixel.com/400/200/animals/"}, {name: "Eliot Piering", img: "http://lorempixel.com/400/200/animals/"}  ];
    var html = codergirls.map(function(p){
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
});

