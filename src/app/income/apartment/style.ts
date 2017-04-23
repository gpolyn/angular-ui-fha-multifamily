const style =
  `
    :host /deep/ .apartment-income {
      width: 508px;
      height: 23px;
    }

    :host /deep/ .apartment-income div, 
    #new-apartment-income div {
      width: 115px;
      float: left;
      padding: 1px;
      margin-right: 2px;
      border: 1px solid black;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
    }

    #new-apartment-income div:nth-child(4) {
      margin: 0;
      margin-right: 2px;
    }

    :host /deep/ .apartment-income div:nth-child(-n+2), 
    #new-apartment-income div:nth-child(-n+2) {
      width: 113px;
    }

    :host /deep/ .apartment-income div:nth-child(1), 
    #new-apartment-income div:nth-child(1) {
      text-align: center
    }

    :host /deep/ .apartment-income div:nth-child(5), 
    #new-apartment-income div:nth-child(5) {
      width: 20px;
    }

    :host /deep/ .apartment-income div.delete-container,
    #new-apartment-income div.add {
      width: 16px;
      height: 16px;
      margin: auto;
    }

    :host /deep/ .apartment-income input,
    #new-apartment-income input {
      width: 96%;
      height: 99%;
    }

    table div {
      width: 508px;
    }

    :host /deep/ div.display {
      height: 19px;
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

    #new-apartment-income div:nth-child(5),
    #new-apartment-income div:nth-child(5) div,
    :host /deep/ .apartment-income div:nth-child(5),
    :host /deep/ .apartment-income div:nth-child(5) div {
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

    :host /deep/ .apartment-income .display {
      border: 0;
    }

    :host /deep/ .destroy-item:hover {
      color: #af5b5e;
    }

    :host /deep/ .destroy-item {
      display: block;
      border: 0px;
    }
    .add-apartment-income {
      border: 0;
    }

    .add-apartment-income i.material-icons {
      position: relative;
      right:85px;
      top:-10px;
      font-size:24px;
    }

    :host /deep/ .apartment-income i.material-icons {
      position: relative;
      right:82px;
      top:-9px;
      font-size:24px;
    }

  `;
export default style;
