const style =
  `
    table div {
      width: 508px;
    }

    :host /deep/ div.display {
      height: 19px;
    }

    table > div div, 
    :host /deep/ .commercial-income div,
    :host /deep/ .other-residential-income div {
      width: 232px;
      float: left;
      padding: 1px;
      margin-right: 2px;
      border: 1px solid black;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
    }

    table > div div:nth-child(n+2), 
    :host /deep/ .other-residential-income div:nth-child(n+2),
    :host /deep/ .other-residential-income div:nth-child(n+2) div,
    :host /deep/ .commercial-income div:nth-child(n+2),
    :host /deep/ .commercial-income div:nth-child(n+2) div {
      width: 115px;
    }

    table#other-residential-income > div div:nth-child(2) input, 
    table#other-residential-income > div div:nth-child(3) input {
      width: 96%;
    }

    /*
    button {
      border: 0;
      background-color: transparent;
    }
    */

    :host /deep/ #new-other-income div:nth-child(4),
    :host /deep/ #new-other-income div:nth-child(4) div,
    :host /deep/ #new-commercial-income div:nth-child(4),
    :host /deep/ #new-commercial-income div:nth-child(4) div,
    :host /deep/ .other-residential-income div:nth-child(4),
    :host /deep/ .other-residential-income div:nth-child(4) div,
    :host /deep/ .commercial-income div:nth-child(4),
    :host /deep/ .commercial-income div:nth-child(4) div {
      width: 20px;
      border: 0px;
      margin: 1px;
    }

    table > div div.add,
    :host /deep/ .commercial-income div.delete-container{
      width: 16px;
      height: 16px;
      margin: auto;
    }

    table input {
      width: 96%;
      height: 99%;
    }

    :host /deep/ .commercial-income .display,
    :host /deep/ .other-residential-income .display {
      border: 0;
    }

    :host /deep/ .other-residential-income div,
    :host /deep/ .commercial-income div {
      text-align: center;
    }

    :host /deep/ .destroy-item:hover {
      color: #af5b5e;
    }

    :host /deep/ .destroy-item {
      display: block;
      border: 0px;
      <!-- margin: auto 0; -->

    }

    :host /deep/ i.material-icons {
      position: relative;
      right:82px;
      top:-8px;
      font-size:24px;
    }

  `;
export default style;
