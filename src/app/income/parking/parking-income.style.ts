const style =

  `
    table > div {
      width: 508px;
    }

    :host /deep/ div.display {
      height: 19px;
    }

    table > div div,
    :host /deep/ .residential-parking-income div,
    :host /deep/ .commercial-parking-income div {
      width: 113px;
      float: left;
      padding: 1px;
      margin-right: 2px;
      border: 1px solid black;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
    }

    table > div div:nth-last-child(-n+3),
    :host /deep/ .residential-parking-income div:nth-last-child(-n+3),
    :host /deep/ .commercial-parking-income div:nth-last-child(-n+3) {
      width: 115px;
    }

    table > div div:nth-child(5),
    :host /deep/ .residential-parking-income div:nth-child(5),
    :host /deep/ .residential-parking-income div:nth-child(5) div,
    :host /deep/ .commercial-parking-income div:nth-child(5) div,
    :host /deep/ .commercial-parking-income div:nth-child(5) {
      width: 20px;
    }

    :host /deep/ .residential-parking-income div,
    :host /deep/ .commercial-parking-income div {
      text-align: center;
    }

    :host /deep/ .residential-parking-income .display,
    :host /deep/ .commercial-parking-income .display {
      border: 0;
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
