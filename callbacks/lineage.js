import fakeAjax from '../fakeAjax';

function lineage(url) {
  fakeAjax(url,
    character => {
      console.log('> %s', character.title);
      if (character.ancestor) {
        lineage(character.ancestor);
      }
    },
    error => {
      console.log('Error: %s', error);
      console.log('Falling back to %s', 'lotr.com/arvedui');
      return lineage('lotr.com/arvedui');
    }
  )
}

lineage('lotr.com/aragorn');
