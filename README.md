# Leader Board by Rob Lao

## Steps to run locally

```
yarn
yarn build
yarn start
```

# Leaderboard MVP

The purpose of this excercise is for you to create a pull request containing your proposal to solve the below Leaderboard Scenario as an MVP. The only requirement is that you demonstrate your skills using the technology stack commensurate to the position you applied for at Sisu Wellness. You should also include any assumptions you made and the rationale, as well as any scoping questions you feel would be necessary to properly complete the objective.

Please note: This exercise is not designed for you to lose sleep or your weekend

GLHF!

## Key Criteria

1. Does it work?
2. How easy is it for another developer to continue where you left off?
3. Is the implementation, data model and code organisation of a standard that matches the level of the position you are applying for

## Scenario
The overwhelming majority of Sports, Games and gamified concepts have leaderboards. ACME Startup sees an opportunity to make it easy for other organisations to add a leaderboard feature set to their software products. ACME Startup wants to demonstrate to the market what their idea has to offer so invest in building a simple leaderboard application. Leaderboard data will be submitted by authenticated users and Leaderboards can viewed by the public or by private invitation. If this leaderboard product is validated by the market, the business wants to create a SaaS out of it and ideally would like to avoid rework and focus on enhancing the feature set.

## Logical Structures
#### Competitor
A Competitor is a participant in a Contest. By engaging in a Contest, a Competitor may acquire points.

#### Head to Head Contest
A Head to Head (H2H) Contest defines a time when two Competitors compete to see who wins. Based on the final score card, a Competitor will receive the most points for a win, less points for a draw and the least points for a loss.

#### Leaderboard
A Leaderboard contains a complete list of Competitors who will engage in H2H Contents in a Round Robin format. The leaderboard aggregates the total points from all H2H Contests that have completed.

#### Referees
Referees adjudicates a H2H Contest, ensuring that Competitors are playing in accordance with the rules. Referees are also the authority for registering the score. Therefore, Referees are authenticated users of the leaderboard service, find the matching H2H Contest and input the final score.

#### Subscribers
Subscribers are users that want to view Leaderboards they are interested in. They can view any public Leaderboard as well as any private Leaderboard by invitation.
