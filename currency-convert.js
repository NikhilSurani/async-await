const axios  = require("axios");

const getExchangeRate = async (to) => {
    try{
        const  result = await axios.get(`http://www.apilayer.net/api/live?access_key=62c5d4e0d04840f0aa7fed6932a063d8&currencies=${to}`);
        return result.data.quotes;            

    } catch (e) {
        throw new Error(`Unable to find requested currency country ${to}`); 
    }
}

const getCountries = async (currencyCode) => {

    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);    
        return response.data.map((country) => country.name);           
    } catch(e) {
        throw new Error(`Unable to catch the country ${currencyCode}`);
    }

}


const convertCurrency = (to, amount) => {

    return getCountries(to).then((countries) => {
        return getExchangeRate(to);
    }).then((response) => {        
        for (var key in response) {
            if (response.hasOwnProperty(key)) {
                var currency = response[key];
            }
        }        
        const exchangeVal = amount * currency;               
        return `${amount} USD is worth ${exchangeVal} ${to}`;
    });

}
// async await example
const convertCurrencyAlt = async (to, amount) => {

    let countries = await getCountries(to);
    let currencies = await getExchangeRate(to);       
    var exchangeVal;

    for (var key in currencies) {
        if (currencies.hasOwnProperty(key)) {
            exchangeVal = amount * (currencies[key]);
        }
    }        
    return `${amount} USD is worth ${exchangeVal} ${to}`;
}

convertCurrencyAlt('INR', 10000).then((r) => {
    console.log(r);
}).catch((e) => {
    console.log(e.message);
});
