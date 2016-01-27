import fakeAjax from '../fakeAjax.js';

function onError(status, text) {
  console.error('Error: %s', text);
  console.log('Falling back to %s', 'lotr.com/arvedui');
  fakeAjax('lotr.com/arvedui', character => console.log('> %s', character.title));
}

fakeAjax('lotr.com/aragorn',
  (character) => {
    console.log('> %s\n', character.title);
    fakeAjax(character.ancestor,
       (character) => {
         console.log('> %s', character.title);
         fakeAjax(character.ancestor,
            (character) => {
              console.log('> %s', character.title);
              fakeAjax(character.ancestor,
                 (character) => {
                   console.log('> %s', character.title);
                 },
                 onError
               )
            },
            onError
          )
       },
       onError
     )
  },
  onError
);

// OR...

function lineage(url) {
  fakeAjax(url,
    character => {
      console.log('> %s', character.title);
      if (character.ancestor) {
        lineage(character.ancestor);
      }
    },
    error => {
      console.log('Error: %s', error.message);
      console.log('Falling back to %s', 'lotr.com/arvedui');
      return lineage('lotr.com/arvedui');
    }
  )
}

// lineage('lotr.com/aragorn');
