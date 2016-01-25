const fakeResponses = {
  'lotr.com/aragorn': {title: 'Aragorn, King Elessar', ancestor: 'lotr.com/arathorn'},
  'lotr.com/arathorn': {title: 'Arathorn II, Chieftain of the Dúnedain', ancestor: 'lotr.com/arador'},
  'lotr.com/arador': {title: 'Arador, 14th Chieftain of the Dúnedain', ancestor: 'lotr.com/<broken_link>'},
  'lotr.com/arvedui': {title: 'The last King of Arnor'}

  'eric/profile': {id: 1, name: 'Eric Cartman', friends: 3, pictures: 2, episodes: 3},
  'eric/friends': ['Stan', 'Kyle', 'Kenny'],
  'eric/pictures': ['avatar.jpg', '4th_grade.jpg'],
  'eric/episodes': ['Scott Tenorman Must Die', 'Cow Days', 'A Ladder to Heaven']
};

export default function fakeAjax(url, success, error) {
  console.log(`Requesting '${url}'...\n`);

  const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  const response = fakeResponses[url];

  if (response) {
    setTimeout(() => success(response), randomDelay);
  } else {
    setTimeout(() => error(404, `${url} not found`), randomDelay);
  }
}
