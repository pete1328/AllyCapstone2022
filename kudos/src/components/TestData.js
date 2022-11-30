import scatter1 from "../assets/Postcards/blob-scatter-haikei-1.svg";
import scatter2 from "../assets/Postcards/blob-scatter-haikei-2.svg";
import scatter3 from "../assets/Postcards/blob-scatter-haikei-3.svg";
import scatter4 from "../assets/Postcards/blob-scatter-haikei-4.svg";
import scatter5 from "../assets/Postcards/blob-scatter-haikei-5.svg";
import scene from "../assets/Postcards/blob-scene-haikei.svg";
import gradient from "../assets/Postcards/blurry-gradient-haikei.svg";
import circle1 from "../assets/Postcards/circle-scatter-haikei-1.svg";
import circle2 from "../assets/Postcards/circle-scatter-haikei-2.svg";
import layered from "../assets/Postcards/layered-waves-haikei.svg";
import lowpoly1 from "../assets/Postcards/low-poly-grid-haikei-1.svg";
import lowpoly2 from "../assets/Postcards/low-poly-grid-haikei-2.svg";
import stackedpeaks from "../assets/Postcards/stacked-peaks-haikei.svg";
import stackedwaves from "../assets/Postcards/stacked-waves-haikei.svg";
import wave from "../assets/Postcards/wave-haikei.svg";

export class Message {
  constructor(sender, reciever, text, points, gif, font, style) {
    this.sender = sender;
    this.reciever = reciever;
    this.text = text;
    this.points = points;
    this.gif = gif;
    this.font = font;
    this.style = style;
  }
}

export const postcard_styles = [
  scatter1, scatter2, scatter3, scatter4, scatter5,
  scene,
  gradient,
  circle1, circle2,
  layered,
  lowpoly1, lowpoly2,
  stackedpeaks, stackedwaves,
  wave
]

export const months = [
  "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"
];

export const statsLegend = [
  {title: 'Kudos Recieved', color: "#CB3974"},
  {title: 'Kudos Sent', color: "#1C988A"},
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
  "https://cdn.vox-cdn.com/thumbor/He_VVk5IhW5UI0w8RciuhRgIfjc=/0x15:500x348/1400x1400/filters:focal(0x15:500x348):format(gif)/cdn.vox-cdn.com/uploads/chorus_image/image/36992002/tumblr_lmwsamrrxT1qagx30.0.0.gif",
  "https://www.gifcen.com/wp-content/uploads/2022/04/happy-dance-gif-1.gif",
  "https://thumbs.gfycat.com/CreamyAmusingBaleenwhale-size_restricted.gif",
  "https://media1.giphy.com/media/dcjXtLmMMw5gc/200w.gif?cid=82a1493bn8ofsc2d6azrx8umwfg94mlenqbcw346lf755s93&rid=200w.gif&ct=g",
  "https://media.tenor.com/kKZAg-7I-5cAAAAM/smile-milk-and-mocha-bear.gif",
  "https://media4.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif",
  "https://media0.giphy.com/media/DhstvI3zZ598Nb1rFf/200.webp?cid=ecf05e47v9w457rpfs69akpnnror37t98hs5y81hc3imurra&rid=200.webp&ct=g",
  "https://media3.giphy.com/media/okfvUCpgArv3y/200.webp?cid=ecf05e47v9w457rpfs69akpnnror37t98hs5y81hc3imurra&rid=200.webp&ct=g",
  "https://media3.giphy.com/media/ely3apij36BJhoZ234/200w.webp?cid=ecf05e47m9t9hh0mcqoeb3v4wiflb3eexjw0tgruvpa30t64&rid=200w.webp&ct=g",
  "https://media.tenor.com/bdEc_iNRKIQAAAAC/samusdance-vibestar.gif",
  "https://media.tenor.com/7QMpPcdaq3UAAAAC/tft-penguin.gif",
  "https://media.tenor.com/KKdd0koqb0YAAAAd/pikachu-pokemon.gif"
]

// Example data from https://codesandbox.io/s/0q0hx?file=/src/Dataset.js
//d3: nodes can be any object as long as it has a unique id
//  NODES are each employee from database (unique ID == primary ID)
//  Category: 0- employee, 1- manager
export const nodesData = [
  { id: 0, name: "Myriel", radius: 10 },
  { id: 2, name: "Napoleon", radius: 4 },
  { id: 3, name: "Mlle.Baptistine", radius: 5 },
  { id: 44, name: "Mme.Magloire", radius: 5 },
  { id: 10, name: "CountessdeLo", radius: 8 },
  { id: 45, name: "Geborand", radius: 2 }
];

export const linksData = [
  { source: 2, target: 0 },
  { source: 3, target: 0 },
  { source: 44, target: 0 },
  { source: 44, target: 3 },
  { source: 10, target: 0 },
  { source: 45, target: 0 },
  { source: 10, target: 45 }
];