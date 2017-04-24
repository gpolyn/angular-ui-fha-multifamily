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
      padding: 0px;
    }

    :host /deep/ .apartment-income div.delete-container,
    #new-apartment-income div.add {
      padding: 0px; 
      margin: auto;
    }

    table div {
      width: 508px;
    }

    #new-apartment-income div:nth-child(5),
    #new-apartment-income div:nth-child(5) div,
    :host /deep/ .apartment-income div:nth-child(5),
    :host /deep/ .apartment-income div:nth-child(5) div {
      width: 24px;
      height:24px;
      border: 0px;
      margin: 0px;
    }

    table input {
      width: 96%;
      height: 99%;
    }

    :host /deep/ .apartment-income .display {
      border: 0;
      height: 19px;
    }

    .add button:hover,
    :host /deep/ .delete-container button:hover {
      color: #af5b5e;
    }

    button.mdl-button--icon,
    :host /deep/ button.mdl-button--icon {
      outline:none;
      min-width: 24px;
      height: 24px;
      width: 24px;
    }

  `;
export default style;
