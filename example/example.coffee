Tutorial = zootorial.Tutorial
Step = zootorial.Tutorial.Step

window.exampleTutorial = new Tutorial
  steps: [
    new Step
      header: 'This is a tutorial!'
      content: '''
        Let\'s see what a tutorial is capable of.
        This message should be in the center of the viewport.
        Clicking the tutorial dialog is the default action to move on.
      '''

    new Step
      header: 'This is the second step.'
      content: '''
        It's attached to the side of the first interesting thing.
        It's focusing on the first paragraph.
        To move on to the third step, click the button.
      '''
      buttons: ['Go on...']
      attachment: x: 'left', to: '.interesting.one', at: x: 'right'
      focus: 'p'
      nextOn: click: '.tutorial button'

    new Step
      heading: 'The third...'
      content: '''
        The third step sits below the third interesting thing.
        Click it to finish the tutorial.
        Note that the other interesting things are blocked.
      '''
      attachment: y: 'top', to: '.interesting.three', at: y: 'bottom'
      block: '.interesting:not(.three)'
      nextOn: click: '.interesting.three'
  ]

$('button[name="restart-tutorial"]').on 'click', window.exampleTutorial.start
