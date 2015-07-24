var mockSessionBase = {
    date: '4/12/2015',
    concerns: 5,
    answers: [
      {
          index: 1,
          priorityLevel: 3,
          question: 'Do you have diabetes?',
          choices: [
              'No',
              'Yes; I have Type 1 Diabetes',
              'Yes; I have Type 2 Diabetes'
          ],
          userAnswerIndex: [1],
          correctAnswerIndex: [2]
      },
      {
          index: 2,
          priorityLevel: 1,
          question: 'What does it mean to have diabetes?',
          choices: [
              "I can't digest sugar",
              'I have a lot of sugar in my blood',
              'I am allergic to sugar'
          ],
          userAnswerIndex: [2],
          correctAnswerIndex: [1]
      },
      {
          index: 3,
          priorityLevel: 3,
          question: 'How can you treat diabetes?',
          choices: [
              'Diet',
              'Exercise',
              'Drugs',
              'Surgery',
              'There are no treatments'
          ],
          userAnswerIndex: [4],
          correctAnswerIndex: [0, 1, 2]
      },
      {
          index: 4,
          priorityLevel: 2,
          question: 'Can you drink beer?',
          choices: [
              'Yes',
              'In moderation',
              'No'
          ],
          userAnswerIndex: [0],
          correctAnswerIndex: [1]
      },
      {
          index: 5,
          priorityLevel: 3,
          question: 'Can you drink energy drinks? (ex. Red Bull, Monster)',
          choices: [
              'Yes',
              'In moderation',
              'No'
          ],
          userAnswerIndex: [2],
          correctAnswerIndex: [2]
      },
      {
          index: 6,
          priorityLevel: 1,
          question: 'Can you eat air popped popcorn?',
          choices: [
              'Yes',
              'In moderation',
              'No'
          ],
          userAnswerIndex: [2],
          correctAnswerIndex: [0]
      },
      {
          index: 7,
          priorityLevel: 2,
          question: 'Which of these foods are good to eat?',
          choices: [
              'Turkey Bacon',
              'Pork bacon',
              'Fried tofu',
              'Eggs',
              'Ribs',
              'Nuts'
          ],
          userAnswerIndex: [2,3],
          correctAnswerIndex: [0,3,5]
      }
  ]
}

var mockSession1 = JSON.parse(JSON.stringify(mockSessionBase))
mockSession1.date = '4/12/2015';
mockSession1.concerns = 5;
mockSession1.answers[0].userAnswerIndex = [1]
mockSession1.answers[1].userAnswerIndex = [2]
mockSession1.answers[2].userAnswerIndex = [4]
mockSession1.answers[3].userAnswerIndex = [0]
mockSession1.answers[4].userAnswerIndex = [2]
mockSession1.answers[5].userAnswerIndex = [2]
mockSession1.answers[6].userAnswerIndex = [2, 3]

var mockSession2 = JSON.parse(JSON.stringify(mockSessionBase))
mockSession2.date = '6/20/2015';
mockSession2.concerns = 3;
mockSession2.answers[0].userAnswerIndex = [2]
mockSession2.answers[1].userAnswerIndex = [1]
mockSession2.answers[2].userAnswerIndex = [0]
mockSession2.answers[3].userAnswerIndex = [1]
mockSession2.answers[4].userAnswerIndex = [0]
mockSession2.answers[5].userAnswerIndex = [0]
mockSession2.answers[6].userAnswerIndex = [0, 3]
