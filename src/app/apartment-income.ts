export class ApartmentIncome {
  id: number;
  bedrooms: number;
  units: number;
  squareFeet: number;
  monthlyRent: number;
  bedroomRange: number[];

  constructor() {
    this.bedroomRange = [0,1,2,3,4];
  }

  isValid(): boolean {
    return (this.units > 0 && this.monthlyRent > -1 && this.bedrooms > -1);
  }
}
