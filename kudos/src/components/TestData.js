export class Message {
  constructor(sender, reciever, text, points, gif, font) {
    this.sender = sender;
    this.reciever = reciever;
    this.text = text;
    this.points = points;
    this.gif = gif;
    this.font = font;
  }
}

export const r_messages = [
  new Message("John", "Sara", "Sara, thanks for being awesome all last week! You rock! :)", 100, "https://bestanimations.com/media/happy-dance/1206060996happy-dance-animated-gif-image-50.gif", "font-great_vibes"),
  new Message("Bill", "Sara", "Sara, congrats on your promotion! We're all so proud of you!", 250, "https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif", "font-poppins font-bold"),
  new Message("Chris", "Sara", "Sara, thanks for being there over the weekend. You're the best!", 75, "https://c.tenor.com/5gxjuYKbfhYAAAAM/animated-milk-and-mocha.gif", "font-quicksand"),
];

export const s_messages = [
  new Message("Sara", "Amanda", "Amanda, thanks for helping me on that project last friday! Appreciate it!", 50, "https://c.tenor.com/5gxjuYKbfhYAAAAM/animated-milk-and-mocha.gif", "font-poppins font-bold"),
  new Message("Sara", "Chuck", "Chuck, thanks for always being there! You brighten up the room!", 100, "https://thumbs.gfycat.com/CreamyAmusingBaleenwhale-size_restricted.gif", "font-josefin_sans"),
  new Message("Sara", "Suzy", "Suzy, congrats on your engagement! We're thinking of you!", 225, "https://media4.giphy.com/media/5xaOcLGvzHxDKjufnLW/200w.gif?cid=82a1493bqvvj4dahomt66vcv4sgj2l2nnnxf3s4ilpswswi9&rid=200w.gif&ct=g", "font-nanum_pen_script"),
];

export const kudosSentData = [
  {y: -50, x: 50, y0: 0},
  {y: -100, x: 100, y0: 0},
  {y: -150, x: 150, y0: 0},
  {y: -200, x: 200, y0: 0},
  {y: -20, x: 250, y0: 0},
  {y: -300, x: 300, y0: 0},
  {y: -125, x: 350, y0: 0},
];
  
export const kudosRecievedData = [
  {y: 50, x: 50, y0: 0},
  {y: 100, x: 100, y0: 0},
  {y: 150, x: 150, y0: 0},
  {y: 200, x: 200, y0: 0},
  {y: 250, x: 250, y0: 0},
  {y: 80, x: 300, y0: 0},
  {y: 350, x: 350, y0: 0},
];

export const statsLegend = [
  {title: 'Kudos Recieved', color: "#1C988A"},
  {title: 'Kudos Sent', color: '#CB3974'},
];

export const usageLegend = [
    {title: 'Kudos Allocated', color: "#1C988A"},
    {title: 'Kudos Earned', color: '#CB3974'},
];

export const questions = [
  "Who is this awesome person?",
  "What's the occasion?",
  "What are you grateful for?",
  "When?",
  "Add something extra",
]

export const choices = [
  [],
  ["thank you", "congrats"],
  ["your hard work", "your assistance", "lifting the team's spirits"],
  ["yesterday", "on your day off", "all the darn time", "during hard times"],
  ["We couldn't do this without you", ":)", "You're inspiring", "You're the best"],
]

export const punctuation = [
  [","],
  [" for"],
  [""],
  ["!"],
  ["."],
]

export const gifOptions = [
  "https://media1.giphy.com/media/UOdWc6CGpISvS/200.gif?cid=82a1493bbchuas80gagtj9ocjl7y5wbyo002gl3o4hgvc604&rid=200.gif&ct=g",
  "https://bestanimations.com/media/happy-dance/1206060996happy-dance-animated-gif-image-50.gif",
  "https://media4.giphy.com/media/5xaOcLGvzHxDKjufnLW/200w.gif?cid=82a1493bqvvj4dahomt66vcv4sgj2l2nnnxf3s4ilpswswi9&rid=200w.gif&ct=g",
  "https://media.itsnicethat.com/original_images/giphy_animation_itsnicethat_dumpster_fire.gif",
  "https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif",
  "https://c.tenor.com/5gxjuYKbfhYAAAAM/animated-milk-and-mocha.gif",
  "https://www.gifcen.com/wp-content/uploads/2022/04/happy-dance-gif-1.gif",
  "https://thumbs.gfycat.com/CreamyAmusingBaleenwhale-size_restricted.gif",
  "https://media1.giphy.com/media/dcjXtLmMMw5gc/200w.gif?cid=82a1493bn8ofsc2d6azrx8umwfg94mlenqbcw346lf755s93&rid=200w.gif&ct=g"
]

// Example data from https://codesandbox.io/s/0q0hx?file=/src/Dataset.js
//d3: nodes can be any object as long as it has a unique id
//  NODES are each employee from database (unique ID == primary ID)
//  Category: 0- employee, 1- manager
export const nodesData = [
  { id: "Myriel", group: 1 },
  { id: "Napoleon", group: 1 },
  { id: "Mlle.Baptistine", group: 1 },
  { id: "Mme.Magloire", group: 1 },
  { id: "CountessdeLo", group: 1 },
  { id: "Geborand", group: 1 }
];

export const linksData = [
  { source: "Napoleon", target: "Myriel", value: 1 },
  { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
  { source: "Mme.Magloire", target: "Myriel", value: 10 },
  { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
  { source: "CountessdeLo", target: "Myriel", value: 1 },
  { source: "Geborand", target: "Myriel", value: 1 },
  { source: "CountessdeLo", target: "Geborand", value: 1 }
];

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
export const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];