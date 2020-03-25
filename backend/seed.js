const mongoose = require('mongoose')
const Read = require('./models/read')
const Cook = require('./models/cook')
const dbURI = 'mongodb://localhost/activity-db'

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Ready to seed database!')
    db.dropDatabase()
      .then(() => {
        return Read.create([
          {
            name: '1984',
            author: 'George Orwell',
            description: 'Winston Smith wrestles with oppression in Oceania, a place where the Party scrutinizes human actions with ever-watchful Big Brother. Defying a ban on individuality, Winston dares to express his thoughts in a diary and pursues a relationship with Julia. These criminal deeds bring Winston into the eye of the opposition, who then must reform the nonconformist',
            genre: ['Dystopian, Political fiction, Social Science'],
            bookType: 'Novel'
          },
          {
            name: 'Lord of the Flies',
            author: 'William Golding',
            description: 'Lord of the Flies is an allegorical novel about a group of schoolboys stranded on a deserted island without any adult supervision. Free from the restraints of society, the boys form their own civilization, which quickly descends into chaos and violence.',
            genre: ['Allegory, Novel'],
            bookType: 'Novel'
          },
          {
            name: 'The Curious Incident of the Dog in the Night-Time',
            author: 'Simon Stephens',
            description: 'Christopher Boone, a 15 year old who suffers from Aspergers syndrome, finds the neighbours dog murdered and he sets out on a journey which will turn his whole life upside down.',
            genre: ['Novel, Mystery, Bildungsroman, Crime Fiction'],
            bookType: 'Novel'
          },
          {
            name: 'Holes',
            author: 'Louis Sachar',
            description: 'Stanley Yelnats, a boy who has bad luck due to a curse placed on his great- great-grandfather, is sent to Camp Green Lake, a juvenile detention camp, for a crime he did not commit. Stanley and the other boys at the camp are forced to dig large holes in the dirt every day.',
            genre: ['Adventure, Young adult fiction, Novel'],
            bookType: 'Novel'
          },
          {
            name: 'A Clockwork Orange',
            author: 'Anthony Burgess',
            description: 'Alex and his Droogs spend their nights getting high at the Korova Milkbar before getting up to no good. After being jailed for bludgeoning the Cat Lady to death, Alex submits to behaviour modification technique to earn his freedom and is conditioned to abhor violence. Returned to the world defenseless, Alex becomes the victim of his prior victims.',
            genre: ['Science fiction, Drama, Mystery, Crime'],
            bookType: 'Novel'
          },
          {
            name: 'Pachinko',
            author: 'Min Jin Lee',
            description: 'Pachinko follows one Korean family through the generations, beginning in the early 1900s Korea with Sunja, the prized daughter of a porr yet proud famile, whose unplanned pregnancy threatens to shame them all. Deserted by her lover, SUnja is saved when a young tubercular minister offers to marry and bring her to Japan.',
            genre: ['Novel, Historical fiction, Domestic Fiction'],
            bookType: 'Novel'
          }
        ])
      })
      .then(books => console.log(`${'📚'.repeat(books.length)} created!`))
      .then(() => {
        return Cook.create([
          {
            name: 'Chicken & Chorizo Jambalaya',
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
            method: [
              'Heat 1 tbsp olive oil in a large frying pan with a lid and brown 2 chopped chicken breasts for 5-8 mins until golden.'
              , 'Remove and set aside. Tip in the 1 diced onion and cook for 3-4 mins until soft.'
              , 'Add 1 thinly sliced red pepper, 2 crushed garlic cloves, 75g sliced chorizo and 1 tbsp Cajun seasoning, and cook for 5 mins more.'
              , 'Stir the chicken back in with 250g long grain rice, add the 400g can of tomatoes and 350ml chicken stock. Cover and simmer for 20-25 mins until the rice is tender.'
            ],
            prepTime: '10 minutes',
            cookTime: '45 minutes',
            serves: '4',
            description: 'A Cajun-inspired rice pot recipe with spicy Spanish sausage, sweet peppers and tomatoes.'
          },
          {
            name: 'Chilli Con Carne',
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
            prepTime: '10 minutes',
            cookTime: '60 minutes',
            serves: '4',
            description: 'An easy sharing favourite that uses up storecupboard ingredients.',
          },
          {
            name: 'Licolnshire sausage & lentil simmer',
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
            prepTime: '0 minutes',
            cookTime: '85 minutes',
            serves: '6',
            description: 'A one-pot hearty stew to share with friends and family - you can make ahead and freeze it if you prefer'
          },
          {
            name: 'The best spaghetti bolognese recipe',
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

            prepTime: '25 minutes',
            cookTime: '110 minutes',
            serves: '6',
            description: 'Our best ever spaghetti bolognese is super easy and a true Italian classic with a meaty, chilly sauce.'
          },
          {
            name: 'Salmon & spinach with tartatre cream',
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
            prepTime: '5 minutes',
            cookTime: '10 minutes',
            serves: '2',
            description: 'Ever-versatile salmon is as popular on our shopping lists as chicken. Make the most of it with this impressive recipe.'
          },
          {
            name: 'Veggie shepherds pie with sweet potato mash',
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
            prepTime: '10 minutes',
            cookTime: '50-60 minutes',
            serves: '4',
            description: 'The secret to this shepherds pie is to choose big carrots so they dont lose their texture when cooked.'
          }
        ])
      })
      .then(recipes => console.log(`${'🍽'.repeat(recipes.length)} created!`))
      .then(() => console.log('Successfully seeded database'))
      .catch(error => console.log(error))
      .finally(() => mongoose.connection.close())
  })
