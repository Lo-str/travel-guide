// Async API Fetch

type Currency = {
  // if we want to add another key value pair I do it here
  symbol: string;
  name: string;
};

type DestinationInfo = {
  //or here depending on currency or destination info
  currency: Currency;
  flag: string;
};

type RestCurrency = {
  name: string;
  symbol: string;
};

type RestCountryResponse = {
  // defined RestCountryRespone to avoid implicit any
  currencies: Record<string, RestCurrency>;
  flag: string;
};

// main function: fetch cpuntry info from rest
export const getDestinationInfo = async (
  countryName: string,
): Promise<DestinationInfo> => {
  // this function returns a Promise that resolves to DestinationInfo
  try {
    // here we fetch
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const response: Response = await fetch(url);
    if (!response.ok) {
      // to prevent run time crashes on failed requests
      throw new Error(`Failed to fetch destination info for url: ${url}`);
    }
    const data: RestCountryResponse[] = await response.json();
    // currencies = data[0].currencies[0];
    const currency = Object.values(data[0]?.currencies)[0];
    console.log(data[0]?.flag); // try to find another value here if needed (flag)

    console.log();
    return {
      //another value if needed add here
      currency: {
        symbol: currency?.symbol,
        name: currency?.name,
      },
      flag: data[0].flag,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`destination error: ${error.message}`);
    }
    throw new Error("unknown error");
  }
};

const destInfo = await getDestinationInfo("sweden");
console.log(destInfo);
