# AthnaHacks2019_DiOray
## Inspiration

Why is it hard to keep a diary? Everybody wants to record things and their feelings of each day, but keeping a diary takes time, and it seems boring/waste of time.

We see people skype-ing or FaceTimeing on their way alone. This inspired us that people can use pieces of time like their way home alone to do the diary by talking, which is neither a waste of time nor boring.


## What it does

DiOray is an easy diary-keeping website that users can do it by just telling their stories to the website. It can also analyze people’s emotion and track it, so users can have a better understanding of their daily mood.


## How we built it

We utilized Google speech recognition to transfer speech to text. As for sentiment analysis, the most important part, we applied Text Analytics API from Azure cognitive services to it. We determined the mood of a day by SENTIMENT, the percentages reflect different levels of emotions, happy, neutral, or sad. We used chart.js to plot line charts indicating the emotion changes. We also took advantages of Vue.js to help build the user interfaces.


## Challenges we ran into

API authentication error; CORS error


## Accomplishments that we're proud of

We did researches about people's pain points about emotions, and we were happy to come up with this idea.


## What we learned

We learned how to create a website using APIs.


## What's next for DiOray: An oral diary

We would like to develop DiOray to an app so that it would be more convenient to use, set a login function to differentiate users, and allow more languages.

