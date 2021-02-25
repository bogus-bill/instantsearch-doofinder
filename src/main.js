/* global instantsearch algoliasearch */

const jsonResult = {
	"results": [
		{
			"hits": [
				{
					"name": "Samsung - Galaxy S7 edge 32GB - Blue Coral (Sprint)",
					"description": "Enjoy the function of a tablet in a slim, easy-to-handle design with this Samsung Galaxy S7 edge. The curved edge-to-edge display offers impressive viewing, and the durable exterior is both dust- and water-resistant without needing a case. This Samsung Galaxy S7 edge runs on Android 6.0 for powerful support of all your apps.",
					"brand": "Samsung",
					"categories": [
						"Cell Phones",
						"All Cell Phones with Plans"
					],
					"price": 799.99,
					"image": "https://cdn-demo.algolia.com/bestbuy-0118/5678900_sb.jpg",
					"popularity": 20805,
					"objectID": "131214720",
					"_highlightResult": {
						"name": {
							"value": "Samsung - __ais-highlight__G__/ais-highlight__alaxy S7 edge 32GB - Blue Coral (Sprint)",
							"matchLevel": "full",
							"fullyHighlighted": false,
							"matchedWords": [
								"g"
							]
						},
						"description": {
							"value": "Enjoy the function of a tablet in a slim, easy-to-handle design with this Samsung __ais-highlight__G__/ais-highlight__alaxy S7 edge. The curved edge-to-edge display offers impressive viewing, and the durable exterior is both dust- and water-resistant without needing a case. This Samsung __ais-highlight__G__/ais-highlight__alaxy S7 edge runs on Android 6.0 for powerful support of all your apps.",
							"matchLevel": "full",
							"fullyHighlighted": false,
							"matchedWords": [
								"g"
							]
						},
						"brand": {
							"value": "Samsung",
							"matchLevel": "none",
							"matchedWords": []
						},
						"categories": [
							{
								"value": "Cell Phones",
								"matchLevel": "none",
								"matchedWords": []
							},
							{
								"value": "All Cell Phones with Plans",
								"matchLevel": "none",
								"matchedWords": []
							}
						]
					}
				}
			],
			"nbHits": 848,
			"page": 0,
			"nbPages": 43,
			"hitsPerPage": 20,
			"facets": {
				"brand": {
					"Incipio": 424,
					"Samsung": 272,
					"kate spade new york": 152
				}
			},
			"exhaustiveFacetsCount": true,
			"exhaustiveNbHits": true,
			"query": "g",
			"params": "query=g&maxValuesPerFacet=10&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3Akate%20spade%20new%20york%22%2C%22brand%3AIncipio%22%2C%22brand%3ASamsung%22%5D%5D",
			"index": "demo_ecommerce",
			"processingTimeMS": 1
		},
		{
			"hits": [
				{
					"objectID": "131280980"
				}
			],
			"nbHits": 4406,
			"page": 0,
			"nbPages": 1000,
			"hitsPerPage": 1,
			"facets": {
				"brand": {
					"Incipio": 424,
					"Apple": 286,
					"Samsung": 272,
					"OtterBox": 260,
					"Speck": 244,
					"Insignia™": 164,
					"ZAGG": 152,
					"kate spade new york": 152,
					"Spigen": 136,
					"mophie": 136
				}
			},
			"exhaustiveFacetsCount": true,
			"exhaustiveNbHits": true,
			"query": "g",
			"params": "query=g&maxValuesPerFacet=10&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&hitsPerPage=1&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=brand",
			"index": "demo_ecommerce",
			"processingTimeMS": 1
		}
	]
};

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const promiseResponse = new Promise((resolve, reject) => {
  resolve(jsonResult);
});

import doofinder from 'doofinder';

let doofinderClient = new doofinder.Client(
  "97246945c88535d0dbaf859485503f52",
  {
    address: 'eu1-search.doofinder.com',
    zone: 'eu1',
    version: 5,
  }
);

let toHitResult = function(doofinderResult){
  let res = {
    "name": doofinderResult.title,
    "description": doofinderResult.description,
    "brand": doofinderResult.brand,
    "categories": doofinderResult.categories,
    "price": doofinderResult.price,
    "image": doofinderResult.image_link,
    "popularity": 21218,
    "_highlightResult": {
      "name": {
        "value": doofinderResult.title,
        "matchLevel": "full",
        "fullyHighlighted": false,
        "matchedWords": [
          "g"
        ]
      },
      "description": {
        "value": "Enjoy the function of a tablet in a slim, easy-to-handle design with this Samsung __ais-highlight__G__/ais-highlight__alaxy S7 edge. The curved edge-to-edge display offers impressive viewing, and the durable exterior is both dust- and water-resistant without needing a case. This Samsung __ais-highlight__G__/ais-highlight__alaxy S7 edge runs on Android 6.0 for powerful support of all your apps.",
        "matchLevel": "full",
        "fullyHighlighted": false,
        "matchedWords": [
          "g"
        ]
      },
      "brand": {
        "value": "Samsung",
        "matchLevel": "none",
        "matchedWords": []
      },
      "categories": [
        {
          "value": "Cell Phones",
          "matchLevel": "none",
          "matchedWords": []
        },
        {
          "value": "All Cell Phones with Plans",
          "matchLevel": "none",
          "matchedWords": []
        }
      ]
    }
  }

  return res;
}


function toBrand(facets){
  let values = facets.brand.terms.buckets;
  let result = {};
  for (let x=0; x<values.length; x++)
  {
    let value = values[x];
    result[value.key] = value.doc_count;
  }
  return result;
}

let formatResult = function(doofinderResult){
  // console.log(doofinderResult);
  let results = doofinderResult.results;
  if (!results)
  {
    return {};
  }

  let allResults = results.map(result => toHitResult(result));

  return {
    results: [
      {
        "hits": allResults,
        "nbHits": 3,
        "page": 0,
        "nbPages": 2,
        "hitsPerPage": 6,
        "facets": {
          "brand": toBrand(doofinderResult.facets)
        },
        "params": "query=g&maxValuesPerFacet=10&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&facets=%5B%22brand%22%5D&tagFilters=&facetFilters=%5B%5B%22brand%3Akate%20spade%20new%20york%22%2C%22brand%3AIncipio%22%2C%22brand%3ASamsung%22%5D%5D",
      }
    ]
  }
}

function SearchAndFormat(searchQuery)
{
  return new Promise((resolve, reject) => {
    doofinderClient.search(searchQuery, function(_, result){
      resolve(formatResult(result));
    });
  });
}


const customSearchClient = {
  search(requests) {
    let searchQuery = requests[0].params.query
    return SearchAndFormat(searchQuery);
  },
  searchForFacetValues(requests) {
    return searchClient.searchForFacetValues(requests);
  }
};

const search = instantsearch({
    indexName: 'demo_ecommerce',
    searchClient: customSearchClient,
    searchFunction: function(helper) {
      if (helper.state.query.length < 3) {
        return; // no search if less than 2 character
      }
      helper.search();
    }
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    }),
    instantsearch.widgets.clearRefinements({
      container: '#clear-refinements',
    }),
    instantsearch.widgets.refinementList({
      container: '#brand-list',
      attribute: 'brand'
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: `
          <div>
            <img src="{{image}}" style="max-width:150px; max-height=150px" align="left" alt="{{name}}" />
            <div class="hit-name">
              {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
            </div>
            <div class="hit-description">
              {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
            </div>
            <div class="hit-price">\${{price}}</div>
          </div>
        `,
      },
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
    }),
  ]);

  search.start();
