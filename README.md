Years ago I produced a (quirky) Javascript demo for my commercial real estate analysis API, [sizemymultifamilyloan.com/api/fha_sec223f_demo](http://www.sizemymultifamilyloan.com/api/fha_sec223f_demo).

I've now completed my first pass at an [Angular 2](https://angular.io/) replica of the original demo, which lives here: [gpolyn.github.io/angular-fha](https://gpolyn.github.io/angular-fha).

The new replica is not responsive to non-desktop form factors, nor is it yet integrated with the API service; for more information on planned replica releases, please visit [gpolyn.github.io/front-end-developer](https://gpolyn.github.io/front-end-developer).

# Notes on coding the Angular 2 replica

#### Fictitious mindset adopted 

_"I'm an independent contractor with special knowledge of the business subject of my component&mdash;to complete my assignment, my code must 'compile' to any [Typescript](http://www.typescriptlang.org) interfaces given me by the app architect."_ 

#### Programming to Typescript interfaces

`app.interface.ts` contains an app-wide contract for income components and is used in `src/app/components/parking` and `src/app/components/other`.

For example, at `src/app/components/other/other-income.interface.ts`, `IOtherIncome` extends `IIncome2`, adding fields, such as `usage` or `monthlyRent`, that are specific to the income source.

```
export interface IOtherIncome extends IIncome2 {
  usage?: string;
  squareFeet?: number;
  monthlyRent: number;
  totalMonthlyIncome: number;
}
```
Meanwhile, at `app.interface.ts` the `ICommonIncomeService` interface, and its extensions, imply a promise to observe the `IOtherIncome` type, for example in the `Observable` array, `chincomes$`.
```
interface ICommonIncomeService<T extends IIncome2> {
  chincomes$: Observable<T[]>; 
  addIncome(e: T): void;
  removeIncome(e: T): void;
}
```

## Modularity

Components at `src/app/components/parking` and `src/app/components/other` were prepared for integration with extensions of the `ICommonIncomeService` interface in `app.interface.ts`, but use abstract class service implementations, thus excusing responsibility for testing. (The approach has a problem: abstract service classes cannot be used in a component’s [`NgModule`](https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html) specification&mdash;errors resulted.) The abstract services used by the components at `src/app/components/parking` and `src/app/components/other` are later provided with concrete service classes in `src/app/component-module-facades`.

In developing the app components, I imagined that app requirements included default field values for each component. For example, initial or placeholder values are given for several loan cost fields in the following excerpt from `src/app/components/loan-chracteristics/config.ts`.
```
export const INITIAL_CONFIG = {
  loan_type: 'purchase',
  term_in_months: 420,
  mortgage_interest_rate: 5.25,
  annual_replacment_reserve_per_unit: 400
};
```
Meanwhile, component field default values can be overridden higher in dependency chain with dependency injection. For example, there is a problematic `usage` default value in the following excerpt from `src/app/components/other/config/config.ts`
```
export const INITIAL_OTHER_INCOME_CONFIG: IOtherIncome = {
  usage: "shouldnt see this",
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};
```
The problematic field is overridden at `src/app/component-module-facades/other-income-facade.module.ts`, as shown in the following excerpt.

```
const INITIAL_OTHER_INCOME_CONFIG_2 = {
  usage: undefined,
  squareFeet: undefined,
  monthlyRent: undefined,
  totalMonthlyIncome: undefined
};

import { OTHER_INC_CONFIG, OtherIncomeModule, ResidentialIncomeService, CommercialIncomeService } from '../components';

@NgModule({
exports: [ OtherIncomeModule],
providers: [
  { provide: ResidentialIncomeService, useClass: MyResidentialOtherIncomeService },
  { provide: CommercialIncomeService, useClass: MyCommercialOtherIncomeService },
  { provide: OTHER_INC_CONFIG, useValue: INITIAL_OTHER_INCOME_CONFIG_2 }
]
})
```
## Dependency Injection

Google has been promoting dependency injection (‘DI’) as a software design principle since at least [2009](https://www.amazon.com/Dependency-Injection-Examples-Java-Ruby/dp/193398855X) and as it is a key Angular feature I wanted to exercise the facility as much as possible. 

While the _facade_ pattern might not best describe the function of the code in `src/app/code-module-facades`, there I wanted to show how component developers need not adopt any convention besides, perhaps, interface details and still see their code integrated into an Angular app.

Income sources&mdash;_apartment_, _other_ and _parking_&mdash;contribute either to _commercial_ or to _residential_ gross income, but in the replica I didn’t want to add a logically extrinsic "is commercial" characteristic to any income data model or interface. Instead, at `app/src/services/special.service.ts` I prepared a commercial income service singleton, `CommercialIncomeService`, and a residential income service singleton, `ResidentialIncomeService`, which were then injected into as many services as there were commercial and non-commercial income permutations, `MyCommercialOtherIncomeService` and `MyResidentialOtherIncomeService` being two examples. I minimized the effort associated with creating the many income services by sharing tests and ES6 classes.

## Reactive approach

Angular 2 performance can be improved when `ChangeDetectionStrategy.OnPush` is used along with suitably developed components. In the replica, where used, the strategy is complemented by reliance on presenting Observable collections with Angular's [async](https://angular.io/docs/ts/latest/api/core/testing/index/async-function.html) pipe and on [ReactiveFormsModule](https://angular.io/docs/ts/latest/api/forms/index/ReactiveFormsModule-class.html). Meanwhile, under the programming-to-interfaces approach taken, I couldn't make use of the popular [Immutable.js](https://facebook.github.io/immutable-js) library, as it doesn't work with Typescript interfaces.

## Useful discoveries

1. As noted above in *Modularity*, abstract Typescript classes cannot used as parameters in Angular’s `NgModule`.

2. Create as many components as you anticipate characteristic service uses, I say. I attempted to establish base components for _other_ and _parking_ income components, but dependence on input flags for ‘is commercial’ in these attempts did not play well with service discovery. I reconciled myself to the duplication of multiple sibling components by sharing tests between the them, and enjoying the cleaner appearance of the components in my app container,`src/app/containers/app.component.html`.

3. The programming-to-interface approach does not play well with popular immutability library, Immutable.js, and will likely need to be rethought or modified to something less strict.
