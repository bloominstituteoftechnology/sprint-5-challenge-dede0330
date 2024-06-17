async function sprintChallenge5() {
  // Import Axios (if not already done)
  
  const axios = require('axios');

  const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
  const learnersResponse = await axios.get('http://localhost:3003/api/learners');

  const mentors = mentorsResponse.data;
  const learners = learnersResponse.data;

  const updatedLearners = learners.map((learner) => {
    const mentorsForLearner = learner.mentors.map((mentorId) => {
      const mentor = mentors.find((m) => m.id === mentorId);
      return mentor ? `${mentor.firstName} ${mentor.lastName}` : 'unknown mentor';
    });
    return {
      ...learner,
      mentors: mentorsForLearner,
    };
  });

  console.log(updatedLearners);

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  // Create a Document Fragment to append all cards at once
  const fragment = document.createDocumentFragment();

  // Create cards using updatedLearners array
  updatedLearners.forEach((learner) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Add event listener for card selection
    card.addEventListener('click', function selectCard() {
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('selected');
        }
      });

      card.classList.toggle('selected');
      info.textContent = card.classList.contains('selected') ?
        `The selected learner is ${learner.fullName}` : 'No learner is selected';

      // Toggle mentors list display based on selection
      const mentorsList = card.querySelector('ul');
      mentorsList.style.display = card.classList.contains('selected') ? 'block' : 'none';
    });

    // Append child elements to card
    const heading = document.createElement('h3');
    heading.textContent = learner.fullName;
    card.appendChild(heading);

    const email = document.createElement('div');
    email.textContent = learner.email;
    card.appendChild(email);

    const mentorsHeading = document.createElement('h4');
    mentorsHeading.textContent = 'Mentors';
    mentorsHeading.className = 'closed';
    card.appendChild(mentorsHeading);

    const mentorsList = document.createElement('ul');
    mentorsList.style.display = 'none'; // Hide mentors initially
    learner.mentors.forEach(mentor => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentor;
      mentorsList.appendChild(mentorItem);
    });

    card.appendChild(mentorsList);
    fragment.appendChild(card); // Append card to fragment
  });

  // Append the fragment to the cards container
  cardsContainer.appendChild(fragment);

  // Update footer with current year
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 };
else sprintChallenge5();