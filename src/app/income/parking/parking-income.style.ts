const style =

  `
    table > div {
      width: 508px;
    }

    table > div div {
      width: 113px;
      float: left;
      padding: 1px;
      margin-right: 2px;
      border: 1px solid black;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
    }

    table > div div:nth-child(3), 
    table > div div:nth-child(4) {
      width: 115px;
    }

    table > div div:nth-child(5) {
      width: 20px;
    }

    table > div div:nth-child(2) {
      text-align: center;
    }

    table > div div.add {
      width: 16px;
      height: 16px;
      margin: auto;
    }

    table input {
      width: 96%;
      height: 99%;
    }
  `;
export default style;