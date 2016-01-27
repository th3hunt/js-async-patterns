const fakeResponses = {
  // lineage
  'lotr.com/aragorn': {title: 'Aragorn, King Elessar', ancestor: 'lotr.com/arathorn'},
  'lotr.com/arathorn': {title: 'Arathorn II, Chieftain of the Dúnedain', ancestor: 'lotr.com/arador'},
  'lotr.com/arador': {title: 'Arador, 14th Chieftain of the Dúnedain', ancestor: 'lotr.com/<broken_link>'},
  'lotr.com/arvedui': {title: 'The last King of Arnor'},

  // south park
  'imdb.com/cartman': {name: 'Eric Cartman', traits: 'Spoilt, extremely selfish and frequently seeks personal gain', spdbUrl: 'spdb.com/eric'},
  'spdb.com/eric/friends': 0,
  'spdb.com/eric/record': 'Murder, Unlicensed surgery, Animal abuse and Attempted Genocide',
  'spdb.com/eric/known_for': ['Scott Tenorman Must Die', 'Make Love, Not Warcraft', 'A Ladder to Heaven']
};

export default function fakeAjax(url, success, error) {
  console.log(`Requesting '${url}'...\n`);

  const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  const response = fakeResponses[url];

  if (response !== void(0)) {
    setTimeout(() => success(response), randomDelay);
  } else {
    setTimeout(() => error(`404, ${url} not found`), randomDelay);
  }
}
