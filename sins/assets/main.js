var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
var TextScramble = function () {
  function TextScramble(el) {_classCallCheck(this, TextScramble);
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }_createClass(TextScramble, [{ key: "setText", value: function setText(
    newText) {var _this = this;
      var oldText = this.el.innerText;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {return _this.resolve = resolve;});
      this.queue = [];
      for (var i = 0; i < length; i++) {
        var from = oldText[i] || "";
        var to = newText[i] || "";
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from: from, to: to, start: start, end: end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    } }, { key: "update", value: function update()
    {
      var output = "";
      var complete = 0;
      for (var i = 0, n = this.queue.length; i < n; i++) {var _queue$i =
        this.queue[i],from = _queue$i.from,to = _queue$i.to,start = _queue$i.start,end = _queue$i.end,char = _queue$i.char;
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += "<span class=\"dud\">" + char + "</span>";
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    } }, { key: "randomChar", value: function randomChar()
    {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    } }]);return TextScramble;}();


// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

var phrases = [
  "I have not done my taxes in 3 years",
  "I used crypto to fund a hacker on the dark web",
  "I have spent all day finding these damned things instead of learning",
  "I compulsively steal swag", "Decentralization is disorganized as shit... Not sure if it's gonna succeed.", 
  "Sometimes I think about EOS",
  "I'm trading during parties",
  // "My landlord doesnt know about my 1 GH mining rig. Never paid for electricity.",
  // "I’m too lazy to report capital gains",
  // "I'm not sure crypto will pick off as an every day currency",
  // "I do not declare my crypto", "I bought some shitcoins", "I have not done my taxes in 3 years", "I livestream copyrighted material", "I took loan on crypto to buy more crypto and had my CDP liquidated", "I have been accused of waging a personal jihad on our company.", "exposed my private keys during a screen share", "I used crypto to fund a hacker on the dark web", "I dont really understand how blockchains work", "I create conflict by pushing to the root of social problems", "Once talked my mom into buying dogecoin", "I have tried to hack the artifaqts page and was stupid enough to submit my email as ‘last token’", "Someone asked me help them send 20k via MetaMask and I did it without being sure if their browser or computer were safe", "I front-run on IDEX", "I cant explain how angry and petty I get with some projects", "When people get complacent and stop learning", "I get angry at people in our company who are just taking up space with their complaints. They have such a narrow perspective.", "I HATE ON PROJECTS FOR NO REASON", "Getting blockchain data into a database makes me want to throw my cpu out a window", "I desire the fakers and the egotists to be exposed", "I believe youngsters are inherently better coders.", "I compulsively steal swag", "I sold most of my ETH at the bottom of the dip", "I still forget passwords to wallets.", "I have my doubts about all this", "I work in corporate America but wish I worked in crypto", "I get lonely working remotely, but believe in the mission!", "The governance of my company was centralized", "I am at devcon while developing a competing protocol", "I bought too many shitcoins", "I panic sold.", "I lost 267 ether after mining for many months and it is lost forever", "I stole my daughter's doll during trip to Prague, because I miss her.", "I have six different fiat currencies in my wallet right now.", "I bought ETC", "I bought some bitconnect", "I flirted with the curse of maximalism.", "I have spent all day finding these damned things instead of learning", "havent sold my bitcoin cash", "Sometimes I think about EOS", "I once said I didn't know if Ethereum was the one true crypto.", "I want ZRX to moon more than ETH", "I suggested that people might not want a decentralized future", "Decentralization is disorganized as shit... Not sure if it's gonna succeed.", "I think tether was safe despite the evidence", "I sold some of my eth during crypto winter", "got in early, got out early", "I sold all my Ether for paying bills in fiat.", "I sold my Bitcoin at $10", "I cashed out my BTC to make a quick buck instead of HODLing like a true crypto saint", 
  // "I sold my BTC for USD when the price was high", 
  // "Instead of rolling my 401K at my last company over like a sane person, I bought ETH", 
  // "no lambo no glory", 
  // "I day trade at work", 
  // "I joined a bitcoin maximalist startup.",
  // "I'm trading during parties", "I love money", "I still mix up bearish and bullish", "I only plan on hoarding more and more"
]


var el = document.querySelector(".glitch");
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
  el.dataset.text = phrases[counter];
  el.innerHTML = "<span>" + phrases[counter] + "</span>";
  fx.setText(phrases[counter]).then(function () {
    setTimeout(next, 4000);
  });
  counter = (counter + 1) % phrases.length;
};

next();