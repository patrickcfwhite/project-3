const mongoose = require('mongoose')
const Read = require('../models/read')
const Cook = require('../models/cook')
const Watch = require('../models/watch')
const Play = require('../models/play')
const User = require('../models/user')

function updateUpload(item) {
  
  const id = item.user._id
  const info = [item._id, item.category]
  User
    .findById(id)
    .then(user => {
      user.uploads.push(info)
      user.save()
    })
    .catch(error => console.log(error))
}

function createBooks(users) {
  return Read.create(
    [{
      title: '1984',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
      author: 'George Orwell',
      description: 'Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist',
      genre: ['Dystopian, Political fiction, Social Science'],
      bookType: 'Novel',
      rating: 4,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'Lord of the Flies',
      image: 'https://upload.wikimedia.org/wikipedia/en/9/9b/LordOfTheFliesBookCover.jpg',
      author: 'William Golding',
      description: 'Lord of the Flies is an allegorical novel about a group of schoolboys stranded on a deserted island without any adult supervision. Free from the restraints of society, the boys form their own civilization, which quickly descends into chaos and violence.',
      genre: ['Allegory, Novel'],
      bookType: 'Novel',
      rating: 3,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'The Curious Incident of the Dog in the Night-Time',
      author: 'Simon Stephens',
      description: 'Christopher Boone, a 15 year old who suffers from Aspergers syndrome, finds the neighbours dog murdered and he sets out on a journey which will turn his whole life upside down.',
      genre: ['Novel, Mystery, Bildungsroman, Crime Fiction'],
      bookType: 'Novel',
      image: 'https://upload.wikimedia.org/wikipedia/en/0/03/Curiousincidentofdoginnighttime.jpg',
      rating: 4,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'Holes',
      author: 'Louis Sachar',
      description: 'Stanley Yelnats, a boy who has bad luck due to a curse placed on his great- great-grandfather, is sent to Camp Green Lake, a juvenile detention camp, for a crime he did not commit. Stanley and the other boys at the camp are forced to dig large holes in the dirt every day.',
      genre: ['Adventure, Young adult fiction, Novel'],
      bookType: 'Novel',
      image: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Sachar_-_Holes_Coverart.png',
      rating: 5,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'A Clockwork Orange',
      author: 'Anthony Burgess',
      description: 'Alex and his Droogs spend their nights getting high at the Korova Milkbar before getting up to no good. After being jailed for bludgeoning the Cat Lady to death, Alex submits to behaviour modification technique to earn his freedom and is conditioned to abhor violence. Returned to the world defenseless, Alex becomes the victim of his prior victims.',
      genre: ['Science fiction, Drama, Mystery, Crime'],
      bookType: 'Novel',
      image: 'https://upload.wikimedia.org/wikipedia/en/2/23/Clockwork_orange.jpg',
      rating: 5,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'Pachinko',
      author: 'Min Jin Lee',
      description: 'Pachinko follows one Korean family through the generations, beginning in the early 1900s Korea with Sunja, the prized daughter of a porr yet proud famile, whose unplanned pregnancy threatens to shame them all. Deserted by her lover, SUnja is saved when a young tubercular minister offers to marry and bring her to Japan.',
      genre: ['Novel, Historical fiction, Domestic Fiction'],
      bookType: 'Novel',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Pachinko_paperback_cover.jpeg',
      rating: 2,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'Our Stop',
      author: 'Laura Jane Williams',
      description: 'Nadia gets the 7.30 train every morning without fail. Well, except if she oversleeps or wakes up at her friend Emma’s after too much wine. Daniel really does get the 7.30 train every morning, which is easy because he hasn’t been able to sleep properly since his dad died. One morning, Nadia’s eye catches sight of a post in the daily paper: To the cute girl with the coffee stains on her dress. I’m the guy who’s always standing near the doors… Drink sometime? So begins a not-quite-romance of near-misses, true love, and the power of the written word.',
      genre: ['Romance, Women\'s Fiction, Contemporary, Fiction'],
      bookType: 'Novel',
      image: 'https://images-eu.ssl-images-amazon.com/images/I/511oXdcIRGL.jpg',
      rating: 4,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'The Blaze',
      author: 'Chad Dundas',
      description: 'Army veteran Matthew Rose has been called back home to settle his father’s affairs after his death. He doesn’t remember much about his past; a traumatic brain injury sustained in Iraq wiped out much of his memory. On his first night back in town, he witnesses a house fire, and it turns out a young man was inside. The incident brings back memories of a different fire — and an important part of his past.',
      genre: ['Suspense & Thriller, Fiction'],
      bookType: 'Novel',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41-ewThYnRL._SX329_BO1,204,203,200_.jpg',
      rating: 5,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'The Signal-Man',
      author: 'Charles Dicksons',
      description: 'an eerie ghost story about a railway signal-man who is haunted by foreboding, spectral visions.',
      genre: ['Horror, Mystery'],
      bookType: 'Short Story',
      image: 'https://images-eu.ssl-images-amazon.com/images/I/51GMRJesG0L.jpg',
      rating: 4,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'The Boy, the Mole, the Fox and the Horse',
      author: 'Charlie Mackesy',
      description: 'The boy, the mole, the fox and the horse are four friends who share a deep, unshakable bond. Through a series of brief but profound conversations, Mackesy teases universal truths and rich wisdom from the mouths of his characters, celebrating warmth and empathy in all its myriad forms.',
      genre: ['Non-fiction, Illustration'],
      bookType: 'Non-fiction',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41%2BZ8nhrsjL._SX389_BO1,204,203,200_.jpg',
      rating: 3,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'Fleabag: The Scriptures',
      author: 'Phoebe Waller-Bridge',
      description: 'Fleabag: The Scriptures includes new writing from Phoebe Waller-Bridge alongside the filming scripts and the never-before-seen stage directions from the Golden Globe, Emmy and BAFTA winning series.',
      genre: ['Script'],
      bookType: 'Non-fiction',
      image: 'data:image/jpeg;base64,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',
      rating: 2,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'I\'ll Be Gone In The Dark',
      author: 'Michella McNamara',
      description: 'A masterful true crime account of the Golden State Killer - the elusive serial rapist turned murderer who terrorised California for over a decade - from Michelle McNamara, the gifted journalist who died tragically while investigating the case.',
      genre: ['Non-fiction, True Story, Crime'],
      bookType: 'Non-fiction',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Ill_be_gone_in_the_dark.jpg',
      rating: 5,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'Looking for  Alaka',
      author: 'John Green',
      description: 'Looking for Alaska follows the novel\'s main character and narrator Miles Halter, or "Pudge," to boarding school where he goes to seek the "Great Perhaps," the famous last words of François Rabelais',
      genre: ['Young Adult, Fiction'],
      bookType: 'Novel',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Looking_for_Alaska_original_cover.jpg/220px-Looking_for_Alaska_original_cover.jpg',
      rating: 5,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'The Color Purple',
      author: 'Alice Walker',
      description: 'Set in the deep American South between the wars, The Color Purple is the classic tale of Celie, a young black girl born into poverty and segregation.',
      genre: ['Contemporary Fiction, Fiction'],
      bookType: 'Novel',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/4746/9781474607254.jpg',
      rating: 3,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'Anne Frank: The Diary of a Young Girl',
      author: 'Anne Frank',
      description: 'One of the most famous accounts of living under the Nazi regime of World War II comes from the diary of a thirteen-year-old Jewish girl, Anne Frank. Frank and her family fled the horrors of Nazi occupation by hiding in the back of a warehouse in Amsterdam for two years with another family and a German dentist. Aged thirteen when she went into the secret annexe, Anne kept a diary. She movingly revealed how the eight people living under these extraordinary conditions coped with hunger, the daily threat of discovery and death and being cut off from the outside world, as well as petty misunderstandings and the unbearable strain of living like prisoners.',
      genre: ['Autobiography, True Stories, Diaries'],
      bookType: 'Novel',
      image: 'https://cdn.waterstones.com/bookjackets/large/9780/2419/9780241952443.jpg',
      rating: 5,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'The Shining',
      author: 'Stephen King',
      description: 'Danny is only five years old, but in the words of old Mr Hallorann he is a "shiner", aglow with psychic voltage. When his father becomes caretaker of the Overlook Hotel, Danny\'s visions grow out of control.',
      genre: ['Science Fiction, Fantasy, Horror, Ghost Stories'],
      bookType: 'Novel',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/4447/9781444720723.jpg',
      rating: 4,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'Maura\'s Game',
      author: 'Martina Cole',
      description: 'Maura Ryan was the queen of the criminal underworld when she pulled off the most audacious gold bullion robbery of all time. Since then, she\'s retired from a life of crime to be with the only man she\'s ever loved. But enemies from her past are closing in and they\'re about to learn that they should never cross Maura Ryan. The dangerous lady is back and she\'s as lethal as ever...',
      genre: ['Thriller, Crime, Mystery, Fiction'],
      bookType: 'Novel',
      image: 'https://cdn.waterstones.com/bookjackets/large/9780/7553/9780755374113.jpg',
      rating: 4,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'How to Fail',
      author: 'Elizabeth Day',
      description: 'This is a book for anyone who has ever failed. Which means it\'s a book for everyone.',
      genre: ['Self-help, Personal Development, True Stories, Autobiography'],
      bookType: 'Non-fiction',
      image: 'https://cdn.waterstones.com/bookjackets/large/9780/0083/9780008327354.jpg',
      rating: 4,
      user: users[2],
      category: 'Read'
    },
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      description: 'In his second year at Hogwarts School, our beloved hero comes face to face with the surreptitious legend of the Chamber of Secrets and embarks on another dizzying adventure with his trusted companions Ron and Hermione. The second, spellbinding instalment of J.K. Rowling’s celebrated Harry Potter series is a true modern classic, full of enchantment and thrill.',
      genre: ['Children\'s Book, Fiction, Fantasy'],
      bookType: 'Fiction',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/4088/9781408855669.jpg',
      rating: 5,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'The Chain',
      author: 'Adrian McKinty',
      description: 'In his second year at Hogwarts School, our beloved hero comes face to face with the surreptitious legend of the Chamber of Secrets and embarks on another dizzying adventure with his trusted companions Ron and Hermione. The second, spellbinding instalment of J.K. Rowling’s celebrated Harry Potter series is a true modern classic, full of enchantment and thrill.',
      genre: ['Crime', 'Fiction, Mystery, Thriller, Fiction'],
      bookType: 'Fiction',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/4091/9781409189602.jpg',
      rating: 5,
      user: users[1],
      category: 'Read'
    },
    {
      title: 'The Tattooist of Auschwitz',
      author: 'Heather Morris',
      description: 'A heartfelt tale of love born in darkness, inspired by the astonishing true story of Lale Sokolov, The Tattooist of Auschwitz is as remarkable as it is life-affirming. At times almost unbearably poignant, Morris’ deft approach to the most emotive subject matter is a triumph of empathetic storytelling.',
      genre: ['Biography, True Stories'],
      bookType: 'Fiction',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/7857/9781785763670.jpg',
      rating: 3,
      user: users[0],
      category: 'Read'
    },
    {
      title: 'The Flatshare',
      author: 'Beth O\'Leary',
      description: 'Tiffy Moore needs a cheap flat, and fast. Leon Twomey works nights and needs cash. Their friends think they\'re crazy, but it\'s the perfect solution: Leon occupies the one-bed flat while Tiffy\'s at work in the day, and she has the run of the place the rest of the time. With obsessive ex-boyfriends, demanding clients at work, wrongly imprisoned brothers and, of course, the fact that they still haven\'t met yet, they\'re about to discover that if you want the perfect home you need to throw the rulebook out the window...',
      genre: ['Young Adult, Fiction'],
      bookType: 'Fiction',
      image: 'https://cdn.waterstones.com/bookjackets/large/9781/7874/9781787474413.jpg',
      rating: 5,
      user: users[2],
      category: 'Read'
    }]
  )
    .then(output => {
      for (const item of output) {
        updateUpload(item)
      }
    })
}

function createRecipes(users) {
  return Cook.create([
    {
      title: 'Chicken & Chorizo Jambalaya',
      ingredients: [
        '1 tbsp olive oil'
        , '2 chicken breasts'
        , '1 chopped onion'
        , '1 red pepper'
        , '2 thinly sliced garlic cloves'
        , '75g crushed chorizo'
        , '1 tbsp sliced Cajun seasoning'
        , '250g long grain rice'
        , '400g can plum tomato'
        , '350ml chicken stock'
      ],
      description: 'A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes.',
      method: [
        'Heat 1 tbsp olive oil in a large frying pan with a lid and brown 2 chopped chicken breasts for 5-8 mins until golden.'
        , 'Remove and set aside. Tip in the 1 diced onion and cook for 3-4 mins until soft.'
        , 'Add 1 thinly sliced red pepper, 2 crushed garlic cloves, 75g sliced chorizo and 1 tbsp Cajun seasoning, and cook for 5 mins more.'
        , 'Stir the chicken back in with 250g long grain rice, add the 400g can of tomatoes and 350ml chicken stock. Cover and simmer for 20-25 mins until the rice is tender.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1274503_8.jpg?itok=y2r-R0BV',
      prepTime: '10 minutes',
      cookTime: '45 minutes',
      serves: '4',
      rating: 5,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[0],
      category: 'Cook'
    },
    {
      title: 'Chilli Con Carne',
      ingredients: [
        '1 large onion'
        , '1 red pepper'
        , '2 garlic cloves'
        , '1 tbsp oil'
        , '1 heaped tsp hot chilli powder (or 1 level tbsp if you only have mild)'
        , '1 tsp paprika'
        , '1 tsp ground cumin'
        , '500g lean minced beef'
        , '1 beef stock cube'
        , '400g can chopped tomatoes'
        , '½ tsp dried marjoram'
        , '1 tsp sugar'
        , '2 tbsp tomato purée'
        , '410g can red kidney beans'
        , 'plain boiled long grain rice'
        , 'soured cream'
      ],
      method: [
        'Prepare your vegetables. Chop 1 large onion into small dice, about 5mm square. The easiest way to do this is to cut the onion in half from root to tip, peel it and slice each half into thick matchsticks lengthways, not quite cutting all the way to the root end so they are still held together. Slice across the matchsticks into neat dice.'
        , 'Cut 1 red pepper in half lengthways, remove stalk and wash the seeds away, then chop. Peel and finely chop 2 garlic cloves.'
        , 'Start cooking. Put your pan on the hob over a medium heat. Add 1 tbsp oil and leave it for 1-2 minutes until hot (a little longer for an electric hob).'
        , 'Add the onion and cook, stirring fairly frequently, for about 5 minutes, or until the onion is soft, squidgy and slightly translucent.'
        , 'Tip in the garlic, red pepper, 1 heaped tsp hot chilli powder or 1 level tbsp mild chilli powder, 1 tsp paprika and 1 tsp ground cumin.'
        , 'Give it a good stir, then leave it to cook for another 5 minutes, stirring occasionally.'
        , 'Brown 500g lean minced beef. Turn the heat up a bit, add the meat to the pan and break it up with your spoon or spatula. The mix should sizzle a bit when you add the mince.'
        , 'Keep stirring and prodding for at least 5 minutes, until all the mince is in uniform, mince-sized lumps and there are no more pink bits. Make sure you keep the heat hot enough for the meat to fry and become brown, rather than just stew.'
        , 'Make the sauce. Crumble 1 beef stock cube into 300ml hot water. Pour this into the pan with the mince mixture.'
        , 'Add a 400g can of chopped tomatoes. Tip in ½ tsp dried marjoram, 1 tsp sugar and add a good shake of salt and pepper. Squirt in about 2 tbsp tomato purée and stir the sauce well.'
        , 'Simmer it gently. Bring the whole thing to the boil, give it a good stir and put a lid on the pan. Turn down the heat until it is gently bubbling and leave it for 20 minutes.'
        , 'Check on the pan occasionally to stir it and make sure the sauce doesn’t catch on the bottom of the pan or isn’t drying out. If it is, add a couple of tablespoons of water and make sure that the heat really is low enough. After simmering gently, the saucy mince mixture should look thick, moist and juicy.'
        , 'Drain and rinse a 410g can of red kidney beans in a sieve and stir them into the chilli pot. Bring to the boil again, and gently bubble without the lid for another 10 minutes, adding a little more water if it looks too dry.'
        , 'Taste a bit of the chilli and season. It will probably take a lot more seasoning than you think. '
        , 'Now replace the lid, turn off the heat and leave your chilli to stand for 10 minutes before serving. This is really important as it allows the flavours to mingle.'
        , 'Serve with soured cream and plain boiled long grain rice.'
      ],
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chilliconcarne_67875_16x9.jpg',
      prepTime: '10 minutes',
      cookTime: '60 minutes',
      serves: '4',
      description: 'An easy sharing favourite that uses up storecupboard ingredients.',
      rating: 3,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[1],
      category: 'Cook'
    },
    {
      title: 'Lincolnshire sausage & lentil simmer',
      ingredients: [
        '1 tbsp vegetable oil'
        , '130g packet cubed pancetta or dried bacon'
        , '2 packets Lincolnshire pork or other good sausages'
        , '2 roughly chopped onions'
        , '1 large carrot chopped into small pieces'
        , '4 garlic cloves roughly chopped'
        , '3 sprigs fresh rosemary'
        , '300g Puy lentils'
        , '850ml/1½pts hot chicken stock'
        , '1 tbsp white wine vinegar'
        , '400g can chopped tomatoes'
        , '2 tbsp chopped flatleaf parsley'
        , 'green winter salad with a mustardy dressing, to serve'
      ],
      method: [
        'Heat the oil in a large casserole or very large sauté pan with a lid. '
        , 'Add the pancetta and sausages and sizzle for 10 minutes, turning the sausages occasionally until nicely browned and sticky. '
        , 'Scoop the sausages out on to a plate.'
        , 'Add the onions, carrot and garlic to the pancetta and continue to cook for 3-4 minutes until the onions soften. '
        , 'Return the sausages to the pan and add the rosemary, lentils, stock, vinegar and tomatoes, then season with salt and pepper. '
        , 'Bring to the boil and simmer rapidly for 5 minutes, then lower the heat, cover and simmer for 45 minutes, stirring every so often until the lentils are tender. '
        , '(It can now be chilled and frozen for up to 1 month.) Check the seasoning, scatter over the parsley and serve from the pan with a winter leaf salad.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1403_11.jpg?itok=CwUM6dYf',
      prepTime: '0 minutes',
      cookTime: '85 minutes',
      serves: '6',
      description: 'A one-pot hearty stew to share with friends and family - you can make ahead and freeze it if you prefer',
      rating: 5,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[2],
      category: 'Cook'
    },
    {
      title: 'The best spaghetti bolognese recipe',
      ingredients: [
        '1 tbsp olive oil'
        , '4 rashers smoked streaky bacon, finely chopped'
        , '2 medium onions finely chopped'
        , '2 carrots trimmed and finely chopped'
        , '2 celery sticks, finely chopped'
        , '2 garlic cloves, finely chopped'
        , '2-3 sprigs rosemary leaves picked and finely chopped'
        , '500g beef mince for the bolognese sauce'
        , '2 x 400g tins plum tomatoes'
        , 'small pack basil leaves picked'
        , '¾ finely chopped and the rest left whole for garnish'
        , '1 tsp dried oregano'
        , '2 fresh bay leaves'
        , '2 tbsp tomato purée'
        , '1 beef stock cube'
        , '1 red chilli, deseeded and finely chopped (optional)'
        , '125ml red wine'
        , '6 cherry tomatoes sliced in half'
        , '75g parmesan grated, plus extra to serve'
        , '400g spaghetti'
      ],

      method: [
        'Put a large saucepan on a medium heat and add 1 tbsp olive oil.'
        , 'Add 4 finely chopped bacon rashers and fry for 10 mins until golden and crisp.'
        , 'Reduce the heat and add the 2 onions, 2 carrots, 2 celery sticks, 2 garlic cloves and the leaves from 2-3 sprigs rosemary, all finely chopped, then fry for 10 mins. Stir the veg often until it softens.'
        , 'Increase the heat to medium-high, add 500g beef mince and cook stirring for 3-4 mins until the meat is browned all over.'
        , 'Add 2 tins plum tomatoes, the finely chopped leaves from ¾ small pack basil, 1 tsp dried oregano, 2 bay leaves, 2 tbsp tomato purée, 1 beef stock cube, 1 deseeded and finely chopped red chilli (if using), 125ml red wine and 6 halved cherry tomatoes. Stir with a wooden spoon, breaking up the plum tomatoes.'
        , 'Bring to the boil, reduce to a gentle simmer and cover with a lid. Cook for 1 hr 15 mins stirring occasionally, until you have a rich, thick sauce.'
        , 'Add the 75g grated parmesan, check the seasoning and stir.'
        , 'When the bolognese is nearly finished, cook 400g spaghetti following the pack instructions.'
        , 'Drain the spaghetti and stir into the bolognese sauce. Serve with more grated parmesan, the remaining basil leaves and crusty bread, if you like.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/the-best-spaghetti-bolognese.jpg?itok=PH6AqY-g',
      prepTime: '25 minutes',
      cookTime: '110 minutes',
      serves: '6',
      description: 'Our best ever spaghetti bolognese is super easy and a true Italian classic with a meaty, chilly sauce.',
      rating: 5,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[0],
      category: 'Cook'
    },
    {
      title: 'Thai chicken curry',
      ingredients: [
        '6 skinless and boneless chicken breasts',
        '3 tbsp Thai red curry paste',
        '3 tbsp sunflower oil',
        '2 onions, sliced',
        '4cm/1½in knob of fresh root ginger, peeled and finely grated',
        '1 tbsp plain flour',
        '2 x 400g tins full-fat coconut milk',
        '1 tbsp Thai fish sauce',
        '1 tbsp light muscovado sugar',
        '1 lemon grass stalk, bashed (see tip)',
        '4 Kaffir lime leaves',
        '250g/9oz sugar snap peas, cut in half lengthways',
        '½ lime, zest and juice',
        '1 x 225g tin water chestnuts, drained, halved and quartered if large',
        'salt and freshly ground black pepper'
      ],
      method: [
        'Cut the chicken breasts in half and then into long thin slices.Tip into a bowl and add 1 tablespoon of the Thai curry paste, season with salt and freshly ground black pepper and mix.',
        'Heat 1 tablespoon of the sunflower oil in a deep frying pan, add the chicken slices and fry over a high heat for 5 minutes until just cooked through – you may need to do this in batches.Transfer the cooked chicken slices to a plate.',
        'Add the remaining oil to the pan and fry the onions for 3 minutes.Cover with a lid, lower the heat and cook for another 10 minutes to soften.',
        'Increase the heat and add the ginger with the remaining Thai curry paste and fry for a minute.Sprinkle in the flour and blend in the coconut milk with the fish sauce and sugar, adding a little at a time.Stir the mixture and bring to the boil.Add the lemon grass and lime leaves and season with salt and freshly ground black pepper.Return the chicken to the pan, bring back up to the boil and then cover, reduce the heat and simmer for about 5 minutes, or until piping hot.',
        'Meanwhile, cook the sugar snap peas in boiling salted water for 2 minutes, drain and refresh in cold water.',
        'Remove the lemon grass and lime leaves from the curry and discard.Add the lime zest and juice, water chestnuts and sugar snap peas.Bring to the boil, then remove from the heat and serve with rice.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035606_11.jpg?itok=3ny7oaux',
      prepTime: '5 minutes',
      cookTime: '10 minutes',
      serves: '2',
      description: 'Ever-versatile salmon is as popular on our shopping lists as chicken. Make the most of it with this impressive recipe.',
      rating: 3,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[2],
      category: 'Cook'
    },
    {
      title: 'Veggie shepherds pie with sweet potato mash',
      ingredients: [
        '1 tbsp olive oil'
        , '1 large onion halved and sliced'
        , '2 large carrots (500g/1lb 2oz in total), cut into sugar-cube size pieces'
        , '2 tbsp thyme chopped'
        , '200ml red wine'
        , '400g can chopped tomatoes'
        , '2 vegetable stock cubes'
        , '410g can green lentils'
        , '950g sweet potatoes peeled and cut into chunks'
        , '25g butter'
        , '85g vegetarian mature cheddar, grated'
      ],
      method: [
        'Heat 1 tbsp olive oil in a frying pan, then fry 1 halved and sliced large onion until golden.'
        , 'Add 2 large carrots, cut into sugar-cube size pieces and most of the 2 tbsp chopped thyme, reserving a sprinkling for later.'
        , 'Pour in 200ml red wine, 150ml water and a 400g chopped tomatoes, then crumble in 2 vegetable stock cubes and simmer for 10 mins.'
        , 'Tip in a 410g can green lentils, including the juice, then cover and simmer for another 10 mins until the carrots still have a bit of bite and the lentils are pulpy.'
        , 'Meanwhile, boil 950g sweet potatoes, cut into chunks, for 15 mins until tender, drain well, then mash with 25g butter and season to taste.'
        , 'Pile the lentil mixture into a pie dish, spoon the mash on top, then sprinkle over 85g grated vegetarian mature cheddar and the remaining thyme. The pie can now be covered and chilled for 2 days, or frozen for up to a month.'
        , 'Heat oven to 190C/170C fan/gas 5. Cook for 20 mins if cooking straightaway, or for 40 mins from chilled, until golden and hot all the way through. Serve with broccoli.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--560451_11.jpg?itok=ma2pok11',
      prepTime: '10 minutes',
      cookTime: '50-60 minutes',
      serves: '4',
      description: 'The secret to this shepherds pie is to choose big carrots so they dont lose their texture when cooked.',
      rating: 3,
      mealtype: 'Main meal',
      dietary: 'Vegetarian',
      user: users[1],
      category: 'Cook'
    },
    {
      title: 'Salmon & spinach with tartar cream',
      ingredients: [
        '1 tsp sunflower or vegetable oil'
        , '2 skinless salmon fillets'
        , '250g bag spinach'
        , '2 tbsp reduced-fat crème fraîche'
        , 'juice ½ lemon'
        , '1 tsp caper, drained'
        , '2 tbsp flat-leaf parsley, chopped'
        , 'lemon wedges, to serve'
      ],
      method: [
        'Heat the oil in a pan, season the salmon on both sides, then fry for 4 mins each side until golden and the flesh flakes easily. Leave to rest on a plate while you cook the spinach.'
        , 'Tip the leaves into the hot pan, season well, then cover and leave to wilt for 1 min, stirring once or twice. '
        , 'Spoon the spinach onto plates, then top with the salmon. '
        , 'Gently heat the crème fraîche in the pan with a squeeze of the lemon juice, the capers and parsley, then season to taste. Be careful not to let it boil. '
        , 'Spoon the sauce over the fish, then serve with lemon wedges.'
      ],
      image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--52867_12.jpg?itok=pnLXWqFK',
      prepTime: '5 minutes',
      cookTime: '10 minutes',
      serves: '2',
      description: 'Ever-versatile salmon is as popular on our shopping lists as chicken. Make the most of it with this impressive recipe.',
      rating: 4,
      mealtype: 'Main meal',
      dietary: 'none',
      user: users[2],
      category: 'Cook'
    },
    {
      title: 'Stuffed Portobello mushrooms with blue cheese',
      ingredients: [
        '2 portobello mushrooms, stalks removed and chopped',
        '50g/1¾oz unsalted butter',
        '2 sprigs fresh thyme',
        '1 tbsp olive oil',
        '½ onion, finely sliced',
        '2 garlic cloves, finely chopped',
        '½ pepper chopped',
        '50g/1¾oz mild vegetarian blue cheese',
        '50g/1¾oz white breadcrumbs',
        '50g/1¾oz fresh chives',
        'salt and freshly ground black pepper'
      ],
      method: [
        'Preheat the oven to 200C/180C Fan/Gas 6.',
        'Put the portobello mushrooms on a baking tray. Divide the unsalted butter between each mushroom. Season with salt and pepper and put a sprig of fresh thyme in both the mushrooms. Bake for 10 minutes.',
        'Heat the olive oil in a frying pan, add the onion and garlic and fry until soft. Add the chopped mushroom stalks and pepper and cook until softened.',
        'Spoon the mixture into the baked mushrooms. Put the blue cheese on top and sprinkle breadcrumbs all over. Roast the mushrooms for a further 6 minutes, or until the top is golden and bubbling.',
        'Put the mushrooms on a serving plate, sprinkle over the chopped chives and serve.'
      ],
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/stuffedportabellamus_85840_16x9.jpg',
      prepTime: '30 minutes or less',
      cookTime: '10-30 minutes',
      serves: '1',
      description: 'An easy starter for dinner parties or a simple meal for one served with some fresh crusty bread to mop up the juices.',
      rating: 3,
      mealtype: 'Side Dish',
      dietary: 'Vegetarian',
      user: users[0],
      category: 'Cook'
    },
    {
      title: 'One-pan gnocchi bake',
      ingredients: [
        '25g/1oz butter',
        '1 tbsp olive oil',
        '1 onion, finely sliced',
        '2 tbsp plain flour',
        '400ml/14fl oz milk, full-fat or semi-skimmed',
        '1 tsp mustard, Dijon or English',
        '150g/5½oz mature cheddar, coarsely grated',
        '500g/1lb 2oz shop-bought gnocchi',
        '200g/7oz frozen broccoli florets',
        '100g/3½ oz frozen peas',
        '12 cherry tomatoes, halved',
        'salt and freshly ground black pepper'
      ],
      method: [
        'Preheat the oven to 220C/200C Fan/Gas 7.',
        'Heat the butter and oil together in a shallow, flameproof casserole over a low heat. Add the onion and cook for 5 minutes, stirring regularly until softened.',
        'Sprinkle over the flour and stir well then gradually add the milk, just a little at a time, stirring well between each addition to make a smooth sauce. Stir in the mustard and half of the cheese. Season to taste with salt and pepper.',
        'Stir in the gnocchi, broccoli, peas and tomatoes and bring to a gentle simmer, stirring.',
        'Sprinkle over the remaining cheese and bake in the oven for 12–15 minutes, or until golden-brown and bubbling. Carefully remove from the oven and serve.'
      ],
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/gnocchi_pasta_bake_51351_16x9.jpg',
      prepTime: 'less than 30 minutes',
      cookTime: '10 minutes',
      serves: '4',
      description: 'A gnocchi bake is a super comforting and easy one-pan family dinner. A bit like a pasta bake just using a bag of gnocchi and some veggies straight out of the freezer. The great thing about only using one pan is you hardly have to wash up!',
      rating: 4,
      mealtype: 'Main',
      dietary: 'Vegetarian',
      user: users[1],
      category: 'Cook'
    },
    {
      title: 'Blood orange tart',
      ingredients: [
        '200g/7oz sugar, plus extra for dusting',
        '3 blood oranges, juice and zest',
        '1 tsp orange blossom water',
        '2 free-range eggs, plus 6 yolks',
        '200g/7oz butter, cubed',
        '25cm/10in sweetened shortcrust pastry tart shell, blind baked (you can use ready-made)',
        ['3 blood oranges, peeled, sliced into rounds',
          '1 tbsp demerara sugar',
          'double cream or custard, to serve']
      ],
      method: [
        'Whisk the sugar, orange juice and zest, orange blossom water, eggs and egg yolks together in a bowl until well combined.',
        'Add the butter and set over a pan over simmering water. (Do not let the base of the bowl touch the water.)',
        'Cook for 15-20 minutes, stirring regularly, until the butter has melted and the mixture has thickened.',
        'Arrange the orange slices on the cooled tart and sprinkle over the demerara sugar.',
        'Using a cooks blowtorch, heat the sugar until caramelised.',
        'To serve, slice the tart and serve with double cream or custard.'
      ],
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/bloodorangetart_93766_16x9.jpg',
      prepTime: '30 minutes',
      cookTime: '2 hours',
      serves: '8',
      description: 'How beautiful is this tart? The season for blood oranges is short, so don\'t miss the chance to try this.',
      rating: 5,
      mealtype: 'Dessert',
      dietary: 'Vegetarian',
      user: users[2],
      category: 'Cook'
    },
    {
      title: 'Stress-free full English Breakfast',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/stressfreefullenglis_67721_16x9.jpg',
      ingredients: [
        '2 sausages',
        '2-3 rashers of bacon',
        '2 flat mushrooms',
        '1-2 ripe tomatoes',
        '1 thick slice of black pudding',
        '1 large egg',
        '1 slice of bread'
      ],
      method: [
        'Heat the flat grill plate over a low heat, on top of 2 rings/flames if it fits, and brush sparingly with light olive oil.',
        'Cook the sausages first. Add the sausages to the hot grill plate/the coolest part if there is one and allow to cook slowly for about 15-20 minutes, turning occasionally, until golden. After the first 10 minutes, increase the heat to medium before beginning to cook the other ingredients. If you are struggling for space, completely cook the sausages and keep hot on a plate in the oven.',
        'Snip a few small cuts into the fatty edge of the bacon. Place the bacon straight on to the grill plate and fry for 2-4 minutes each side or until your preferred crispiness is reached. Like the sausages, the cooked bacon can be kept hot on a plate in the oven.',
        'For the mushrooms, brush away any dirt using a pastry brush and trim the stalk level with the mushroom top. Season with salt and pepper and drizzle over a little olive oil. Place stalk-side up on the grill plate and cook for 1-2 minutes before turning and cooking for a further 3-4 minutes. Avoid moving the mushrooms too much while cooking, as this releases the natural juices, making them soggy.',
        'For the tomatoes, cut the tomatoes across the centre/or in half lengthways if using plum tomatoes , and with a small, sharp knife remove the green eye. Season with salt and pepper and drizzle with a little olive oil. Place cut-side down on the grill plate and cook without moving for 2 minutes. Gently turn over and season again. Cook for a further 2-3 minutes until tender but still holding their shape.',
        'For the black pudding, cut the black pudding into 3-4 slices and remove the skin. Place on the grill plate and cook for 1½-2 minutes each side until slightly crispy.',
        'For proper fried bread it\'s best to cook it in a separate pan. Ideally, use bread that is a couple of days old. Heat a frying pan to a medium heat and cover the base with oil. Add the bread and cook for 2-3 minutes each side until crispy and golden. If the pan becomes too dry, add a little more oil. For a richer flavour, add a knob of butter after you turn the slice.',
        'For the fried eggs, break the egg straight into the pan with the fried bread and leave for 30 seconds. Add a good knob of butter and lightly splash/baste the egg with the butter when melted. Cook to your preferred stage, season and gently remove with a fish slice.',
        'Once all the ingredients are cooked, serve on warm plates and enjoy straight away with a good squeeze of tomato ketchup or brown sauce.'
      ],
      prepTime: 'less than 30 minutes',
      cookTime: '10 - 30 minutes',
      serves: '1',
      description: 'A proper fry-up is a very personal thing, so feel free to swap in and out what you like best.',
      rating: 5,
      mealtype: 'Breakfast',
      dietary: 'none',
      user: users[1],
      category: 'Cook'
    },
    {
      title: 'Avocado, tomato, feta and brown rice grain bowl',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/avocado_tomato_feta_and_25906_16x9.jpg',
      ingredients: [
        '50g/1¾oz brown rice',
        '1 spring onion, sliced',
        '1 tomato, sliced',
        '½ avocado, sliced',
        '30g/1oz feta, crumbled',
        '2 sprigs coriander, leaves picked',
        '1 tbsp extra virgin olive oil',
        'salt and freshly ground black pepper'
      ],
      method: [
        'Cook the rice according to packet instructions, then drain.',
        'Place the rice in the bowl you plan to eat from. Add the spring onion, tomato, avocado, feta and coriander.',
        'Drizzle liberally with the oil and season with salt and pepper. Eat straight away or pack in your lunchbox ready to take to work.'
      ],
      prepTime: 'less than 30 minutes',
      cookTime: 'No cooking required',
      serves: '1',
      rating: 5,
      description: 'This tasty lunch is a really easy way to work more vegetables into your daily diet. If you’re taking it to work you might want to take the avocado whole and cut just before eating.',
      mealtype: 'Light Meal/Snack',
      dietary: 'Vegetarian',
      user: users[0],
      category: 'Cook'
    },
    {
      title: 'Soda bread',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/soda_bread_41394_16x9.jpg',
      ingredients: [
        '370g/13oz plain flour, plus extra for dusting',
        '130g/4½oz wholemeal flour',
        '1 tsp bicarbonate of soda',
        '1 tsp salt',
        '40g/1½oz butter, melted',
        '1 tbsp black treacle',
        '300–340ml/11–12fl oz buttermilk (or alternatively use warm milk plus 1 tbsp lemon juice)'
      ],
      method: [
        'Preheat the oven to 200C/400F/Gas 6 and ensure the top shelf in the oven is in position.',
        'Place the flours, bicarbonate of soda and salt into a large bowl and stir together. Make a large hole in the centre of the flour mixture and pour in the melted butter and treacle, plus enough of the buttermilk to make a loose sticky dough.',
        'Tip the dough onto a lightly dusted work surface. The dough will be quite sticky. Knead the dough for one minute, then shape it into a large ball with a taut, smooth top. Place the dough on a baking tray and flatten it a bit - I find the easiest way to do this is with a rolling pin.',
        'Take a wooden spoon, put some flour over the whole handle, then hold it horizontally over the bread. Put the wooden spoon handle on top of the bread then push it down until you feel the baking tray at the bottom. This mark is the first half of the trademark soda bread cross. Repeat with a line at right angles to this.',
        'Dust with some flour then bake in the oven for 30–40 minutes, or until the bread is brown, has risen nicely and the dough inside where the cross was made is not damp.',
        'Serve fresh from the oven with butter and jam. This bread does not keep well, so is best eaten on the day that it is baked – but if you have any left, it does make good toast.'
      ],
      prepTime: 'Less than 30 minutes',
      cookTime: '30 minutes to 1 hour',
      serves: '1 Loaf',
      rating: 5,
      description: 'Soda bread is perhaps the easiest bread to make by hand - with little kneading and no waiting around for it to rise. Treacle gives it an earthy taste, darkens the crumb and crisps up the crust.',
      mealtype: 'Baking',
      dietary: 'Vegetarian',
      user: users[2],
      category: 'Cook'
    },
    {
      title: 'Chocolate pot with ginger',
      image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chocolate_pot_with_54547_16x9.jpg',
      ingredients: [
        '150ml/5fl oz double cream',
        '½ vanilla pod, split in half lengthways, seeds scraped with a sharp knife',
        '100ml/3½fl oz milk',
        '125g/4oz dark chocolate (70 per cent cocoa solids), broken into pieces',
        '2 free-range egg yolks',
        '1 heaped tbsp icing sugar',
        '1 rounded tsp ground ginger',
        '30g/1oz preserved stem ginger, chopped into small pieces'
      ],
      method: [
        'Preheat the oven to 140C/275F/Gas 1.',
        'Warm the cream and vanilla pod and seeds in a saucepan. Whisk lightly to disperse the vanilla seeds, turn off the heat and cover with a lid. Set aside to infuse for 30 minutes.       ',
        'Meanwhile, over a low heat, melt the chocolate in the milk in a small saucepan.      ',
        'Beat the egg yolks, icing sugar and ground ginger together in a large bowl until light and fluffy. Add the chocolate mixture and vanilla-infused cream, remove the vanilla pod and whisk together until well combined.      ',
        'Place the chopped ginger and a little ginger syrup into the bottom of the ramekins. Top with the chocolate mixture. Place the ramekins into a deep roasting tin and pour in enough hot water to come up to at least two-thirds up the side of the pots. Bake for 45-60 minutes, or until slightly puffed-up and spongy to the touch of a finger. The surface of the pot should form a little crust.        ',
        'Remove the pots from the oven, allow to cool for a few moments and lift the pots from the water onto a clean tray. Chill in the fridge for at least six hours before serving. Serve straight from the fridge.'
      ],
      prepTime: '30 minutes to an hour',
      cookTime: '30 minutes to an hour',
      serves: '6',
      rating: 5,
      description: 'This easy chocolate recipe made with stem ginger is a perfect dinner party dessert.',
      mealtype: 'Dessert',
      dietary: 'Vegetarian',
      user: users[1],
      category: 'Cook'
    },
    {
      title: 'Vegan jerk jackfruit burger',
      image: 'data:image/jpeg;base64,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',
      ingredients: [
        '400g tin jackfruit',
        '5 tbsp ready-made jerk barbecue marinade',
        '¼ red cabbage, shredded',
        '1 carrot, peeled and ribboned with a peeler',
        '2 spring onions, finely chopped',
        '5 tbsp vegan mayonnaise',
        '2 vegan burger buns or mini ciabattas, cut in half',
        'squeeze fresh lime',
        '1 tbsp chopped fresh coriander',
        'salt and freshly ground black pepper'
      ],
      method: [
        'Preheat the oven to 200C/180C Fan/Gas 6.',
        'Rinse and drain the jackfruit and put into a bowl. Use a fork to shred the pieces into strings. Add the jerk barbecue marinade and stir to coat.',
        'Cover a baking tray with foil and brush with a little vegetable oil. Transfer the jackfruit on to the baking tray in a single layer and bake for 15–20 minutes, until the jackfruit has crisped up at the edges and is hot through.       ',
        'Meanwhile, put the onion, cabbage and carrot in a bowl and mix with enough vegan mayonnaise to make a coleslaw. Season with salt and pepper.       ',
        'Build your burgers with the slaw and barbecue jerk jackfruit and serve.'
      ],
      prepTime: 'less than 30 minutes',
      cookTime: '30 minutes to an 1 hour',
      serves: '2',
      rating: 5,
      description: 'Jackfruit is a great vegan alternative to pork and works perfectly with jerk seasoning. You can use fresh or tinned for this recipe. Make your own homemade vegan mayonnaise in seconds and save money.',
      mealtype: 'Main Course',
      dietary: 'Vegan',
      user: users[0],
      category: 'Cook'
    }
  ])
    .then(output => {
      for (const item of output) {
        updateUpload(item)
      }
    })
}

function createWatch(users) {
  return Watch.create([
    {
      title: 'Parasite',
      image: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      genre: 'Thriller, Drama, Dark Comedy',
      trailer: 'https://movietrailers.apple.com/movies/independent/parasite/parasite-trailer-1_i320.m4v',
      description: 'A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.',
      duration: '132 minutes',
      director: 'Bong Joon Ho',
      rating: 4,
      certification: '15',
      user: users[2],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Mad Max: Fury Road',
      image: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      genre: 'Action, Doomsday, Adventure, Science Fiction',
      trailer: 'http://videos.hd-trailers.net/Mad_Max_Fury_Road_2015_Trailer_F4_5.1-1080p-HDTN.mp4',
      description: 'Sets in apost-apocalyptic wasteland, a woman rebels against the tyrannical ruler in search of her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
      duration: '120 minutes',
      director: ' George Miller',
      rating: 4,
      certification: '15',
      user: users[2],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Toy Story 3',
      image: 'https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SY1000_CR0,0,707,1000_AL_.jpg',
      genre: 'Animation, Family, Comedy, Fantasy',
      trailer: 'http://trailers.apple.com/movies/disney/toystory3/toystory3-tlr3_h1080p.mov',
      description: 'Plot focuses on Woody, Buzz Lightyear and the other remaining toys accidentally donated to a daycare center, while Andy, now 17 years old, preparing to leave for college, and their ensuing race to get home before Andy leaves.',
      duration: '103 minutes',
      director: 'Lee Unkrich',
      rating: 4,
      certification: 'PG',
      user: users[1],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Birds of Prey',
      image: 'https://m.media-amazon.com/images/M/MV5BMzQ3NTQxMjItODBjYi00YzUzLWE1NzQtZTBlY2Y2NjZlNzkyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      genre: 'Action, Adventure, Crime',
      trailer: 'https://movietrailers.apple.com/movies/wb/birds-of-prey/birds-of-prey-trailer-1_i320.m4v',
      description: 'After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.',
      duration: '109 minutes',
      director: 'Cathy Yan',
      rating: 3,
      certification: '15',
      user: users[1],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Crazy Rich Asians',
      image: 'https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      genre: 'Comedy, Drama, Romance',
      trailer: 'http://movietrailers.apple.com/movies/wb/crazy-rich-asians/crazy-rich-asians-trailer-1_h1080p.mov',
      description: 'This contemporary romantic comedy, based on a global bestseller, follows native New Yorker Rachel Chu to Singapore to meet her boyfriend\'s family.',
      duration: '120 minutes',
      director: 'Jon M. Chu',
      rating: 3.5,
      certification: '12A',
      user: users[2],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Game of Thrones',
      image: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SY1000_CR0,0,734,1000_AL_.jpg',
      genre: 'Action, Adventure, Drama',
      trailer: 'http://movietrailers.apple.com/movies/independent/got5/thewheel-got-acard_h1080p.mov',
      description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
      seasons: '8',
      director: 'David Benioff, D.B. Weiss',
      rating: 4.5,
      certification: '18',
      user: users[2],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Captain America: Civil War',
      image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg',
      genre: 'Action, Drama,',
      trailer: 'https://movietrailers.apple.com/movies/marvel/captainamericacivilwar/captainamericacivilwar-us-clp_justlikewepracticed_i320.m4v',
      description: 'A disagreement over international oversight of the Avengers fractures them into opposing factions—one led by Steve Rogers and the other by Tony Stark.',
      duration: '147 minutes',
      director: 'The Russo Brothers',
      rating: 4,
      certification: '12A',
      user: users[0],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Gilmore Girls',
      image: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SY1000_CR0,0,734,1000_AL_.jpg',
      genre: 'Comedy, Drama',
      description: 'A dramedy centering around the relationship between a thirtysomething single mother and her teen daughter living in Stars Hollow, Connecticut.',
      seasons: '7',
      director: 'Amy Sherman-Palladino',
      rating: 5,
      certification: '18',
      user: users[1],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Riverdale',
      image: 'https://m.media-amazon.com/images/M/MV5BNDYxOTU0NDYtYzg2MC00YzgyLTg1YzctMDc1MGJmOGIzMTc3XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Crime, Drama, Mystery',
      description: 'While navigating the troubled waters of romance, school and family, Archie and his gang become entangled in dark Riverdale mysteries.',
      seasons: '4',
      director: 'Roberto Aguiree-Sacasa',
      rating: 5,
      certification: '15',
      user: users[2],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'The Trials of Gabriel Fernandez',
      image: 'https://m.media-amazon.com/images/M/MV5BM2JjMmIzOWUtNGM1Mi00MTVjLTllYzctZTJlNjBjZjZlNzhkXkEyXkFqcGdeQXVyMTkxMzMyMTI@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Crime, Documentary',
      description: 'Filmmaker Brian Knappenberger investigates the tragic death of an 8-year-old California boy who endured horrific abuse by his mother and her boyfriend, along with the fractured and complex systems that failed to protect him.',
      seasons: '1',
      director: 'Brian Knappenberger',
      rating: 3,
      certification: '18',
      user: users[0],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Suits',
      image: 'https://m.media-amazon.com/images/M/MV5BNmVmMmM5ZmItZDg0OC00NTFiLWIxNzctZjNmYTY5OTU3ZWU3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR0,0,182,268_AL_.jpg',
      genre: 'Comedy, Drama',
      description: 'On the run from a drug deal gone bad, brilliant college dropout Mike Ross, finds himself working with Harvey Specter, one of New York City\'s best lawyers.',
      seasons: '9',
      director: 'Aaron Korsh',
      rating: 5,
      certification: '15',
      user: users[2],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Locke & Key',
      image: 'https://m.media-amazon.com/images/M/MV5BNjZkNzY4M2ItOWY0Ni00Y2ViLWE1NjItOTIyYzZjMzg5M2E1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Fantasy, Drama, Horror',
      description: 'After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse, which they discover is full of magical keys that may be connected to their father\'s death.',
      seasons: '1',
      director: 'Merdith Averill',
      rating: 2,
      certification: '15',
      user: users[1],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Friends',
      image: 'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY268_CR0,0,182,268_AL_.jpg',
      genre: 'Comedy, Romance',
      description: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
      seasons: '10',
      director: 'David Crane',
      rating: 5,
      certification: '15',
      user: users[0],
      category: 'Watch',
      subcategory: 'TV Series'
    },
    {
      title: 'Joker',
      image: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Crime, Drama, Thriller',
      description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
      duration: '2h 2minutes',
      director: 'Todd Phillips',
      rating: 5,
      certification: '15',
      user: users[1],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Avengers: Endgame',
      image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Action, Adventure, Drama',
      description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
      trailer: 'https://movietrailers.apple.com/movies/marvel/avengers-endgame/avengers-endgame-featurette-to-the-end-edit-usca_i320.m4v',
      duration: '3h 1minutes',
      director: 'The Russo Brothers',
      rating: 5,
      certification: '12A',
      user: users[2],
      category: 'Watch',
      subcategory: 'Film'
    },
    {
      title: 'Crazy Ex-Girlfriend',
      image: 'https://m.media-amazon.com/images/M/MV5BYjQ0MjNiYjItMWFkNC00MTI5LTlhYTEtZWY3OGJhN2VhZjBmXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: 'Comedy, Musical',
      description: 'A young woman abandons a choice job at a law firm and her life in New York in an attempt to find happiness in the unlikely locale of West Covina, California.',
      seasons: '4',
      director: 'Rachel Bloom',
      rating: 5,
      certification: '12A',
      user: users[0],
      category: 'Watch',
      subcategory: 'TV Series'
    },
  ])
    .then(output => {
      for (const item of output) {
        updateUpload(item)
      }
    })
}

function createPlay(users) {
  return Play.create([
    {
      title: 'Sims 4',
      image: 'https://s3.gaming-cdn.com/images/products/272/271x377/the-sims-4-cover.jpg',
      description: 'The Sims 4 is a life simulation game, players create a Sim character and control their life to explore different personalities which change the way the game plays out.',
      genre: 'Simulation',
      rating: 5,
      players: 'Single-Player',
      subcategory: 'Computer Game',
      format: 'PC',
      duration: '2+ hours',
      link: 'https://www.ea.com/en-gb/games/the-sims/play-with-life?utm_campaign=sims4_brd_uk_m6_srch_ggl_pwls&utm_source=google&utm_medium=search&cid=62725&ts=1583265723484',
      user: users[0],
      category: 'Play'
    },
    {
      title: 'Monopoly Deal',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81I510mHHwL._AC_SX679_.jpg',
      players: 'Multiplayer',
      genre: 'Card, available as a video game',
      subcategory: 'Card Game',
      description: 'The Monopoly Brand Deal Card Game is all the fun of the Monopoly game in a quick-playing card game. It comes with 110 cards including Property Cards, Rent Cards, House and Hotel Cards, and Wild Property Cards. Action Cards let players do things such as charge rent and make tricky deals. House and Hotel Cards raise rent values. Wild Property Cards help players build Property sets. And, players pay their debts with Money Cards. Be the first player to collect 3 complete Property Card sets in different colours to win. This card game is a great way to play the Fast-Dealing Property Trading Game in as little as 15 minutes! The Hasbro Gaming, Parker Brothers, and Monopoly names and logos, the distinctive design of the gameboard, the four corner squares, the Mr. Monopoly name and character, as well as each of the distinctive elements of the board and playing pieces are trademarks of Hasbro for its property trading game and game equipment',
      format: 'Card',
      rating: '5',
      category: 'Play',
      duration: '15 minutes',
      user: users[2]
    },
    {
      title: 'Tetris',
      image: 'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2017/06/shutterstock_316193825.jpg',
      players: 'Single-Player',
      description: 'Tetris is a video game developed in the Soviet Union in 1984. The game has a simple goal of destroying lines of block before it reaches the top. The line is made up of a square block. Tetrominoes is the shape of the 4 connected blocks that falls vertically down.',
      genre: 'Video Game',
      rating: 5,
      subcategory: 'Computer Game',
      format: 'PC',
      duration: '2+ hours',
      link: 'https://patrickcfwhite.github.io/project-1/',
      user: users[0],
      category: 'Play'
    },
    {
      title: 'Pacman',
      image: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.todayifoundout.com%2Findex.php%2F2013%2F08%2Fthe-history-of-pac-man%2F&psig=AOvVaw33Fw-2JzbYf-r-fTzSho_g&ust=1585395325670000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIi5hP3HuugCFQAAAAAdAAAAABAJ',
      players: 'Single-Player',
      description: 'Pac-Man is a maze chase video game. The player controls the titular character through an enclosed maze; the objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts — Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) — that pursue him. When all of the dots are eaten, the player advances to the next level. If Pac-Man makes contact with a ghost, he will lose a life; the game ends when all lives are lost. Each of the four ghosts have their own unique, distinct artificial intelligence (A.I.), or "personalities"; Blinky gives direct chase to Pac-Man, Pinky and Inky try to position themselves in front of Pac-Man, usually by cornering him, and Clyde will switch between chasing Pac-Man and fleeing from him.',
      genre: 'Video Game',
      rating: 5,
      subcategory: 'Computer Game',
      format: 'PC',
      duration: '2+ hours',
      link: 'https://seangpachareonsub.github.io/project-1/',
      user: users[2],
      category: 'Play'
    },
    {
      title: 'Animal Crossing New Horizons',
      image: 'https://en.wikipedia.org/wiki/File:Animal_Crossing_New_Horizons.jpg',
      players: 'Multiplayer',
      description: 'New Horizons is a nonlinear life simulation game played in real-time. The player assumes the role of a customizable character who moves to a deserted island after purchasing a vacation package from Tom Nook, a tanuki character who is a staple of the series.',
      genre: 'Simulation Game',
      rating: 5,
      subcategory: 'Other',
      format: 'Console',
      duration: '2+ hours',
      user: users[2],
      category: 'Play'
    },
    {
      title: 'Grand Theft Auto V',
      image: 'https://en.wikipedia.org/wiki/File:Grand_Theft_Auto_V.png',
      players: 'Single-Player',
      description: 'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.',
      genre: 'Video Game',
      rating: 4,
      subcategory: 'Computer Game, Video Game',
      format: 'PC, Playstation 3, Xbox 260, Playstation 3, Xbox One',
      duration: '2+ hours',
      user: users[0],
      category: 'Play'
    },
    {
      title: 'Wii Sports',
      image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Wii_Sports_Europe.jpg',
      players: 'Multiplayer',
      description: 'The game is a collection of five sports simulations, designed to demonstrate the motion-sensing capabilities of the Wii Remote. The five sports included are tennis, baseball, bowling, golf and boxing.',
      genre: 'Video Game',
      rating: 4,
      subcategory: 'Video Game',
      format: 'Wii',
      duration: '2+ hours',
      user: users[1],
      category: 'Play'
    },
    {
      title: 'The Witcher',
      image: 'https://upload.wikimedia.org/wikipedia/en/b/b0/The_Witcher_EU_box.jpg',
      players: 'Single-Player',
      description: 'The Witcher is an action role-playing game based on the novel of the same title. The story follows Geralt of Rivia, one the last remaining monster hunters with special abilities primarily known as Witchers.',
      genre: 'Action Role-Playing Game',
      rating: 4,
      subcategory: 'Computer Game',
      format: 'PC',
      duration: '2+ hours',
      user: users[2],
      category: 'Play'
    },
    {
      title: 'Assassin\'s Creed Odyssey',
      image: 'https://upload.wikimedia.org/wikipedia/en/9/99/ACOdysseyCoverArt.png',
      players: 'Single-Player',
      description: 'Assassin\'s Creed Odyssey is the 21st overall major installment in the Assassin\'s Creed series. The plot tells a fictional history of the Peloponnesian War between Athens and Sparta where the player is able to choose between siblings Alexios and Kassandra as to whom they use as the main character.',
      genre: 'Action Role-Playing Game',
      rating: 5,
      subcategory: 'Computer Game, Video Game',
      format: 'PC, Playstation 4, Xbox One',
      duration: '2+ hours',
      user: users[0],
      category: 'Play'
    },
    {
      title: 'Card\'s Against Humanity ',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Cards_Against_Humanity_logo.png/440px-Cards_Against_Humanity_logo.png',
      players: 'Multiplayer',
      description: 's a party game in which players complete fill-in-the-blank statements using words or phrases typically deemed as offensive, risqué or politically incorrect printed on playing cards.',
      genre: 'Party Game',
      rating: 5,
      subcategory: 'Card Game',
      duration: '2+ hours',
      user: users[1],
      category: 'Play'
    },
    {
      title: 'League of Legends',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/League_of_Legends_logo_2019.png/440px-League_of_Legends_logo_2019.png',
      players: 'Multiplayer',
      description: 'League of Legends (LoL) is a multiplayer online battle arena video game, players assume the role of a "champion" with unique abilities and battle against a team of other player- or computer-controlled champions. The goal is usually to destroy the opposing team\'s "Nexus", a structure that lies at the heart of a base protected by defensive structures, although other distinct game modes exist as well with varying objectives, rules, and maps',
      genre: 'Video Game',
      rating: 3,
      subcategory: 'Computer Game',
      format: 'PC',
      duration: '2+ hours',
      user: users[2],
      category: 'Play'
    },
    {
      title: 'UNO',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/440px-UNO_Logo.svg.png',
      players: 'Multiplayer',
      description: 'The aim of the game is to be the first player to score 500 points, achieved by being the first to play all of one\'s own cards and scoring points for the cards still held by the other players.',
      genre: 'Family Game',
      rating: 4,
      subcategory: 'Card Game',
      duration: '2+ Hours',
      user: users[0],
      category: 'Play'
    }
  ])
    .then(output => {
      for (const item of output) {
        updateUpload(item)
      }
    })
}

module.exports = {
  createBooks,
  createRecipes,
  createWatch,
  createPlay
}