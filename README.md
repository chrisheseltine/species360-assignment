This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Setup
1. Ensure you have Node.js installed (and npm)
2. In terminal `cd [project-dir]` then `npm install`
3. `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

# Workflow
(20 mins) - design: technical considerations (see below), psuedo-code the algorithm (see below)
(2 hours) - implementation (yeah I went over a little but I wanted to finish ^_^")
(10 mins) - convert notes to write-up, add to README.md

# Task List
My todo list for implementation:
1. create-next-app (TS), check it runs, gut it
2. create repo on GitHub, push empty project to remote
3. add basic input UI: description, grid of images
4. set image selection on click on image
5. write main algorithm as per psuedo code (see below)
6. cast results to table

# Psuedo-code Algorithm
```
for each unselected image (if unselected.name === selected.name then continue):
  for each selected image tag:
    look for matched tag in unselected image tags:
      if yes:
        how similar is it: (1 - Math.abs(selected image score - unselected image score)) * 100 = elementScore (0-100% how similar is this element to the selected image element), cases:
          - (1 - Math.abs(0.9 - 0.8)) * 100 = 90 => 90%
          - (1 - Math.abs(1 - 0.5)) * 100 = 50 => 50%
          - (1 - Math.abs(0.6 - 0.9)) * 100 = 70 => 70%
          - (1 - Math.abs(0 - 1)) * 100 = 0 => 0%
          - (1 - Math.abs(1 - 0)) * 100 = 0 => 0%
          - (1 - Math.abs(1 - 1)) * 100 = 100 => 100%
      if no:
        elementScore = 0
  get average of all elementScore (if total is 0 then set average to 0 instead of dividing)
return array of object: {imageName, averageElementScore}
sort array of objects by object.averageElementScore descending
cycle over array and display table of images with four columns: Rank, image, imageName, imageScore
```

# Write-up
## Technical Considerations
create-next-app for quick spin-up (TS), comes with TS & ESLint, also allows easy UI building via React (great for prod UI later), SEO enhanced, etc.
TailwindCSS for easy CSS utilities.
## Production-Ready
To be production ready I'd like to do the following:
- replace UI workflow with on upload workflow
- unit tests as per cases (as seen in algorithm above)
- devops a server for deployment as needed (pipeline into repo, MR, attach ticket/issue, etc.)
- SEO test the site w/ SEMRush or similar
- any other user considerations like localisation
- add end-to-end tests w/ Puppeteer (lib is unit tested) with edge cases (test site like a user ("user can do x"))
- use Lighthouse & Dev tools to profile and improve any bottlenecks or extra re-renders (signals?)
- i'd also imagine that values like confidence would come into play in a prod environment (dataset here is all 0 probably for simplicity of the task)
- to compare likeness of similar tags (e.g. "Evening primrose" being x amount similar to "Evening primrose family")
- would like to improve type safety as basically just skipped it here in the interest of time
