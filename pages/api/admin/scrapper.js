const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const linkToPhrasesSample = "https://basicenglishspeaking.com/100-common-phrases-and-sentence-patterns/";

export default async (req, res) => {
  try {
    const phrases = [
      "Are you sure",
      "Are you sure about that",
      "Are you sure of what you said",
      "Are you sure that he is not coming",
      "Are you used to using chopsticks",
      "Are you used to life here",
      "Are you used to staying up late",
      "As far as I can remember",
      "he didn’t come home until midnight",
      "As far as I recollect",
      "there were few people in the village then",
      "As far as I recall",
      "they quarreled very often at that time",
      "As far as I can see",
      "he’s a big liar",
      "As far as I’m concerned",
      "I don’t mind that you wear this mini-skirt",
      "The coat is fine as far as color is concerned",
      "but it is not very good quality",
      "So far as he’s concerned",
      "nothing is as important as his daughter",
      "We are your employees",
      "but  this doesn’t mean that  we must  obey you unconditionally",
      "You are much older than I am",
      "but it doesn’t mean that you are right about everything",
      "I  support  this measure",
      "but  it  doesn’t mean that  I  support  you  without reservation",
      "I like you",
      "but this doesn’t mean that I’ll marry you",
      "Be careful with the wet paint",
      "Be careful that you don’t  catch a cold Put on more clothes before you go out",
      "Be careful not to spill the milk",
      "Compared to other students",
      "she is quite hard working",
      "Compared to city life",
      "country life is quiet and peaceful",
      "Compared to fans",
      "air-conditioners are more comfortable",
      "By the way",
      "is there a bathroom in the apartment",
      "By the way",
      "do you have any change on you",
      "By the way",
      "he is a difficult person",
      "Don’t ever lose these papers They are of great importance to our company",
      "Don’t ever miss a good opportunity",
      "Don’t ever arrive late for an interview",
      "Do you agree that we should start early",
      "Do you agree with my plan",
      "Will he agree to the conditions in the contract",
      "Do you carry this in size 10",
      "Do you carry this in beige",
      "Do you have this in medium",
      "Do you have any single rooms available",
      "Do you have any tickets available",
      "Do you have any shoes in size 20 available",
      "Did you use to live in Tokyo",
      "Did you use to get up early",
      "You used to smoke heavily",
      "didn’t you",
      "Do you feel like going for a walk on the beach",
      "Do you feel like going shopping at the mall",
      "Do you feel like eating some ice cream or having cake or both",
      "Do you feel like having some coffee",
      "Do you feel like getting a bite to eat",
      "Would you mind if I smoke here",
      "Do you mind opening the window It’s so stuffy in here",
      "Do you mind if I ask you a question",
      "Shouldn’t we ask for permission first",
      "Shouldn’t we read the directions before we install the air conditioner",
      "Shouldn’t we check the weather before we go out",
      "Shouldn’t you try to save some money rather than spend it all",
      "Have you ever been to New York",
      "Have you ever been to Nanjing",
      "Have you ever seen Ghost",
      "Have you ever wondered if there is life after death",
      "Have you ever heard of it",
      "He is either drunk or mad",
      "It’s either your fault or her fault",
      "Either you are wrong or I am",
      "Don’t tell him the bad news until he finishes his exam",
      "The secret was not discovered until he was dead",
      "I won’t stop shouting until you let me go",
      "He is as poor as a church mouse",
      "He is as fit as a fiddle though he is already seventy",
      "Shelly’s father is always as busy as a bee",
      "The twin sisters are as different as night and day",
      "The lecture is as dull as ditch-water",
      "He is not only humorous",
      "but also patient",
      "He is not only a good leader",
      "but also an eloquent speaker",
      "I’m not only going to the party",
      "I’m also going to sing at it",
      "Not only do I support you",
      "so do your acquaintances",
      "Make yourself at home Help yourself to some fish",
      "Help yourself to the refrigerator",
      "Help yourself to some steak I made it especially for you",
      "I was so interested in the film that I went to see it several times",
      "It’s so hot that none of us want to go out",
      "He speaks French so well that we think he is a Frenchman",
      "How about going for a spin in my new car",
      "How about minding your own business",
      "How about those Yankees!",
      "What about your holidays",
      "What about his qualifications for the job",
      "You forgot to bring your homework again How come",
      "How come your little sister is so angry",
      "How come we were not invited to the party",
      "How dare you call me fat!",
      "How dare you speak to me like that!",
      "How dare he do that to me!",
      "How dare you turn him down!",
      "How often is there a leap year",
      "How often is there a flight to Shanghai",
      "How often do you write to your parents",
      "How do you like your new apartment",
      "How do you like your new colleagues",
      "How does your mother like the tea set",
      "How long does it take to get to the station by subway",
      "How long will it take to build the stadium",
      "How long did it take you to knit this sweater",
      "I can hardly believe that he is deaf; he can understand us so well",
      "I can hardly believe that Paul was put in prison for bribery",
      "I can hardly believe what I have seen",
      "I can’t help laughing every time I think of that",
      "I couldn’t help noticing your ring; it’s beautiful",
      "I can’t help but feel sorry for him",
      "I can’t help remembering how beautiful she looked",
      "I bet we’re lost",
      "I bet he is home now",
      "I bet he will win the prize",
      "I can’t say for certain",
      "I can’t say who did the best",
      "I can’t say with any certainty that eating less can be a cure for obesity",
      "I can’t wait to see my family",
      "I can’t wait to hear from you",
      "I can’t wait to buy a computer",
      "I’d hate for you to think I didn’t care",
      "I’d hate for you to miss the party",
      "I’d hate for you to leave our company",
      "I’d hate for you to get sick",
      "I’d like you to fetch some boiled water",
      "I’d like you to send for a doctor",
      "I’d like you to look after my baby for a while",
      "If  there is one thing that  annoys me",
      "it’s people who don’t keep their promises",
      "If there is one thing that disappoints me",
      "it’s his failure to arrange his time responsibly",
      "If there is one thing that upsets me",
      "it’s my forgetfulness",
      "If there is one thing that surprises me",
      "it’s his winning the competition",
      "If there is one thing that interests me",
      "it’s fashion design",
      "If it hadn’t been for your help",
      "my experiments would have failed",
      "If it hadn’t been for the lifeboat",
      "I would have drowned",
      "If it hadn’t been for her careful arrangement",
      "the party would not have been a success",
      "Without my persuasion",
      "he would not have come",
      "Without your financial support",
      "we could not have finished the project",
      "I dare say you will succeed in the election",
      "I dare say he won’t come",
      "I would imagine he’s forgotten",
      "I dare say he has",
      "I’ve got to go",
      "I have got to buy something to drink",
      "I have got to mail some cards to my friends",
      "I’ve got to apologize for troubling you so much",
      "You’ve got to try this dish; it’s tasty",
      "I’ll be back as soon as possible",
      "I’ll work as hard as I can",
      "Try to be as careful as possible",
      "Come as quickly as possible",
      "Run as fast as you can",
      "I’d be grateful for your help",
      "I’d be grateful if you’d be quiet",
      "I’d be grateful if you’d give me a hand",
      "I’d be grateful if you’d take care of my baby",
      "I’d be grateful if you danced with me",
      "I’ll let you know when I’m leaving for Beijing",
      "I’ll let you know if I can make it for dinner",
      "I’ll let you know if I get bored",
      "I’ll let you know when I get hungry",
      "I had no idea that she was a thief",
      "He has no idea how to operate these machines",
      "I have no idea what time it is",
      "I’m looking forward to working with you",
      "I’m looking forward to coming to China again",
      "I’m really looking forward to the holidays",
      "I’m afraid you didn’t quite get his meaning",
      "A: Could I speak to Elizabeth",
      "please",
      "B: I’m afraid she is not in at the moment",
      "I’m afraid we are going to be late",
      "I’m afraid I can’t make it",
      "I’m calling to say goodbye to you",
      "I’m calling to tell you that the concert begins at 7:00",
      "I’m calling to book two tickets for tonight’s film",
      "I’m calling to warn you of the coming storm",
      "I’m not really happy with their performance",
      "I’m not really happy with your behavior",
      "I’m not really happy with your present situation",
      "I’m not really happy with their service",
      "I’m not really happy with my life",
      "It was Jack who broke the window when we were playing football",
      "It is Jane that I want to marry",
      "It was here in the supermarket that he met his first love",
      "I really go for Beethoven",
      "I really go for this house It’s terrific",
      "She goes for tall and handsome men",
      "I don’t go much for modernism",
      "It’s too bad that we lost the match",
      "It’s too bad that we have to cancel the get-together",
      "It’s too bad that you can’t come",
      "It’s too bad",
      "It’s too bad that the rain spoiled our picnic",
      "I’m thinking about moving to a new house",
      "I’m thinking about taking a science course",
      "I’m thinking about getting a divorce",
      "It’s my fault we missed the bus",
      "It’s my fault you didn’t get paid on time",
      "It’s my fault we lost the game",
      "It’s on the tip of my tongue",
      "let me see",
      "His address is on the tip of my tongue",
      "wait a minute",
      "The question she wanted to ask was on the tip of her tongue",
      "A: Do you want to eat a Western or Chinese meal",
      "B: It’s up to you",
      "It’s up to us to help those in need",
      "It’s not up to you to tell me how to do my job",
      "It is said that he is quite a handsome young man",
      "It’s said that a new president will be appointed",
      "It  should be pointed out  that  your proposals are theoretically correct  but practically impossible",
      "It has been proven that your method is the best",
      "It will be noted that what they have done to him is wrong",
      "It’s your turn to tell a story",
      "It’s your turn to cook",
      "It’s your turn to sweep the floor",
      "It’s your turn to give a presentation",
      "It’s your turn to perform",
      "It may surprise you",
      "but I paid off all the debts in a year",
      "It may surprise you",
      "but Maggie refused my proposal",
      "It may surprise you",
      "but I bought all these books for 20 Yuan",
      "It may surprise you",
      "but he’s just been promoted to manager",
      "It may surprise you",
      "but he was once in prison",
      "It’s not that I don’t like the car",
      "but I think it is too expensive",
      "It’s not that I am unwilling to help you",
      "but I’m tied up with extra work these days",
      "It’s not  that  he doesn’t need your help",
      "but he thinks it  will be an inconvenience to you",
      "A mountain is not famous because it is high",
      "but because it has some spirit dwelling in it",
      "I’ve had enough of her continual chatter",
      "I’ve had enough of your complaining",
      "Haven’t you had enough of him I found him so boring",
      "I’ve had enough of the traffic here",
      "I’ve had enough of this city",
      "I wonder if it would be convenient to visit you next Monday",
      "I wonder if Mr Wang could arrange a meeting with me",
      "I was wondering if the manager would agree with my design",
      "I was wondering if you could come to the meeting this afternoon",
      "I have been learning English for almost ten years",
      "I have been living here for thirty years",
      "Where have you been We have been looking for you everywhere",
      "No matter what he says",
      "don’t believe him",
      "No matter how you do it",
      "it will be wrong",
      "No matter where he goes",
      "he carries his suitcase",
      "No matter how you spend your holiday",
      "tell me about it",
      "I would rather stay than leave",
      "He would rather work all day long than do nothing",
      "The mother would rather die than lose her child",
      "She’d rather resign than take part in such shameful business deals",
      "Now that I come to think about it",
      "you’re right to dismiss him",
      "Now that I come to think about it",
      "how ignorant I was!",
      "Now that I think about it",
      "you are wise not to have accepted him",
      "Now that I think about it",
      "he is a person really worth trusting",
      "You eat so little No wonder you are so slim",
      "Are you a librarian No wonder you are so well read",
      "There is something wrong with your leg No wonder you walk so slowly",
      "I ran to the station only to find that the train had left",
      "She came home excitedly only to find nobody was in",
      "I search desperately for my purse",
      "only to find all my money was gone",
      "I arrived at the restaurant",
      "only to find I had no money on me",
      "On one hand",
      "it’s convenient",
      "but on the other hand",
      "it’s time-consuming",
      "On one hand",
      "he is very obedient to his wife; on the other hand",
      "he treats his parents badly",
      "On one hand",
      "Jason does everything in the  office;  on the other hand",
      "he does nothing at home",
      "As a teacher",
      "he is very patient in class; but on the other hand",
      "he is not so patient with his own child",
      "Once you decide",
      "you can’t change your mind",
      "Once you have a stomachache",
      "take the medicine twice a day",
      "Once he finds out what you’ve done",
      "he’ll get mad",
      "Speaking of the movies",
      "have you seen “The Patriot”",
      "Speaking of honesty",
      "I know a lot of people who don’t pay bus fares",
      "Speaking of Ben",
      "have you seen him recently",
      "Speaking of bicycles",
      "China is called “the kingdom of bicycles”",
      "See that the door is locked before you leave",
      "See that you have enough sleep every day",
      "See that you go to see your parents often",
      "Thanks to their help",
      "we accomplished the task on time",
      "Thanks to computers",
      "lots of tasks are now easier",
      "Thanks to your timely warning",
      "I didn’t make a mistake",
      "Thanks to your stupidity",
      "we lost our game",
      "The more you put your heart into English",
      "the more you’ll be interested in it",
      "The more you pay",
      "the more you will gain",
      "The sooner",
      "the better",
      "The earlier you set about your work",
      "the sooner you will finish it",
      "The first thing I’m going to do when I get home is sleep for a whole day",
      "The first thing I’m going to do when I get a pay raise is to treat you to dinner",
      "The first thing I’m going to do when I spend my vacation in the country is go fishing",
      "There is nothing as exciting as meeting an old friend unexpectedly",
      "For me",
      "there is nothing as enjoyable as reading a novel on the grass",
      "There is nothing as pleasant as spending a weekend in the countryside",
      "There is nothing as refreshing as having a good rest",
      "There is nothing I like better than listening to the radio",
      "There is nothing women like better than shopping",
      "There is nothing she likes better than chatting with friends",
      "We’d be better off without them as neighbors",
      "We’d be better off without him at the party",
      "They’d be better off without their wives around them",
      "I’d be better off without the incident on my mind",
      "Thank you for what you have done for me",
      "Thank you for your help",
      "Thank you for the gift",
      "Thank you for giving me a lift",
      "Thank you for your advice",
      "We’d better buy a computer",
      "You’d better not ask him",
      "You had best accept his success",
      "You had best set out early",
      "What became of the poor child",
      "What will become of my family if my father goes bankrupt",
      "What will become of my dog during my absence",
      "What will become of the water if we put it outside during the winter",
      "We may as well buy a Benz since you don’t like Ford",
      "We may as well have a try since it’s worth doing",
      "We may as well take the risk Nothing ventured",
      "nothing gained",
      "What can I do for you",
      "What can I do to cheer her up",
      "What can I do to make him satisfied",
      "What can I do to stop them",
      "I’ve got the what-do-you-call-it for you",
      "I cannot find the what-do-you-call-it",
      "She’s just gone out with old what’s-his-name",
      "What’s-his-name called you this morning",
      "Where did you put the what-do-you-call-it",
      "What do you say about going to the cinema this afternoon",
      "Let’s go by plane What do you say",
      "What do you say about some light music",
      "What do you mean by saying that",
      "What do you mean by canceling your performance",
      "What do you mean by “out of the question”",
      "What do you mean by asking such a question",
      "What if it rains when we have no umbrella with us",
      "What if they are against us",
      "What if we get lost in the jungle",
      "What if they don’t approve of our earning some money in our spare time",
      "What is it for",
      "What did you say that for",
      "What do you need so much money for",
      "What I’m trying to say is that he is a good husband",
      "What I’m trying to say is that it’s worth buying",
      "What I’m trying to say is that human nature doesn’t change",
      "What I’m trying to say is that you should think of others",
      "What I’m trying to say is that smoking is harmful",
      "What would you do if you were me",
      "What would you do if you were in my shoes",
      "What would you do if you had a lot of money",
      "What would you do if you failed",
      "What would you do if the rumors were true",
      "What’s the matter with him",
      "What’s the matter with your finger It’s bleeding",
      "What’s wrong with this machine",
      "What’s wrong with you",
      "Mum You look so pale",
      "What’s wrong with your car",
      "Where can I get a map",
      "Where can I find a policeman",
      "Where can I find him",
      "What’s the use of talking about it",
      "What’s the use of crying over spilt milk",
      "What’s the point of arguing with her",
      "What’s the point of worrying about it",
      "Where there are difficulties",
      "there are ways to get over them",
      "Where there is opposition",
      "there are rebellions",
      "Where there is contact",
      "there is friction",
      "Where there are women",
      "there are jealousy and suspicion",
      "Where there is a will",
      "there is a way",
      "What’s your favorite dish",
      "Who is your favorite film star",
      "What’s your favorite subject",
      "Which is your favorite book",
      "Why not try to persuade him to give up smoking",
      "Why don’t you go ask the teacher",
      "Why not buy some ready-made food",
      "A: Let’s go to see a film tonight",
      "B: Sure",
      "why not",
      "Would you care for something to drink",
      "Would you care for some tea",
      "Would you like to borrow my car",
      "Would you like to try yourself",
      "You only have to ask her in order to know what has happened",
      "You only have to call her in order to know whether she will come or not",
      "I only have to consult the digital dictionary in order to find out the meaning of a word I don’t know",
      "You only have to ask the teacher in order to solve the problem",
      "You only have to get some newspapers in order to find the advertisements you need",
      "You are not to doze off in class",
      "You are not to waste your time doing nothing",
      "You are not to scribble on the wall",
      "You are not to take photos in the museum",
      "You can never be too careful driving",
      "We cannot praise him enough as a hero",
      "One cannot practice enough when learning a foreign language",
      "You can never overestimate Shakespeare’s plays",
      "You can never over-emphasize the importance of physical training",
      "Whether it rains or not",
      "we’ll hold the sports meet",
      "They’ll find out the truth",
      "whether or not you tell it to them",
      "Whether or not we like it",
      "we have to accept it",
      "Whether you are willing or not",
      "you have to do it",
      "Are you sure",
      "Are you sure about that",
      "Are you sure of what you said",
      "Are you sure that he is not coming",
      "Are you used to using chopsticks",
      "Are you used to life here",
      "Are you used to staying up late",
      "As far as I can remember",
      "he didn’t come home until midnight",
      "As far as I recollect",
      "there were few people in the village then",
      "As far as I recall",
      "they quarreled very often at that time",
      "As far as I can see",
      "he’s a big liar",
      "Be careful with the wet paint",
      "Be careful that you don’t  catch a cold Put on more clothes before you go out",
      "Be careful not to spill the milk",
      "As far as I’m concerned",
      "I don’t mind that you wear this mini-skirt",
      "The coat is fine as far as color is concerned",
      "but it is not very good quality",
      "So far as he’s concerned",
      "nothing is as important as his daughter",
      "By the way",
      "is there a bathroom in the apartment",
      "By the way",
      "do you have any change on you",
      "By the way",
      "he is a difficult person",
      "We are your employees",
      "but  this doesn’t mean that  we must  obey you unconditionally",
      "You are much older than I am",
      "but it doesn’t mean that you are right about everything",
      "I  support  this measure",
      "but  it  doesn’t mean that  I  support  you  without reservation",
      "I like you",
      "but this doesn’t mean that I’ll marry you",
      "Did you use to live in Tokyo",
      "Did you use to get up early",
      "You used to smoke heavily",
      "didn’t you",
      "Don’t ever lose these papers They are of great importance to our company",
      "Don’t ever miss a good opportunity",
      "Don’t ever arrive late for an interview",
      "Compared to other students",
      "she is quite hard working",
      "Compared to city life",
      "country life is quiet and peaceful",
      "Compared to fans",
      "air-conditioners are more comfortable",
      "Do you carry this in size 10",
      "Do you carry this in beige",
      "Do you have this in medium",
      "Do you have any single rooms available",
      "Do you have any tickets available",
      "Do you have any shoes in size 20 available",
      "Do you agree that we should start early",
      "Do you agree with my plan",
      "Will he agree to the conditions in the contract",
      "Do you feel like going for a walk on the beach",
      "Do you feel like going shopping at the mall",
      "Do you feel like eating some ice cream or having cake or both",
      "Do you feel like having some coffee",
      "Do you feel like getting a bite to eat",
      "Have you ever been to New York",
      "Have you ever been to Nanjing",
      "Have you ever seen Ghost",
      "Have you ever wondered if there is life after death",
      "Have you ever heard of it",
      "Don’t tell him the bad news until he finishes his exam",
      "The secret was not discovered until he was dead",
      "I won’t stop shouting until you let me go",
      "Shouldn’t we ask for permission first",
      "Shouldn’t we read the directions before we install the air conditioner",
      "Shouldn’t we check the weather before we go out",
      "Shouldn’t you try to save some money rather than spend it all",
      "He is either drunk or mad",
      "It’s either your fault or her fault",
      "Either you are wrong or I am",
      "He is as poor as a church mouse",
      "He is as fit as a fiddle though he is already seventy",
      "Shelly’s father is always as busy as a bee",
      "The twin sisters are as different as night and day",
      "The lecture is as dull as ditch-water",
      "I was so interested in the film that I went to see it several times",
      "It’s so hot that none of us want to go out",
      "He speaks French so well that we think he is a Frenchman",
    ];

    // const v = phrases.map((x) => `'${x.replace(/\./g, "").trim()}'`);
    //   x
    //     .replace(/\?/g, " ") //remove multiple multispace
    //     .replace(/&nbsp;/g, " ") // replace &nbsp; with emptyspace
    //     .replace(/  +/g, " ") //remove multiple multispace
    //     .trim()
    // );

    // for (const v of a) {
    //   const { data } = await axios.get(v);
    //   // Load HTML we fetched in the previous line
    //   const $ = cheerio.load(data);

    //   const listItems = $("section article div").text();
    //   // get text after I. EXAMPLES: and before II. DIALOGUES:
    //   const text = listItems.split("I. EXAMPLES:")[1].split("II. DIALOGUES:")[0];

    //   const phraseExample = text
    //     .trim()
    //     .split(/\n/)
    //     .map((phrase) =>
    //       phrase
    //         .replace(/&nbsp;/g, " ") // replace &nbsp; with emptyspace
    //         .replace(/  +/g, " ") //remove multiple multispace
    //         .trim()
    //     );

    // fs.writeFile("phrases.js", `export default  [${v}]`, (err) => console.log(err));

    // fs.appendFile("phrase.txt", `*****${phraseExample}\n`, (err) => console.log(a.indexOf(v)));
    // }

    // const v = a.split("*****").map((x) => `'${x}'`);

    const incPhrases = [];
    for (const phrase of phrases) {
      // for (const phrase of [phrases[1]]) {
      const phraseArray = phrase.split(" ");
      const phraseLength = phraseArray.length;
      for (let i = 0; i < phraseLength; i++) {
        const a = phraseArray.slice(0, i).join(" ");
        a && incPhrases.push(`'${a}'`);
      }
    }

    var uniqueIncPhrases = incPhrases.filter((v, i, a) => a.indexOf(v) === i);

    fs.writeFile("uniqueIncPhrases.js", `export default  [${uniqueIncPhrases}]`, (err) => console.log(err));

    res.status(200).json("sds");
    return;

    // for (const exampleLink of [commonEnglishLink[0]]) {
    // Fetch HTML of the page we want to scrape
    // const { data } = await axios.get(exampleLink);
    // // Load HTML we fetched in the previous line
    // const $ = cheerio.load(data);
    // // console.log({ exampleLink });
    // // get text in doc
    // const listItems = $("section article div").text();
    // // get text after I. EXAMPLES: and before II. DIALOGUES:
    // const text = listItems.split("I. EXAMPLES:")[1].split("II. DIALOGUES:")[0];
    // // const listItems = $("section article div");
    // // const c = $(".sc_player_container1").siblings()[0].tagName;
    // // const listItemsw = $(':contains("Are you sure")').toArray()[0];
    // //loop through phrases and push phrases to list of phrases
    // const phraseExample = text
    //   .trim()
    //   .split(/\n/)
    //   .map((phrase) =>
    //     phrase
    //       .replace(/&nbsp;/g, " ") // replace &nbsp; with emptyspace
    //       .replace(/  +/g, " ") //remove multiple multispace
    //       .trim()
    //   );
    // const v = a.split("*****").map((x) => `'${x}'`);
    // fs.writeFile("phraseLink.js", `export default  [${v}]`, (err) => console.log(err));
    // fs.appendFile("phrase.txt", `*****${phrase}`, function (err) {
    //   if (err) {
    //     // append failed
    //     console.log("failed");
    //   } else {
    //     console.log(phrase);
    //     // done
    //   }
    // });
    // res.status(200).json("sds");
    // return;
    // for (const phrase of phraseExample) {
    // for (const phrase of [phraseExample[0]]) {
    // const translateUrl = `https://translate.google.com/?sl=en&tl=es&text=${encodeURIComponent(phrase)}&op=translate`;
    // // Fetch HTML of the page we want to scrape
    // const { data } = await axios.get(translateUrl);
    // // phraseExamples
    // phraseExamples.push(phrase);
    // // Load HTML we fetched in the previous line
    // const $ = cheerio.load(data);
    // // Select all the list items in plainlist class
    // const listItems = $(".plainlist ul li");
    // // Stores data for all countries
    // const countries = [];
    // // Use .each method to loop through the li we selected
    // listItems.each((idx, el) => {
    //   // Object holding data for each country/jurisdiction
    //   const country = { name: "", iso3: "" };
    //   // Select the text content of a and span elements
    //   // Store the textcontent in the above object
    //   country.name = $(el).children("a").text();
    //   country.iso3 = $(el).children("span").text();
    //   // Populate countries array with country data
    //   countries.push(country);
    // });
    // Select all the list items in plainlist class
    // const listItems = $("span");
    // const listItems = $(".VIiyi").data();
    // console.log(translateUrl, listItems);
    // listItems.each((i, elem) => {
    //   //   // const a = $(el).children("span").text();
    // const a = $(elem).children("").text();
    //   //   // const a = $(el).text();
    // console.log($(elem).text());
    // console.log($(elem).text());
    // console.log(a);
    // });
    // }
    // const a = $(".sc_player_container1").nextAll().nextUntil("strong");
    // const title = $.html($("h1 .entry-title"));
    // const title = $.contains("You only have");
    // const title = $.text($("h1 .entry-title"));
    // const title = $('.sc_player_container1:contains("are-you-sure")').next().text();
    // console.log(exampleLink, title);
    // <h1 class="entry-title">100. You only have to…in order to…</h1>;
    // const listItems = $("section article div");
    // const listItems = $("section article div");
    // listItems.each((idx, el) => {
    //   // console.log(a);
    //   const a = $(el).text();
    //   //   // const a = $(el).children("span").text();
    //   //   // const a = $(el).children("").text();
    //   //   // const a = $(el).text();
    //   //   // const a = $(el).text();
    //   //   // <div class="sc_player_container1"><input type="button" id="btnplay_6263bfe6bb2bf5.11283273" class="myButton_play" onclick="play_mp3('play','6263bfe6bb2bf5.11283273','http://basicenglishspeaking.com/wp-content/uploads/2016/audio/100/100-01.mp3','80','false');show_hide('play','6263bfe6bb2bf5.11283273');"><input type="button" id="btnstop_6263bfe6bb2bf5.11283273" style="display:none" class="myButton_stop" onclick="play_mp3('stop','6263bfe6bb2bf5.11283273','','80','false');show_hide('stop','6263bfe6bb2bf5.11283273');"><div id="sm2-container"><!-- flash movie ends up here --></div></div>
    //   //   // commonEnglishLink.push(a);
    // });
    // }

    // console.log(phraseExamples);

    // replace &nbsp;

    // const commonEnglishLink = listItems.map((idx, el) => $(el).children("a").attr("href"))

    //   const linkToExamples = listItems.map((idx, el) => {
    //   // Object holding data for each country/jurisdiction
    //   // const country = { name: "", iso3: "" };
    //   // // Select the text content of a and span elements
    //   // // Store the textcontent in the above object
    //   const link = $(el).children("a").attr("href");
    //   // country.iso3 = $(el).children("span").text();
    //   // // Populate countries array with country data

    //   // countries.push(country);
    // });

    // console.log(phraseExamples);

    // fs.writeFile("/phrases.js", phraseExamples, function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("The file was saved!");
    // });

    // var file = fs.createWriteStream(phraseExamples);
    // file.on("error", function (err) {
    //   /* error handling */
    // });
    // arr.forEach(function (v) {
    //   file.write(v.join(", ") + "\n");
    // });
    // file.end();

    // fs.writeFile(
    //   "/phrase.json",

    //   JSON.stringify(phraseExamples),

    //   function (err) {
    //     if (err) {
    //       console.error("Crap happens");
    //     }
    //   }
    // );

    return res.status(200).json("success");
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
