# Background

Five years ago I produced a (quirky) javascript demo for my commercial real estate analysis API at [www.sizemymultifamilyloan.com/api/fha_sec223f_demo](www.sizemymultifamilyloan.com/api/fha_sec223f_demo).

I've now completed my first Angular 2  replica of the original demo, which is live here: [gpolyn.github.io/angular-fha](https://gpolyn.github.io/angular-fha).

For more information of future planned releases for my Angular 2 replica, please visit TK.

# Notes on coding the Angular 2 replica

#### Fictitious mindset adopted 

_"I am an independent contractor with special knowledge of the business subject of my component&mdash;to complete my assignment, I need only comply with any Typescript interfaces given me by the app architect."_ 

#### 1. Programming to [Typescript](http://www.typescriptlang.org) interfaces

`app.interface.ts` contains an app-wide contract for income components and is used in `src/app/components/parking` and `src/app/components/other`.

For example, `IOtherIncome` extends `IIncome2`, adding fields specific to the income source.

```
export interface IOtherIncome extends IIncome2 {
  usage?: string;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;
}
```
Meanwhile, at `app.interface.ts` the `ICommonIncomeService` interface, and its extensions, imply a promise to observe the `IOtherIncome` type, for example in the Observable array, `chincomes$`.
```
interface ICommonIncomeService<T extends IIncome2> {
  chincomes$: Observable<T[]>; 
	addIncome(e: T): void;
	removeIncome(e: T): void;
}
```

## 2. Modularity

Components `src/app/components/parking` and `src/app/components/other` were prepared for integration with extensions of the `ICommonIncomeService` interface of `app.interface.ts`, but with abstract class service implementations, excusing the responsibility to test them. The problem of the approach is that the abstract service classes could not be used in the component `NgModule` specification — attempts resulted in errors. The abstract services employed by the other and parking income components were later provided with concrete classes in src/app/component_facade_modules.

I imagined that app requirements included default field values for each component. For example, initial or placeholder values are given for several loan cost fields at the following excerpt from `src/app/components/loan-chracteristics/config.ts`.
```
TK
```
Meanwhile, the component field default values can be overridden higher in dependency chain with dependency injection. For example, there is a problematic `usage` default value in the following excerpt of `src/app/components/other/config/config.ts`
```
const INITIAL_OTHER_INCOME_CONFIG_2 = {
  usage: undefined,

};
…
@NgModule({
exports: [ OtherIncomeModule],
providers: [
…
  { provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG_2 }
]
})
```

The problem field is successfully overridden in the following excerpt from component-module-facades/

## 3. Dependency Injection

## 4. Reactive approach

Angular 2 performance can be improved when component push strategy is changed to TK. This step was accomplished in the demo by employing rxjs/Observable collections with the Angular async pipe and the reactive forms module.

Useful discoveries:

1) As noted earlier, at TK, abstract classes cannot used as parameters in NgModule

2) Create as many components as you anticipate distinct service uses. My initial attempts to configure <other-income /> and <parking-income /> components with flags for ‘is commercial’ did not play well with service discovery. I reconciled myself to the entailed duplication by sharing tests between the sibling components, while taking the cleaner appearance of the components in my app container as a win.

