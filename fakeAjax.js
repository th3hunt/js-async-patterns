const fakeResponses = {
  'lotr.com/aragorn': {title: 'Aragorn, King Elessar', ancestor: 'lotr.com/arathorn'},
  'lotr.com/arathorn': {title: 'Arathorn II, Chieftain of the Dúnedain', ancestor: 'lotr.com/arador'},
  'lotr.com/arador': {title: 'Arador, 14th Chieftain of the Dúnedain', ancestor: 'lotr.com/<broken_link>'},
  'lotr.com/arvedui': {title: 'The last King of Arnor'},

  'geeks.com/cartman': {name: 'Eric Cartman', star: false, imdbUrl: 'imdb.com/eric'},
  'imdb.com/eric': {bio: 'Spoilt, extremely selfish and frequently seeks personal gain', quotesCount: 1000},
  'imdb.com/eric/films': ['Scott Tenorman Must Die', 'Cow Days', 'A Ladder to Heaven'],
  'imdb.com/eric/quotes': ['Hippies cant stand Death metal']
};

export default function fakeAjax(url, success, error) {
  console.log(`Requesting '${url}'...\n`);

  const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  const response = fakeResponses[url];

  if (response) {
    setTimeout(() => success(response), randomDelay);
  } else {
    setTimeout(() => error(`404, ${url} not found`), randomDelay);
  }
}
