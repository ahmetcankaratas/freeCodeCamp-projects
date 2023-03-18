class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomIndex: '1' };

    this.random = this.random.bind(this);
  }

  random() {
    this.setState({ randomIndex: Math.floor(Math.random() * 6) });

  }

  render() {
    const Quotes = [
    ["It does not do well to dwell on dreams and forget to live.", "Harry Potter"], ["You're a little scary sometimes, you know that? Brilliant ... but scary", "Ron Weasley"], ["To the well-organized mind, death is but the next great adventure", "Albus Dumbledore"], ["Yer a wizard Harry.", "Hagrid"], ["Fear of a name only increases fear of the thing itself", "Hermione Granger"], ["Dobby is free.", "Dobby"]];

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "q-text" }, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-quote-left" }, " "), /*#__PURE__*/
      React.createElement("span", { id: "text" }, " ", Quotes[this.state.randomIndex][0])), /*#__PURE__*/

      React.createElement("div", { className: "q-author" }, "- ", /*#__PURE__*/
      React.createElement("span", { id: "author" }, Quotes[this.state.randomIndex][1])), /*#__PURE__*/


      React.createElement("div", { className: "buttons" }, /*#__PURE__*/
      React.createElement("a", {
        href: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + Quotes[this.state.randomIndex][0] + '" ' + Quotes[this.state.randomIndex][1]),

        className: "button",
        id: "tweet-quote",
        title: "Tweet this quote!",
        target: "_top" }, /*#__PURE__*/

      React.createElement("i", { class: "fa fa-twitter" })), /*#__PURE__*/

      React.createElement("button", { className: "button", id: "new-quote", onClick: this.random }, "New quote"))));




  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(RandomQuote, null),
document.getElementById('quote-box'));