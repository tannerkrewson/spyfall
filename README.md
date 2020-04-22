# Spyfall

**Play now: [spyfall.tannerkrewson.com](https://spyfall.tannerkrewson.com/)**

(formerly spyfall.meteor.com and spyfall.crabhat.com)

Issues, feature requests, and pull requests welcome!

## History

The "official" successor to `spyfall.meteor.com` and `spyfall.crabhat.com` is now `spyfall.tannerkrewson.com`, and this GitHub repository maintains the development history of the site since 2015.

The original online Meteor.js Spyfall was designed by [Evan Brumley](https://github.com/evanbrumley) in 2014, and maintained by [Milov Patel](https://github.com/mpcovcd) from 2017 to 2019. Brumley [transferred ownership](https://github.com/tannerkrewson/spyfall/commit/5d8def67f3106e6a6507795d2cd9c2d3f4b69143) of this repo to Patel in August 2017. In late 2019, Patel deleted the repo, and [spyfall.crabhat.com](https://spyfall.crabhat.com/) does not work anymore.

Here's where I come into the story. Inspired by Brumley's implementation of Spyfall, I built [Drawphone](https://github.com/tannerkrewson/drawphone) in 2016. Since it was [posted on /r/boardgames](https://www.reddit.com/r/boardgames/comments/7lhj20/a_year_ago_i_was_wondering_why_there_were_no/), over 100,000 rounds have been played, which more than doubled due to the social distancing measures related to the 2019–20 coronavirus pandemic. To me, Drawphone represents the beginning of my career, so naturally, Spyfall holds a special place in my heart, and I was sad to see that it was deleted.

Thankfully, when a GitHub repo is deleted, its forks are kept, and there were 176 forks of the Spyfall repo. GitHub picked a fork that [James Napolitano](https://github.com/jaimus21) made in early 2015 to be the new "head of the forks". However, this repo did not have Patel's latest commits. I searched through each of the 176 forks to find the latest commits. The latest commits I could find were from [October 16, 2019](https://github.com/tannerkrewson/spyfall/pull/1). Unfortunately, all issues and pull requests cannot be recovered.

In April 2020, I contacted Napolitano, and he was kind enough to transfer this repository to me. I merged in the latest commits and created a release to [mark the final Meteor.js version of the repo](https://github.com/tannerkrewson/spyfall/releases/tag/v1.0) before I took over.

Brumley and Patel licensed Spyfall with the [MIT license](https://github.com/tannerkrewson/spyfall/blob/v1.0/LICENSE), meaning anyone is free to copy, modify, and distribute Spyfall. Under my control, this repo will maintain the MIT license. So, feel free to fork this repo, make changes, attempt to charge people to play, or even sell it!

The original Spyfall was written with [Meteor.js](https://github.com/meteor/meteor). I have nothing against Meteor, but I prefer to only have to use `npm install` and `npm start` to develop and deploy, while Meteor requires other downloads. I've been itching to try out [Next.js](https://github.com/zeit/next.js) and [React Hooks](https://reactjs.org/docs/hooks-intro.html), so I've gone ahead and ported Meteor Spyfall to Next.js!

I kept the original CSS stylings, locations, and translations, but I rewrote all client and server logic. Because I kept the original CSS, the design of the site looks essentially the same as Meteor Spyfall. I have made small tweaks to the design and added a few small features so far, most notably: dark mode!

Looking ahead, I'd like to eventually redo all of the stylings with a React component library. I'd also like to find a free translations service so the translations can be updated, because, as of now, some of the strings that Patel and I have added later in development are not translated.

## Development

#### Instructions

1. Install [Node.js](https://nodejs.org/)
2. `npm install`
3. `npm run dev`
4. Open `localhost:3000` in your browser
5. Create any pull requests against the `dev` branch
6. To deploy, `npm run build` then `npm start`

#### Tips

- To change the default port, set the `PORT` environment variable
- If you set the `NODE_ENV` environment variable to `development`, you can use the link `localhost:3000/ffff` to automatically join a development game. This helps speed up debugging.
