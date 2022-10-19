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
  "https://media.tenor.com/xECsPxHlF5UAAAAC/milk-and-mocha-bears-happy.gif",
  "https://bestanimations.com/media/happy-dance/1206060996happy-dance-animated-gif-image-50.gif",
  "https://media4.giphy.com/media/5xaOcLGvzHxDKjufnLW/200w.gif?cid=82a1493bqvvj4dahomt66vcv4sgj2l2nnnxf3s4ilpswswi9&rid=200w.gif&ct=g",
  "https://media.itsnicethat.com/original_images/giphy_animation_itsnicethat_dumpster_fire.gif",
  "https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif",
  "https://c.tenor.com/5gxjuYKbfhYAAAAM/animated-milk-and-mocha.gif",
  "https://www.gifcen.com/wp-content/uploads/2022/04/happy-dance-gif-1.gif",
  "https://thumbs.gfycat.com/CreamyAmusingBaleenwhale-size_restricted.gif",
  "https://media1.giphy.com/media/dcjXtLmMMw5gc/200w.gif?cid=82a1493bn8ofsc2d6azrx8umwfg94mlenqbcw346lf755s93&rid=200w.gif&ct=g",
  "https://media.tenor.com/kKZAg-7I-5cAAAAM/smile-milk-and-mocha-bear.gif",
  "https://media4.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif",
  "https://media0.giphy.com/media/DhstvI3zZ598Nb1rFf/200.webp?cid=ecf05e47v9w457rpfs69akpnnror37t98hs5y81hc3imurra&rid=200.webp&ct=g",
  "https://media3.giphy.com/media/okfvUCpgArv3y/200.webp?cid=ecf05e47v9w457rpfs69akpnnror37t98hs5y81hc3imurra&rid=200.webp&ct=g",
  "https://media3.giphy.com/media/ely3apij36BJhoZ234/200w.webp?cid=ecf05e47m9t9hh0mcqoeb3v4wiflb3eexjw0tgruvpa30t64&rid=200w.webp&ct=g"
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