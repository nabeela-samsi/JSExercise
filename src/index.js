/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 */

const printNum = () => {
  for (let i = 0; i <= 100; i++) {
    setTimeout(() => console.log(i), 1000);
  }
};

printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] .
You only need to produce the same array as expected result, no need to consider other
possibility.
 */

let myArr = [
  "12-24-2014",
  "09-2022-23",
  "12-30-2021",
  "08-02-2021",
  "07-15-2018",
  "2019-12-14",
  "2022-14-12",
];
const fixDate = (array) => {
  /* provide your code here */
  return array.map((str) => {
    let key1;
    let key2;
    let splitedValue = str.split("-");
    if (
      splitedValue[1].length === 4 ||
      (splitedValue[1] > 12 && splitedValue[0].length === 4)
    ) {
      key1 = splitedValue[0] < 12 ? 0 : 2;
      key2 = 1;
      [splitedValue[key1], splitedValue[key2]] = [
        splitedValue[key2],
        splitedValue[key1],
      ];
      str = `${splitedValue[0]}-${splitedValue[1]}-${splitedValue[2]}`;
    }
    let date = new Date(str);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  });
};
let newArr = fixDate(myArr);
console.log(newArr);

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds
*/
const dateFrom = new Date(500000);
const dateTo = new Date(1000000000);
const counter = (from, to) => {
  const daysDiff = Math.floor(Math.abs(from - to) / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.abs(from.getHours() - to.getHours());
  const minutesDiff = Math.abs(from.getMinutes() - to.getMinutes());
  const secondsDiff = Math.abs(from.getSeconds() - to.getSeconds());
  return `${daysDiff} days - ${hoursDiff} hours - ${minutesDiff} minutes - ${secondsDiff} seconds`;
};
const timer = counter(dateFrom, dateTo);
console.log(timer);
/*
4. Check the url and read documentation: https://restcountries.com
- Write a function to get all countries, sorted in alphabetical order
- Write a function to find one country based on the search input
The data fetched from url should be displayed in index.html.
*/

const getAllCountries = () => {
  /* provide your code here */
  displayData("https://restcountries.com/v3.1/all");
};

const getSingleCountry = () => {
  /* provide your code here */
  const name = document.getElementById("name").value;

  if (!name.trim().length) {
    return false;
  }

  displayData(`https://restcountries.com/v3.1/name/${name}`);
};

const displayData = (url) => {
  let responseData = {};
  fetch(url)
    .then(async (response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }

      responseData = await response.json();

      if (responseData.length > 0) {
        const sortedData = responseData.sort((a, b) => {
          return a.name.common < b.name.common ? -1 : 1;
        });

        const countryData = sortedData
          .map((data) => {
            return `
                <div class="container__item">
                  <h2>
                    ${data.name.common}
                  </h2x >
                  <h3>
                    Official name: ${data.name.official}
                  </h3>
                  <p>
                    Capital: ${data.capital}
                  </p>
                  <p>
                    Region: ${data.region}
                  </p>
                  <p>
                    Subregion: ${data.subregion}
                  </p>
                  <p>
                    Independent: ${data.independent}
                  </p>
                  <p>
                    Populations: ${data.population}
                  </p>
                  <img alt="country-flag" src=${data.flags.png} height="180em" width="280em">
                </div>`;
          })
          .join("<br>");

        document.getElementById(
          "results"
        ).innerHTML = `<div class="container">${countryData}</div>`;
      }
    })
    .catch((error) => {
      let errorWindow;

      if (error.message == 4) {
        errorWindow = `
            <i class="fa fa-frown-o"></i>
            <p class="error__title">
              404: Not Found
            </p>
            <p class="error__message">
              Please try agian by providing valid country name
            </p>
        `;
      } else {
        errorWindow = `
          <i class="fa fa-warning"></i>
          <p class="error__title">
            Something Went Wrong
          </p>
          <p class="error__message">
            Please try again later
          </p>
        `;
      }

      document.getElementById(
        "results"
      ).innerHTML = `<div class="error">${errorWindow}</div>`;
    });
};

getAllCountries();

/*
5. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.
*/

const generateNewFolderName = (existingFolders) => {
  /*  provide your code here */
  folder =
    folder.length === 0
      ? [...folder, "New Folder"]
      : [...folder, "New Folder (" + count + ")"];
  count++;
};

let folder = [];
let count = 0;
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
generateNewFolderName(folder);
console.log(folder); //expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']

/*
6. Complete class Book:
- class Book should have 3 properties: title (read-only, must be a string but cannot be empty), cost (private, must be positive number) and profit (private, positive number > 0 and =< 0.5)
(error should be thrown if data is not valid)
- give the logic to get book's price and profit separately.
- give the logics to increase and decrease the price with a certain amount
- give the logic to calculate price based on cost and profit. For example: cost 14, profit 0.3 => expected price is 20.

Complete class TaxableBook:
- inherit Book, but have 1 more private parameter in the constructor: taxRate.
- give the logic to calculate price with taxRate. For example:
cost 14, profit 0.3 , tax 24% => expected price is 30.43
*/
class Book {
  _title;

  #title;
  #cost;
  #profit;
  #price;

  constructor(title, cost, profit) {
    if (typeof title !== "string" || title.trim().length == 0) {
      throw new Error(
        "title should be string and blank values are not accepted"
      );
    }

    if (typeof cost !== "number" || cost < 0) {
      throw new Error("cost should be number and cannot be negative ");
    }
    //positive number > 0 and =< 0.5
    if (typeof profit !== "number" || profit < 0 || profit > 0.5) {
      throw new Error("profit should be number and should be between 0 to 0.5");
    }
    this.#title = title;
    this.#cost = cost;
    this.#profit = profit;
    this.#price = this.#cost / (1 - this.#profit.toFixed(2));
  }

  get getCost() {
    return this.#cost;
  }

  get getTitle() {
    return this.#title;
  }

  get getProfit() {
    return this.#profit;
  }

  get getPrice() {
    return this.#price;
  }

  set incrementPrice(amount) {
    this.#price += amount;
  }

  set decrementPrice(amount) {
    this.#price -= amount;
  }
}

class TaxableBook extends Book {
  /* provide your code here */

  #taxRate;
  #price;

  constructor(title, cost, profit, taxRate) {
    super(title, cost, profit);
    if (typeof taxRate !== "number") {
      throw new Error("taxRate should be number");
    }

    this.#taxRate = taxRate;
    this.#price = (cost / (1 - profit - this.#taxRate / 100)).toFixed(2);
  }

  get getTaxRate() {
    return this.#taxRate;
  }

  get getPriceWithTax() {
    return this.#price;
  }
}

const book1 = new Book("The Power of Habits", 14, 0.3);

console.log(`The cost of ${book1.getTitle} is ${book1.getCost}`);
console.log(
  `The profit made on selling ${book1.getTitle} is ${book1.getProfit}`
);
console.log(`The price of ${book1.getTitle} is ${book1.getPrice}`);

book1.incrementPrice = 10;
console.log(`The increased price of ${book1.getTitle} is ${book1.getPrice}`);

book1.decrementPrice = 4;
console.log(`The decreased price of ${book1.getTitle} is ${book1.getPrice}`);

const book2 = new TaxableBook("The Power of Habits", 14, 0.3, 24);
console.log(
  `The price calulated with tax rate of ${book2.getTaxRate} to ${book1.getTitle} book is ${book2.getPriceWithTax}`
);
